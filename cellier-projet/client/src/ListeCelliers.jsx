import "./ListeCelliers.scss";
import Cellier from "./Cellier";
import { NavLink } from "react-router-dom";

/**
 * L'affichage de la liste des celliers à un utilisteur connecté
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
function ListeCelliers(props) {
  const enChargement = !props.id;

  if (enChargement && props.userLoadError) {
    return (
      <>
        <div className="Appli--entete"></div>
        <div className="Appli--container">
          <p className="liste-cellier--etat liste-cellier--etat--erreur">
            Impossible de charger votre compte.
          </p>
          <p className="liste-cellier--etat liste-cellier--etat--erreur">
            {props.userLoadError.message ||
              "Vérifiez la console (F12) et que l'API PHP répond."}
          </p>
        </div>
      </>
    );
  }

  if (enChargement) {
    return (
      <>
        <div className="Appli--entete"></div>
        <div className="Appli--container">
          <p className="liste-cellier--etat">Chargement de vos celliers…</p>
        </div>
      </>
    );
  }

  if (props.celliers.length > 0) {
    return (
      <>
        <div className="Appli--entete"></div>
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

  return (
    <>
      <div className="Appli--entete"></div>
      <div className="Appli--container">
        <div className="liste-cellier--entete">
          <h1>Mes Celliers</h1>
        </div>
        <p className="liste-cellier--etat">
          Vous n&apos;avez pas encore de cellier.
        </p>
        <NavLink to="/cellier/ajout/celliers">
          <button className="liste-cellier--btn-ajout liste-cellier--btn-ajout--vide">
            + Créer mon premier cellier
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default ListeCelliers;
