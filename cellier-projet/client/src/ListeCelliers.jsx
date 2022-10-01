import "./ListeCelliers.scss";
import Cellier from "./Cellier";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_search_bar_white.svg";

/**
 * L'affichage de la liste des celliers à un utilisteur connecté
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
function ListeCelliers(props) {
	if (props.celliers.length > 0) {
		return (
			<>
			<div className="Appli--entete">

			</div>
			<div className="Appli--container">
			<div className="liste-cellier--entete">
				<h1>Mes Celliers</h1>
				<NavLink to="/cellier/ajout/celliers">
				<button className="liste-cellier--btn-ajout">+ Ajouter</button>
				</NavLink>      
			</div>
			<span className="liste-cellier--message-retour"></span>
			<div className="ListeCelliers">
				{props.celliers.map((cellier) => (
				<div key={cellier.id} className="Cellier">
					<Cellier
					{...cellier}
					bouteilles={props.bouteilles}
					setBouteilles={props.setBouteilles}
					fetchVins={props.fetchVins}
					celliers={props.celliers}
					setCelliers={props.setCelliers}
					cellier={props.cellier}
					setCellier={props.setCellier}
					emailUtilisateur={props.emailUtilisateur}
					gererCellier={props.gererCellier}
					supprimerCellier={props.supprimerCellier}
					modifierCellier={props.modifierCellier}
					URI={props.URI}
					error={props.error}
					setError={props.setError}
					fetchCelliers={props.fetchCelliers}
					/>
				</div>
				))}
			</div>
			</div>
			</>
		);
	}
}

export default ListeCelliers;