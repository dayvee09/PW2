import * as React from "react";
import "./FrmAjoutCellier.scss";


function FormAjoutCellier(props) {

    return (
        <div className="FormAjoutCellier">
			<h1>Ajouter un cellier</h1>
			<form>
				<label htmlFor="nom">Nom du cellier</label><br></br>
				<input type="text" id="nom" name="nom" placeholder="Nom du cellier" /><br></br>
				<button type="submit">Ajouter</button>
			</form>
		</div>
    );
}

export default FormAjoutCellier;