import "./Admin.scss";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import FrmSaq from "./FrmSaq";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const TYPES_VIN = ["rouge", "blanc", "rose"];
const PAGE_SIZE = 96;

/**
 * Gestion de l'admin qui contient principalement la fonction de synchroniser avec la base de données de la SAQ
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function Admin(props) {
	const [nbBouteillesSaq, setNbBouteillesSaq] = useState(0);
	const [syncActif, setSyncActif] = useState(false);
	const [prevGo, setPrevGo] = useState(false);
	const [cycleImportation, setCycleImportation] = useState(0);
	const [frmOuvert, setFrmOuvert] = useState(false);
	const syncEnCours = useRef(false);

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const [openAlert, setOpenAlert] = React.useState(false);
	const [openAlertLoading, setOpenAlertLoading] = React.useState(false);
	const handleCloseAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAlert(false);
	};
	const handleCloseAlertLoading = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAlertLoading(false);
	};
	const navigate = useNavigate();

	function gererSaq() {
		setFrmOuvert(true);
	}

	async function fetchPlanSaq(type) {
		const response = await fetch(props.URI + `/admin/${type}/saq`);
		if (!response.ok) {
			throw response;
		}
		const data = await response.json();
		if (typeof data === "number") {
			return { total: data, tranches: [{ prixMin: null, prixMax: null, total: data }] };
		}
		return {
			total: data.total ?? 0,
			tranches:
				Array.isArray(data.tranches) && data.tranches.length > 0
					? data.tranches
					: [{ prixMin: null, prixMax: null, total: data.total ?? 0 }],
		};
	}

	async function fetchSaq(nouvellePage, nouveauType, tranche) {
		const body = {
			nombre: PAGE_SIZE,
			page: nouvellePage,
			type: nouveauType,
		};
		if (tranche.prixMin != null && tranche.prixMax != null) {
			body.prixMin = tranche.prixMin;
			body.prixMax = tranche.prixMax;
		}

		const response = await fetch(props.URI + "/admin/importer/saq", {
			method: "POST",
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			throw response;
		}
		return response.json();
	}

	async function importerType(type) {
		const plan = await fetchPlanSaq(type);
		const label = type === "rose" ? "rosé" : type;
		setPrevGo(label);
		setNbBouteillesSaq(plan.total);

		let importees = 0;
		for (const tranche of plan.tranches) {
			const nbPages = Math.ceil(tranche.total / PAGE_SIZE);
			for (let page = 0; page < nbPages; page++) {
				await fetchSaq(page, type, tranche);
				importees += Math.min(PAGE_SIZE, tranche.total - page * PAGE_SIZE);
				const progression =
					plan.total > 0 ? Math.min(100, Math.floor((importees * 100) / plan.total)) : 100;
				setCycleImportation(progression);
			}
		}
	}

	useEffect(() => {
		if (!syncActif || syncEnCours.current) {
			return;
		}

		syncEnCours.current = true;
		let annule = false;

		(async () => {
			try {
				setCycleImportation(0);
				setNbBouteillesSaq(0);

				for (const type of TYPES_VIN) {
					if (annule) {
						return;
					}
					await importerType(type);
				}

				if (!annule) {
					setCycleImportation(100);
					setOpenAlertLoading(false);
					setOpenAlert(true);
					setNbBouteillesSaq(0);
					setPrevGo(false);
				}
			} catch (error) {
				console.error("Error fetching data: ", error);
				props.setError(error);
				setOpenAlertLoading(false);
			} finally {
				syncEnCours.current = false;
				setSyncActif(false);
			}
		})();

		return () => {
			annule = true;
		};
	}, [syncActif]);

	const redirectionAccueil = function () {
		props.gererSignOut();
		const timer = setTimeout(() => {
			navigate("/", { replace: true });
		}, 2000);
		return () => clearTimeout(timer);
	};

	return (
		<>
			<div className="Appli--entete">
				<div className="Appli--signOut-container">
					<button className="Appli--signOut" onClick={redirectionAccueil}>
						Déconnexion
					</button>
				</div>
			</div>
			<div className="Appli--container">
				<div className="Admin">
					<div className="content-admin">
						<h1>Bienvenue sur l'interface d'admin!</h1>
						<div>
							<button className="importer-admin" onClick={gererSaq}>
								Synchroniser avec la base de données de la Saq
							</button>
						</div>
					</div>
					<Snackbar
						sx={{ height: "100%" }}
						anchorOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
						open={openAlert}
						autoHideDuration={3000}
						onClose={handleCloseAlert}
					>
						<Alert
							onClose={handleCloseAlert}
							severity="success"
							sx={[
								{
									width: "100%",
									backgroundColor: "#152440",
									border: "1px solid #f1ab50",
								},
							]}
						>
							La synchronisation avec la base de données de la SAQ a été faite
							avec succès!
						</Alert>
					</Snackbar>
					<Snackbar
						sx={{ height: "100%" }}
						anchorOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
						open={openAlertLoading}
						onClose={handleCloseAlertLoading}
					>
						<Alert
							onClose={handleCloseAlertLoading}
							severity="success"
							sx={[
								{
									width: "100%",
									backgroundColor: "#152440",
									border: "1px solid #f1ab50",
								},
							]}
						>
							<p>Synchronisation en cours, veuillez patienter.</p>
							{nbBouteillesSaq < 1 ? (
								<p className="contenu--alert">Initialisation...</p>
							) : (
								<div>
									<p className="contenu--alert">
										Chargement de {nbBouteillesSaq} bouteilles de vin {prevGo}
										...
									</p>
									<p className="contenu--alert">
										Progression vin {prevGo}: {cycleImportation}%
									</p>
								</div>
							)}
						</Alert>
					</Snackbar>
					<FrmSaq
						frmOuvert={frmOuvert}
						setFrmOuvert={setFrmOuvert}
						setSyncActif={setSyncActif}
						setOpenAlertLoading={setOpenAlertLoading}
					/>
				</div>
			</div>
		</>
	);
}
