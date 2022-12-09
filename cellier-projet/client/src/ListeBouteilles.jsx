import React, { useEffect, useMemo, useState } from "react";
import "./ListeBouteilles.scss";
import Bouteille from "./Bouteille";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

/**
 * L'affichage de la liste des bouteilles
 *
 * Contenant le tri par la différent condition
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
function ListeBouteilles(props) {
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(200);
  const [changementBouteille, setChangementBouteille] = useState(false);
  const [bouteillesTri, setBouteillesTri] = useState(props.bouteilles);
  /**
   *  État des bouteilles au tri
   */
  const [unique, setUnique] = useState(false);
  const [sortType, setSortType] = useState([]);
  const navigate = useNavigate();
  let indexBouteille = props.bouteilles.findIndex((object) => {
    return object.id === props.cible;
  });

  /**
   *  État des bouteilles au tri
   */
  useEffect(() => {
    let result;
    switch (sortType) {
      case "qt-decroissante": {
        result = [...props.bouteilles].sort((a, b) => {
          return parseInt(b.quantite) - parseInt(a.quantite);
        });
        break;
      }
      case "qt-croissante": {
        result = [...props.bouteilles].sort((a, b) => {
          return parseInt(a.quantite) - parseInt(b.quantite);
        });
        break;
      }
      case "prix-decroissant": {
        result = [...props.bouteilles].sort((a, b) => {
          return parseInt(b.prix_saq) - parseInt(a.prix_saq);
        });
        break;
      }
      case "prix-croissant": {
        result = [...props.bouteilles].sort((a, b) => {
          return parseInt(a.prix_saq) - parseInt(b.prix_saq);
        });
        break;
      }
      case "alph-decroissant": {
        result = [...props.bouteilles].sort((a, b) => {
          return b.nom.localeCompare(a.nom);
        });
        break;
      }
      case "alph-croissant": {
        result = [...props.bouteilles].sort((a, b) => {
          return a.nom.localeCompare(b.nom);
        });
        break;
      }
      case "vin-rouge": {
        result = [];
        for (let index = 0; index < props.bouteilles.length; index++) {
          if (props.bouteilles[index]["type"] === "Vin rouge") {
            result.push(props.bouteilles[index]);
          }
        }
        break;
      }
      case "vin-blanc": {
        result = [];
        for (let index = 0; index < props.bouteilles.length; index++) {
          if (props.bouteilles[index]["type"] === "Vin blanc") {
            result.push(props.bouteilles[index]);
          }
        }
        break;
      }
      case "vin-rose": {
        result = [];
        for (let index = 0; index < props.bouteilles.length; index++) {
          if (props.bouteilles[index]["type"] === "Vin rose") {
            result.push(props.bouteilles[index]);
          }
        }
        break;
      }
      default: {
        result = props.bouteilles;
      }
    }
    setBouteillesTri(result);
  }, [sortType, props.bouteilles]);

  useEffect(() => {
    props.fetchVins(props.cellier);
    props.fetchNomCellier(props.cellier);
    setSortType("tout");
  }, [debut, fin]);

  useEffect(() => {
    if (changementBouteille !== false) {
      props.fetchVins(props.cellier);
    }
  }, [changementBouteille]);

  useEffect(() => {
    if (props.cible) {
      if (document.querySelectorAll("[data-id]").length > 1) {
        if (
          document.querySelector(`[data-id="${props.cible}"]`) &&
          unique === false &&
          changementBouteille === false
        ) {
          let cible = document.querySelector(`[data-id="${props.cible}"]`);
          let target = cible.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: target,
            behavior: "smooth",
          });
        } else if (props.bouteilles.length > 200) {
          setUnique(true);
        }
      }
    }
  }, [props.bouteilles]);

  useEffect(() => {
    if (props.cible && props.bouteilles.length > 200 && indexBouteille >= 200) {
      setDebut(indexBouteille);
    }
  }, [unique]);

  useEffect(() => {
    if (props.cible && props.bouteilles.length > 200 && indexBouteille >= 200) {
      setFin(debut + 1);
    }
  }, [debut]);

  function gererVoirPlus() {
    if (props.bouteilles.length > fin) {
      setFin(fin + 200);
    } else if (props.bouteilles.length <= fin) {
      setFin(props.bouteilles.length);
    }
  }
  if (props.bouteilles) {
    return (
      <div>
        <div className="Appli--entete">
          <div className="Appli--tri-container">
            <NavLink to={`/`}>
              <button className="retour">
                <img src={rowIcone} alt="icone-row-left" width={15}></img>
                Retour&nbsp;aux&nbsp;Celliers&nbsp;
              </button>
            </NavLink>
            {props.bouteilles.length > 1 && (
              <select
                className="retour"
                name="tri"
                aria-label="tri"
                id="tri"
                defaultValue="tout"
                onChange={(e) => setSortType(e.target.value)}
              >
                <img src={rowIcone} alt="icone-row-down" width={15}></img>
                <option selected value="tout">
                  Tout
                </option>
                <option value="vin-rouge">Vin Rouge</option>
                <option value="vin-blanc">Vin Blanc</option>
                <option value="vin-rose">Vin Rosé</option>
                <option value="qt-decroissante">Quantité décroissante</option>
                <option value="qt-croissante">Quantité croissante</option>
                <option value="prix-decroissant">Prix-décroissant</option>
                <option value="prix-croissant">Prix-croissant</option>
                <option value="alph-decroissant">Nom décroissant</option>
                <option value="alph-croissant">Nom croissant</option>
              </select>
            )}
          </div>
        </div>
        <div className="Appli--container">
          <h1 className="ListeBouteille--cellier-nom">
            {props.nomCellier.nom}
          </h1>
          <div
            className={
              props.bouteilles.length == 1
                ? "ListeBouteilles"
                : "ListeBouteilles--default"
            }
          >
            <div></div>
            {props.bouteilles.length > 1 && (
              <div className="ListeBouteille--grid">
                {bouteillesTri.slice(debut, fin).map((bouteille, index) => (
                  <div key={index}>
                    <Bouteille
                      {...bouteille}
                      setChangementBouteille={setChangementBouteille}
                      fetchVins={props.fetchVins}
                      fetchVin={props.fetchVin}
                      gererBouteille={props.gererBouteille}
                      gererBouteilles={props.gererBouteilles}
                      bouteilles={props.bouteillesTri}
                      setBouteilles={props.setBouteillesTri}
                      cellier={props.cellier}
                      bouteille={bouteille}
                      URI={props.URI}
                      error={props.error}
                      setError={props.setError}
                      fetchUtilisateur={props.sfetchUtilisateur}
                      fetchAjouterFavoris={props.fetchAjouterFavoris}
                      fetchSupprimerFavoris={props.fetchSupprimerFavoris}
                      favorisId={props.favorisId}
                      setFavorisId={props.setFavorisId}
                    />
                  </div>
                ))}
              </div>
            )}
            {props.bouteilles.length == 1 && (
              <div className="Bouteille Bouteille--solo">
                <Bouteille
                  {...props.bouteilles[0]}
                  setChangementBouteille={setChangementBouteille}
                  fetchVins={props.fetchVins}
                  fetchVin={props.fetchVin}
                  celliers={props.celliers}
                  cellier={props.cellier}
                  setCellier={props.setCellier}
                  emailUtilisateur={props.emailUtilisateur}
                  gererCellier={props.gererCellier}
                  gererBouteilles={props.gererBouteilles}
                  bouteille={props.bouteilles[0]}
                  setBouteilles={props.setBouteilles}
                  URI={props.URI}
                  fetchUtilisateur={props.fetchUtilisateur}
                  fetchAjouterFavoris={props.fetchAjouterFavoris}
                  fetchSupprimerFavoris={props.fetchSupprimerFavoris}
                  favorisId={props.favorisId}
                  setFavorisId={props.setFavorisId}
                />
              </div>
            )}
            {props.bouteilles.length == undefined && (
              <div>
                <h2 className="aucune-bouteille">
                  Aucune bouteille dans ce cellier.
                </h2>
                <NavLink to="/vins">
                  <p className="ListeBouteille--default-button">
                    + Ajouter une bouteille
                  </p>
                </NavLink>
              </div>
            )}
            {props.bouteilles.length == 0 &&
              props.bouteilles.length !== undefined && (
                <div>
                  <h2 className="aucune-bouteille">
                    Aucune bouteille dans ce type dans ce cellier.
                  </h2>
                  <NavLink to="/vins">
                    <p className="ListeBouteille--default-button">
                      + Ajouter une bouteille
                    </p>
                  </NavLink>
                </div>
              )}
            {props.bouteilles.length > fin ? (
              <div className="fin--liste cliquable" onClick={gererVoirPlus}>
                Voir plus
              </div>
            ) : (
              props.bouteilles.length > 0 && (
                <div className="fin--liste">Fin de la liste</div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ListeBouteilles;
