import * as React from "react";
import "./FrmModifierCellier.scss";
import {
	useNavigate,
	useLocation
} from "react-router-dom";


function FrmModifierCellier({modifierCellier, URI}) {
	const location = useLocation();

	let idCellier = location.state.id;
	let nomCellier = location.state.nom;

	function gererModifierCellier() {
		let nouvNomCellier = document.getElementById("nomCellier").value;
		// console.log(nouvNomCellier);
		if(nouvNomCellier === "") {
			let error = document.querySelector('span')
			error.innerText = "Veuillez entrer un nouveau nom de cellier.";
		} else {
			modifierCellier(idCellier, nouvNomCellier);
			// navigate(`/`, { replace: true })
		}
	}

	// function onTodoChange(value) {
    //     this.setState({
    //          nom: value
    //     });
    // }
	// value={this.state.nom} onChange={e => this.onTodoChange(e.target.value)}

    return (
        <div className="FrmModifierCellier">
			<h1>Modifier {nomCellier}</h1>
			<div className="form-ajout--container">
				<label htmlFor="nom">Nom du cellier</label><br></br>
				<input type="text" id="nomCellier" name="nom" placeholder={nomCellier} /><br></br>
				<span></span><br></br>
				<button onClick={gererModifierCellier}>Modifier</button>
			</div>
		</div>
    );
}

export default FrmModifierCellier;