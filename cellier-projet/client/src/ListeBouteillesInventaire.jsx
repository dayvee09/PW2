import "./ListeBouteillesInventaire.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_search_bar_white.svg";
import BouteilleInventaire from "./BouteilleInventaire";
import _ from "lodash";
import isEqual from "lodash/isEqual";
import { TextField } from "@mui/material";

function ListeBouteillesInventaire(props) {
  // const [toSearch, setToSearch] = useState("");
  const [results, setResults] = useState([]);
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(200);
  let search;
  // const [quantiteTotal, setQuantiteTotal] = useState(0);
  // const [prixTotal, setPrixTotal] = useState(0);

  /**
   * Fectch la liste de tous les bouteilles dans tout différentes celliers
   */
  useEffect(() => {
    if (_.isEqual(props.bouteillesInventaire, results) !== true) {
      props.fetchVinsInventaire();
      setResults(props.bouteillesInventaire);
    }
  }, [props.bouteillesInventaire]);

  function gererVoirPlus() {
    if (results.length > fin) {
      setFin(fin + 200);
    } else if (results.length <= fin) {
      setFin(results.length);
    }
  }

  function gererInputRecherche(e) {
    search = e.target.value;
    setResults(filtreBouteilles(props.bouteillesInventaire, search));
  }

  function filtreBouteilles(array, string) {
    // return array.filter((o) =>
    //   Object.keys(o).some((k) => {
    //     console.log(o);
    //     console.log(k);
    //     console.log(o[k]);
    //     o[k].toLowerCase().includes(string.toLowerCase());
    //   })
    // );
    return array.filter((bouteille) => {
      return bouteille.nom.toLowerCase().includes(string.toLowerCase());
    });
  }
  var quantite_total = results.reduce((prev, cur)=> parseInt((cur.quantite_total? cur.quantite_total:0)) + parseInt(prev?prev:0), 0);
  var prix_total = results.reduce((prev, cur)=> parseFloat(cur.prix_total? cur.prix_total: 0) + parseFloat(prev? prev:0), 0);
  if (results.length > 1) {
    return (
      <>
        <div className="Appli--entete">
          <div className="Appli--search-bar-container">
            <input
              className="Appli--search-bar"
              placeholder="Trouver une bouteille"
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  gererInputRecherche(ev);
                  ev.preventDefault();
                  ev.target.value = "";
                }
              }}
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
            <div className="liste-inventaire-total">
                <p>Quantité&nbsp; totale: &nbsp;{quantite_total}&nbsp; </p>
                <p>Valeur&nbsp; totale: &nbsp;{parseFloat(prix_total).toFixed(2) || 0}&nbsp; $</p>
            </div>
          </div>
          <span className="liste-cellier--message-retour"></span>
          <div className="ListeBouteillesInventaire">
            {results.slice(debut, fin).map((bouteilleInventaire) => (
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
          {results.length > fin ? (
            <div className="fin--liste cliquable" onClick={gererVoirPlus}>
              Voir plus
            </div>
          ) : (
            results.length > 0 && (
              <div className="fin--liste">Fin de la liste</div>
            )
          )}
        </div>
      </>
    );
  } else if (results.length === 1) {
    return (
      <>
        <div className="Appli--entete">
          <div className="Appli--search-bar-container">
            <input
              className="Appli--search-bar"
              placeholder="Trouver une bouteille"
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  gererInputRecherche(ev);
                  ev.preventDefault();
                  ev.target.value = "";
                }
              }}
            />
          </div>
        </div>
        <div className="Appli--container">
          <div className="liste-cellier--entete">
            <h1>Mes Bouteilles</h1>
            <div className="liste-inventaire-total">
                <p>Quantité&nbsp; totale: &nbsp;{quantite_total}&nbsp; </p>
                <p>Valeur&nbsp; totale: &nbsp;{parseFloat(prix_total).toFixed(2) || 0}&nbsp; $</p>
            </div>
          </div>
          <span className="liste-cellier--message-retour"></span>
          <div className="ListeBouteillesInventaire">
            <div>
              <BouteilleInventaire
                {...results[0]}
                bouteilleInventaire={results[0]}
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
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="Appli--entete"></div>
        <div className="Appli--container">
          <div className="liste-cellier--entete">
            <h1>Mes Bouteilles</h1>
            <div className="liste-inventaire-total">
                <p>Quantité&nbsp; totale: &nbsp;{quantite_total}&nbsp; </p>
                <p>Valeur&nbsp; totale: &nbsp;{parseFloat(prix_total).toFixed(2) || 0}&nbsp; $</p>
            </div>
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
