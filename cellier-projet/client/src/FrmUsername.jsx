import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import "./FrmUsername.scss";
import MuiButton from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

/**
 * Gestion de l'entrée du nom d'utilisateur
 * @date 2022-09-30
 * @param {*} {username ... }
 * @returns {*}
 */
export default function FrmEmail({
	username,
	setNouveauUsername,
	emailUtilisateur,
	NouveauUsername,
	setUsername,
	frmUsernameOuvert,
	setFrmUsernameOuvert,
	URI,
}) {
  /**
   *  État des styles des composants MUI
   */
	const Button = styled(MuiButton)((props) => ({
		color: "#152440",
		border: "1px solid #cc4240",
		textDecoration: "none",
		borderRadius: "4px",
		fontFamily: "Alata",
		fontSize: "12px",
		padding: "10px 20px",
		"&:hover": {
			backgroundColor: "#f1ab50",
			border: "1px solid #f1ab50",
			color: "#152440",
		},
	}));

	const CssDialogTitle = styled(DialogTitle)((props) => ({
		fontFamily: "Alata",
		color: "#152440",
		fontSize: "19px",
		marginTop: "10px",
		textAlign: "center",
	}));

	/**
	 * État de l'alerte
	 */
	const [severity, setSeverity] = useState([]);

	/**
	 * État du message retour
	 */
	const [messageRetour, setMessageRetour] = useState([]);

	/**
	 * Thème de modification du composant TextField
	 */
	const theme = createTheme({
	components: {
		MuiOutlinedInput: {
		styleOverrides: {
			root: {
			"&.Mui-focused": {
				"& .MuiOutlinedInput-notchedOutline": {
				border: `1px solid #f1ab50`,
				boxShadow: `none`,
				},
			},
			},
		},
		},
	},
	});

	/**
	 * État de l'alerte
	 */
	const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const [openAlert, setOpenAlert] = React.useState(false);
	const navigate = useNavigate();
	const handleCloseAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenAlert(false);
		setFrmUsernameOuvert(false);
	};

	/**
	 *  Gère l'action d'annuler
	 */
	function viderFermerFrm() {
		setFrmUsernameOuvert(false);
	}

	/**
	 *  Gère l'action d'annuler
	 */
	function gererInput(e) {
		setNouveauUsername(e.target.value);
	}

	/**
	 * requête de modification de l'email utilisateur
	 */
	async function fetchPatchUtilisateurUsername(NouveauUsername) {
		let reponse = await fetch(
			URI + "/" + "email" + "/" + emailUtilisateur + "/" + "utilisateurs",
			{
			method: "PATCH",
			body: JSON.stringify({ nom: NouveauUsername }),
			}
		);
		let reponseJson = await reponse.json();
		setUsername(NouveauUsername);
		navigate(`/profil/${emailUtilisateur}`, { replace: true });
	}

	/**
	 * Gère l'action de soumettre
	 */
	function gererSoumettre() {
		setSeverity("");
		var reg =
			/^(?=[a-zA-Z0-9._àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
		setNouveauUsername(NouveauUsername);
		if (reg.test(NouveauUsername)) {
			fetchPatchUtilisateurUsername(NouveauUsername);
			setMessageRetour("Modification effectuée");
			setSeverity("success");
			setOpenAlert(true);
		} else {
			setMessageRetour(
			"Le nom d'usager doit contenir au moins huit caractères. Les . et _ ne sont pas acceptés au début et à la fin du nom d'usager. Les caractères spéciaux ne sont pas acceptés."
			);
			setSeverity("error");
			setOpenAlert(true);
		}
	}
	return (
	<div>
		<Dialog
		PaperProps={{ sx: { backgroundColor: "#f3f5eb" } }}
		className="dialogue"
		open={frmUsernameOuvert}
		onClose={viderFermerFrm}
		>
		<CssDialogTitle>Modifier votre nom d'utilisateur</CssDialogTitle>
		<DialogContent>
			<div className="frmUsername">
			<p className="">Nom d'usager : {username}</p>
			<ThemeProvider theme={theme}>
				<TextField
				fullWidth={true}
				onChange={gererInput}
				autoFocus
				id="username"
				type={"text"}
				defaultValue={username}
				helperText="Le nom d'usager doit contenir au moins huit caractères."
				/>
			</ThemeProvider>
			<Snackbar
				sx={{ height: "100%" }}
				anchorOrigin={{
				vertical: "top",
				horizontal: "center",
				}}
				open={openAlert}
				autoHideDuration={1000}
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
		</DialogContent>
		<DialogActions>
			<Button onClick={viderFermerFrm} className="cancel">
			Annuler
			</Button>
			<button onClick={gererSoumettre} className="action">
			Enregistrer
			</button>
		</DialogActions>
		</Dialog>
	</div>
	);
}