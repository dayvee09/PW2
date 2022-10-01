import "./Admin.scss";

import * as React from "react";
import { useState, useEffect } from "react";
import FrmSaq from "./FrmSaq";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { selectUnstyledClasses } from "@mui/base";

/**
 * Gestion de l'admin qui contient principalement la fonction de synchroniser avec la base de données de la SAQ
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function Admin(props) {
	const [nbBouteillesSaq, setNbBouteillesSaq] = useState(0);
	const [go, setGo] = useState(false);
	const [prevGo, setPrevGo] = useState(false);
	const [cycleImportation, setCycleImportation] = useState(0);
	const [frmOuvert, setFrmOuvert] = useState(false);
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
	let nb = 0;
	let progression = 0;

	// ----------------------- Gestion de l'admin ------------------------------------------------

	function gererSaq() {
	setFrmOuvert(true);
	}

	useEffect(() => {
	if (go) {
		fetchNbVinsSaq(go);
	}
	}, [go]);

	useEffect(() => {
	if (prevGo) {
		setCycleImportation(0);
	}
	}, [prevGo]);

	useEffect(() => {
	if (nbBouteillesSaq !== 0 && go === false) {
		const test = setTimeout(() => {
		setOpenAlertLoading(false);
		setOpenAlert(true);
		setNbBouteillesSaq(0);
		}, 10000);
		return () => {
		clearTimeout(test);
		};
	}
	}, [cycleImportation]);

	useEffect(() => {
	if (nbBouteillesSaq && go !== false) {
		let nbPages = Math.ceil(nbBouteillesSaq / 96);
		for (let i = 0; i <= nbPages; i++) {
		fetchSaq(96, i, go);
		}
		switch (go) {
		case "rouge": {
			setGo("blanc");
			setPrevGo("rouge");
			break;
		}
		case "blanc": {
			setGo("rose");
			setPrevGo("blanc");
			break;
		}
		case "rose": {
			setGo(false);
			setPrevGo("rosé");
			break;
		}
		}
	}
	}, [nbBouteillesSaq]);

	async function fetchSaq(nouveauNombre, nouvellePage, nouveauType) {
		await fetch(props.URI + "/admin/importer/saq", {
			method: "POST",
			body: JSON.stringify({
			nombre: nouveauNombre,
			page: nouvellePage,
			type: nouveauType,
			}),
		})
		.then((response) => {
		if (response.ok) {
			return response.json();
		}
		throw response;
		})
		.then((data) => {
		nb = nb + 96;
		progression = Math.floor((nb * 100) / nbBouteillesSaq);
		if (progression > 100) {
			progression = 100;
		}
		setCycleImportation(progression);
		})
		.catch((error) => {
		console.error("Error fetching data: ", error);
		props.setError(error);
		});
	}

	async function fetchNbVinsSaq(type) {
		await fetch(props.URI + `/admin/${type}/saq`)
		.then((response) => {
		if (response.ok) {
			return response.json();
		}
		throw response;
		})
		.then((data) => {
		setNbBouteillesSaq(data);
		})
		.catch((error) => {
		console.error("Error fetching data: ", error);
		props.setError(error);
		});
	}

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
				setCycleImportation={setCycleImportation}
				setNbBouteillesSaq={setNbBouteillesSaq}
				go={go}
				setGo={setGo}
				setPrevGo={setPrevGo}
				frmOuvert={frmOuvert}
				setFrmOuvert={setFrmOuvert}
				setOpenAlertLoading={setOpenAlertLoading}
				/>
			</div>
		</div>
	</>
	);
}
