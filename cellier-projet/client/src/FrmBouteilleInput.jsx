import TextField from "@mui/material/TextField";
import "./FrmBouteilleInput.scss";

/**
 * Gestion de l'entré dans un composant input 
 * 
 * L'entrée de la quantité de bouteille 
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function FrmBouteilleInput(props) {
	function gererInput(e) {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			props.setQuantite(e.target.value);
		} else {
			props.setOpenErr(true);
		}
	}
	return (
	<div
		className={[
		"FrmBouteilleInput",
		props.voirFiche === true ? "hidden" : "",
		].join(" ")}
	>
		<TextField
		fullWidth
		size="small"
		autoFocus
		onChange={gererInput}
		id="quantite"
		type={"number"}
		min={0}
		inputProps={{ min: 0 }}
		defaultValue={props.quantite}
		/>
	</div>
	);
}