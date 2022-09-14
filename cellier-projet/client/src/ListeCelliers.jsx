import "./ListeCelliers.scss";
import Cellier from "./Cellier";
import { NavLink } from "react-router-dom";

function ListeCelliers(props) {
  if (props.celliers.length > 0) {
    return (
      <>
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
                fetchVins={props.fetchVins}
                celliers={props.celliers}
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
      </>
    );
  }
}

export default ListeCelliers;