import React, { useEffect, useMemo, useState } from "react";
import "./ListeBouteilles.scss";
import Bouteille from "./Bouteille";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

function ListeBouteilles(props) {
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(200);
  const location = useLocation();
  // récupérer le nom du cellier reçu en paramètres
  console.log(props.nomCellier.nom);
  // var nomCellier = location.state.nom;

  useEffect(() => {
    props.fetchVins(props.cellier);
    props.fetchCellier(props.cellier);
    setSortType("tout");
  }, []);

  function gererVoirPlus() {
    if (props.bouteilles.length > fin) {
      setFin(fin + 200);
    } else if (props.bouteilles.length <= fin) {
      setFin(props.bouteilles.length);
    }
  }

  /**
   *  État des bouteilles au tri
   */
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState([]);
  const navigate = useNavigate();

  /**
   *  État des bouteilles au tri
   */
  const sortedData = useMemo(() => {
    let result = data;
    console.log(props.bouteilles);
    if (sortType === "qt-decroissante") {
      result = [...props.bouteilles].sort((a, b) => {
        return parseInt(b.quantite) - parseInt(a.quantite);
      });
    } else if (sortType === "qt-croissante") {
      result = [...props.bouteilles].sort((a, b) => {
        return parseInt(a.quantite) - parseInt(b.quantite);
      });
    }
    if (sortType === "prix-decroissant") {
      result = [...props.bouteilles].sort((a, b) => {
        return parseInt(b.prix_saq) - parseInt(a.prix_saq);
      });
    } else if (sortType === "prix-croissant") {
      result = [...props.bouteilles].sort((a, b) => {
        return parseInt(a.prix_saq) - parseInt(b.prix_saq);
      });
    } else if (sortType === "alph-decroissant") {
      result = [...props.bouteilles].sort((a, b) => {
        return b.nom.localeCompare(a.nom);
      });
    } else if (sortType === "alph-croissant") {
      result = [...props.bouteilles].sort((a, b) => {
        return a.nom.localeCompare(b.nom);
      });
    } else if (sortType === "vin-rouge") {
      result = [];
      for (let index = 0; index < props.bouteilles.length; index++) {
        if (props.bouteilles[index]["type"] === "Vin rouge") {
          result.push(props.bouteilles[index]);
        }
      }
    } else if (sortType === "vin-blanc") {
      result = [];
      for (let index = 0; index < props.bouteilles.length; index++) {
        if (props.bouteilles[index]["type"] === "Vin blanc") {
          result.push(props.bouteilles[index]);
        }
      }
    } else if (sortType === "vin-rose") {
      result = [];
      for (let index = 0; index < props.bouteilles.length; index++) {
        if (props.bouteilles[index]["type"] === "Vin rose") {
          result.push(props.bouteilles[index]);
        }
      }
    } else if (sortType === "tout") {
      result = props.bouteilles;
    }
    return result;
  }, [sortType, props.bouteilles]);

  /**
   * Redirection vers la modificiation du cellier
   */
  function gererModifier() {
    navigate(`/modifier-cellier`, {
      state: { id: props.cellier[0], nom: props.nomCellier.nom },
      replace: true,
    });
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
            <select
              className="retour"
              name="tri"
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
              <option value="qt-croissante">Quantité croissante</option>
              <option value="alph-decroissant">Nom décroissant</option>
              <option value="alph-croissant">Nom croissant</option>
            </select>
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
                {sortedData.slice(debut, fin).map((bouteille, index) => (
                  <div key={index}>
                    <Bouteille
                      {...bouteille}
                      fetchVins={props.fetchVins}
                      fetchVin={props.fetchVin}
                      gererBouteille={props.gererBouteille}
                      gererBouteilles={props.gererBouteilles}
                      bouteilles={props.bouteilles}
                      setBouteilles={props.setBouteilles}
                      cellier={props.cellier}
                      bouteille={bouteille}
                      URI={props.URI}
                      error={props.error}
                      setError={props.setError}
                      fetchUtilisateur={props.sfetchUtilisateur}
                    />
                  </div>
                ))}
              </div>
            )}
            {props.bouteilles.length == 1 && (
              <div className="Bouteille Bouteille--solo">
                <Bouteille
                  {...props.bouteilles[0]}
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
                  fetchUtilisateur={props.sfetchUtilisateur}
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
            {sortedData.length == 0 && props.bouteilles.length !== undefined && (
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
