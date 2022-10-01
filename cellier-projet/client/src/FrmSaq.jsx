import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import "./FrmSaq.scss";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Gestion du formulaire de l'import de la SAQ
 * @date 2022-09-30
 * @param {*} {frmOuvert ... }
 * @returns {*}
 */
export default function FrmSaq({
	frmOuvert,
	setFrmOuvert,
	setGo,
	setOpenAlertLoading,
	setNbBouteillesSaq,
	setCycleImportation,
	setPrevGo,
}) {
	/**
	 * L‘état d'erreur
	 */
	const [openErr, setOpenErr] = useState(false);
	/**
	 *  Gère l'action d'annuler
	 */
	function viderFermerFrm() {
		setFrmOuvert(false);
	}
	/**
	 * Gère l'action de soumettre
	 */
	function gererSoumettre() {
		setNbBouteillesSaq(0);
		setCycleImportation(0);
		setGo("rouge");
		setPrevGo(false);
		setOpenAlertLoading(true);
		setFrmOuvert(false);
	}

	return (
	<div>
		<Dialog className="FrmSaq" open={frmOuvert} onClose={viderFermerFrm}>
		<DialogContent>
			<div className="description">
			<Dialog open={openErr}>
				<Alert
				severity="error"
				action={
					<IconButton
					aria-label="close"
					size="small"
					onClick={() => {
						setOpenErr(false);
					}}
					>
					<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				>
				Invalide!
				</Alert>
			</Dialog>
			</div>
			<div className="maj--confirmation">
			Vous allez mettre à jour le catalogue de la SAQ. Cette opération
			pourrait prendre plusieurs minutes.{" "}
			</div>
		</DialogContent>
		<DialogActions>
			<Button onClick={viderFermerFrm}>Annuler</Button>
			<Button onClick={gererSoumettre}>Soumettre</Button>
		</DialogActions>
		</Dialog>
	</div>
	);
}