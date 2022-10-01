import "./ToggleBtn.scss";
import { useState } from "react";

/**
 * Gestion du composant 'ToggleBtn' qui fait partie de la fonctionnalité de l'ajout d'une bouteille
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function ToggleBtn(props) {
  
	function handleClickBtn() {
		if (props.btnState) {
			props.clearForm();
			props.setBtnState(false);
			
		} else {
			props.clearForm();
			props.setBtnState(true);
		}
	}

  return (
	<div className="ToggleBtn">
		<div className="container">
		<div className="button" id="button-container" onClick={handleClickBtn}>
			<div
			id="my-button"
			className={[
				"button-element",
				props.btnState === true ? "tfx100 br1" : "tfx0 br2",
			].join(" ")}
			>
			<p id="importer">{props.btnState === true ? "CRÉER" : "IMPORTER"}</p>
			</div>
			<p id="creer" className={props.btnState === true ? "tfxn100" : "tfx0"}>
			{props.btnState === true ? "IMPORTER" : "CRÉER"}
			</p>
		</div>
		<label>
			<input
			id="for-button"
			type="text"
			name="method"
			value={props.btnState === true ? "CRÉER" : "IMPORTER"}
			readOnly
			/>
		</label>
		</div>
	</div>
	);
}