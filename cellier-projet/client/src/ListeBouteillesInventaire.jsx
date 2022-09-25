import "./ListeBouteillesInventaire.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_search_bar_white.svg";
import BouteilleInventaire from "./BouteilleInventaire";
import _ from 'lodash';
import isEqual from 'lodash/isEqual';
import { TextField } from "@mui/material";

function ListeBouteillesInventaire(props) {
  const [toSearch, setToSearch] = useState("");
  const [results, setResults] = useState([]);

  /**
   * Fectch la liste de tous les bouteilles dans tout différentes celliers
   */
  useEffect(() => {
    if (_.isEqual(props.bouteillesInventaire, results) !== true) {
      props.fetchVinsInventaire();
      setResults(props.bouteillesInventaire);
    }
  }, [props.bouteillesInventaire]);

  function gererInputRecherche(e) {
    setToSearch(e.target.value);
    setResults(filtreBouteilles(props.bouteillesInventaire, toSearch));
  }

  function filtreBouteilles(array, string) {
    return array.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  if (results.length > 0) {
    return (
      <>
        <div className="Appli--entete">
          <div className="Appli--search-bar-container">
            <input
              className="Appli--search-bar"
              placeholder="Trouver une bouteille"
              onChange={gererInputRecherche}
            />
            {/* <div className="Appli--search-bar-icone">
              <img
                className="Appli--search-bar-icone-search"
                src={rowIcone}
                alt="icone-row-left"
                width={15}
              ></img>
            </div> */}
          </div>
        </div>
        <div className="Appli--container">
          <div className="liste-cellier--entete">
            <h1>Mes Bouteilles</h1>
          </div>
          <span className="liste-cellier--message-retour"></span>
          <div className="ListeBouteillesInventaire">
            {results.map((bouteilleInventaire) => (
              <div key={bouteilleInventaire.id}>
                <BouteilleInventaire
                  {...bouteilleInventaire}
                  bouteilleInventaire={bouteilleInventaire}
                  setBouteilleInventaire={props.setBouteillesInventaire}
                  fetchVinsInventaire={props.fetchVinsInventaire}
                  user_id={props.user_id}
                  emailUtilisateur={props.emailUtilisateur}
                  URI={props.URI}
                  cellier={props.cellier}
                  fetchVins={props.fetchVins}
                  fetchNomCellier={props.fetchNomCellier}
                  gererCellier={props.gererCellier}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="Appli--entete">
          <div className="Appli--search-bar-container">
            <input
              className="Appli--search-bar"
              placeholder="Trouver une bouteille"
              onChange={gererInputRecherche}
            />
          </div>
        </div>
        <div className="Appli--container">
          <div className="liste-cellier--entete">
            <h1>Mes Bouteilles</h1>
          </div>
          <span className="liste-cellier--message-retour"></span>
          <div className="ListeBouteillesInventaire">
            <h2 className="aucune-bouteille">Aucune bouteille.</h2>
            <NavLink to="/vins">
              <p className="ListeBouteille--default-button">
                + Ajouter une bouteille
              </p>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

export default ListeBouteillesInventaire;
