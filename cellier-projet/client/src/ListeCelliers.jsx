import "./ListeCelliers.scss";
import Cellier from "./Cellier";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone-search-bar-white.svg";

function ListeCelliers(props) {
  if (props.celliers.length > 0) {
    return (
      <>
	  <div className="Appli--entete">
		<div className="Appli--search-bar-container">
			<input className="Appli--search-bar" placeholder="Trouver une bouteille" />
			<div className="Appli--search-bar-icone">
				<img className="Appli--search-bar-icone-search" src={rowIcone} alt="icone-row-left" width={15}></img>
			</div>
		</div>
	  </div>
	  <div className="Appli--container">
        <div className="liste-cellier--entete">
          <h1>Mes Celliers</h1>
          <NavLink to="/cellier/ajout/celliers">
            <button>+ Ajouter</button>
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
