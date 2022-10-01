import * as React from "react";
import "./FrmAjoutCellier.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

/**
 * Gestion de l'ajout d'un cellier à un utilisateur
 * 
 * Contenant la gestion des états et le stockage des données en utilisant 'fetch'
 * @date 2022-09-30
 * @param {*} {celliers ...}
 * @returns {*}
 */
function FormAjoutCellier({ celliers, URI, fetchCelliers, setError }) {
	const navigate = useNavigate();
	const [messageRetour, setMessageRetour] = useState([]);
	const [severity, setSeverity] = useState([]);

	/**
	 * État de l'alerte
	 */
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const [openAlert, setOpenAlert] = React.useState(false);
	const handleCloseAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAlert(false);
		navigate("/", { replace: true });
	};

	function gererAjoutCellier() {
		let nomCellier = document.getElementById("nomCellier").value;
		let utilisateurId = celliers[0].vino__utilisateur_id;
		if (nomCellier === "") {
			let error = document.querySelector("span");
			error.innerText = "Veuillez entrer un nom de cellier";
		} else {
			let cellier = {
			nom: nomCellier,
			vino__utilisateur_id: utilisateurId,
			};
			ajouterCellier(cellier);
		}
	}

	async function ajouterCellier(cellier) {
		await fetch(URI + `/cellier/ajout/celliers`, {
			method: "POST",
			body: JSON.stringify(cellier),
		})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw response;
		})
		.then((data) => {
			fetchCelliers();
			setMessageRetour("Ajout effectuée");
			setSeverity("success");
			setOpenAlert(true);
			setTimeout(() => {
				navigate("/", { replace: true });
			}, 2000);
		})
		.catch((error) => {
			console.error("Error fetching data: ", error);
			setError(error);
		});
	}

	return (
	<div>
		<div className="Appli--entete">
		<div>
			<NavLink to={`/`}>
			<button className="retour">
				<img src={rowIcone} alt="icone-row-left" width={15}></img>
				Retour&nbsp;aux&nbsp;Celliers&nbsp;
			</button>
			</NavLink>
		</div>
		</div>
		<div className="Appli--container">
		<div className="FormAjoutCellier">
			<h1>Ajouter un cellier</h1>
			<div className="form-ajout--container">
			<label htmlFor="nom">Nom du cellier</label>
			<br></br>
			<input type="text" id="nomCellier" name="nom" placeholder="Nom" />
			<br></br>
			<span></span>
			<br></br>
			<button onClick={gererAjoutCellier}>Ajouter</button>
			</div>
			<Snackbar
			sx={{ height: "70%" }}
			anchorOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			open={openAlert}
			autoHideDuration={2000}
			onClose={handleCloseAlert}
			>
			<Alert
				onClose={handleCloseAlert}
				severity={severity}
				sx={[
				{
					width: "100%",
					backgroundColor: "#152440",
					border: "1px solid #f1ab50",
				},
				]}
			>
				{messageRetour}
			</Alert>
			</Snackbar>
		</div>
		</div>
	</div>
	);
}

export default FormAjoutCellier;