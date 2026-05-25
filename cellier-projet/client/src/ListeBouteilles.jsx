<<<<<<< HEAD
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
  let indexBouteille = 0;
  console.log(props.bouteilles.length);
  if (props.bouteilles.length !== undefined) {
    indexBouteille = props.bouteilles.findIndex((object) => {
      return object.id === props.cible;
    });
  }
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
=======
import React, { useEffect, useMemo, useState } from "react";
import "./ListeBouteilles.scss";
import Bouteille from "./Bouteille";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
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
  const { idCellier: idCellierParam, cible: cibleParam } = useParams();
  const cible = cibleParam || props.cible;
  const navigate = useNavigate();
  const location = useLocation();
  const cellierId = idCellierParam || props.cellier;
  const bouteilles = Array.isArray(props.bouteilles) ? props.bouteilles : [];
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(200);
  const [changementBouteille, setChangementBouteille] = useState(false);
  const [loading, setLoading] = useState(true);
  /**
   *  État des bouteilles au tri
   */
  const [unique, setUnique] = useState(false);
  const [sortType, setSortType] = useState([]);
  let indexBouteille = 0;
  if (bouteilles.length > 0) {
    indexBouteille = bouteilles.findIndex((object) => {
      return object && object.id === cible;
    });
  }
  const bouteillesTri = useMemo(() => {
    switch (sortType) {
      case "qt-decroissante":
        return [...bouteilles].sort(
          (a, b) => parseInt(b.quantite) - parseInt(a.quantite)
        );
      case "qt-croissante":
        return [...bouteilles].sort(
          (a, b) => parseInt(a.quantite) - parseInt(b.quantite)
        );
      case "prix-decroissant":
        return [...bouteilles].sort(
          (a, b) => parseInt(b.prix_saq) - parseInt(a.prix_saq)
        );
      case "prix-croissant":
        return [...bouteilles].sort(
          (a, b) => parseInt(a.prix_saq) - parseInt(b.prix_saq)
        );
      case "alph-decroissant":
        return [...bouteilles]
          .filter((b) => b && b.nom)
          .sort((a, b) => b.nom.localeCompare(a.nom));
      case "alph-croissant":
        return [...bouteilles]
          .filter((b) => b && b.nom)
          .sort((a, b) => a.nom.localeCompare(b.nom));
      case "vin-rouge":
        return bouteilles.filter((b) => b?.type === "Vin rouge");
      case "vin-blanc":
        return bouteilles.filter((b) => b?.type === "Vin blanc");
      case "vin-rose":
        return bouteilles.filter((b) => b?.type === "Vin rose");
      default:
        return bouteilles;
    }
  }, [sortType, bouteilles]);

  useEffect(() => {
    if (!cellierId || !/^\d+$/.test(String(cellierId))) {
      navigate("/", { replace: true });
      return;
    }

    let cancelled = false;

    async function loadCellier() {
      if (props.gererCellier) {
        props.gererCellier(cellierId);
      }
      if (location.state?.nom && props.setNomCellier) {
        props.setNomCellier({ nom: location.state.nom });
      }
      const hasCache = props.hasCachedBouteilles?.(cellierId);
      if (!hasCache) {
        setLoading(true);
      }
      const result = await props.fetchVins(cellierId);
      if (cancelled) return;
      if (!result?.ok) {
        navigate("/", { replace: true });
        return;
      }
      if (!location.state?.nom) {
        props.fetchNomCellier(cellierId);
      }
      setSortType("tout");
      setLoading(false);
    }

    loadCellier();

    return () => {
      cancelled = true;
    };
  }, [cellierId]);

  useEffect(() => {
    if (changementBouteille !== false && cellierId) {
      props.fetchVins(cellierId, { force: true });
    }
  }, [changementBouteille]);

  useEffect(() => {
    if (cible) {
      if (document.querySelectorAll("[data-id]").length > 1) {
        if (
          document.querySelector(`[data-id="${cible}"]`) &&
          unique === false &&
          changementBouteille === false
        ) {
          let cibleElt = document.querySelector(`[data-id="${cible}"]`);
          let target = cibleElt.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: target,
            behavior: "smooth",
          });
        } else if (bouteilles.length > 200) {
          setUnique(true);
        }
      }
    }
  }, [props.bouteilles]);

  useEffect(() => {
    if (cible && bouteilles.length > 200 && indexBouteille >= 200) {
      setDebut(indexBouteille);
    }
  }, [unique]);

  useEffect(() => {
    if (cible && bouteilles.length > 200 && indexBouteille >= 200) {
      setFin(debut + 1);
    }
  }, [debut]);

  function gererVoirPlus() {
    if (bouteilles.length > fin) {
      setFin(fin + 200);
    } else if (bouteilles.length <= fin) {
      setFin(bouteilles.length);
    }
  }
  if (loading) {
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
          </div>
        </div>
        <div className="Appli--container">
          <p className="ListeBouteille--chargement">Chargement du cellier…</p>
        </div>
      </div>
    );
  }

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
            {bouteilles.length > 1 && (
              <select
                className="retour"
                name="tri"
                aria-label="tri"
                id="tri"
                defaultValue="tout"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="tout">
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
            {props.nomCellier?.nom ?? "Cellier"}
          </h1>
          <div
            className={
              bouteilles.length == 1
                ? "ListeBouteilles"
                : "ListeBouteilles--default"
            }
          >
            <div></div>
            {bouteilles.length > 1 && (
              <div className="ListeBouteille--grid">
                {bouteillesTri.slice(debut, fin).map((bouteille) => (
                  <div key={bouteille.id}>
                    <Bouteille
                      {...bouteille}
                      setChangementBouteille={setChangementBouteille}
                      fetchVins={props.fetchVins}
                      fetchVin={props.fetchVin}
                      gererBouteille={props.gererBouteille}
                      gererBouteilles={props.gererBouteilles}
                      bouteilles={props.bouteillesTri}
                      setBouteilles={props.setBouteillesTri}
                      cellier={cellierId}
                      bouteille={bouteille}
                      URI={props.URI}
                      error={props.error}
                      setError={props.setError}
                      fetchUtilisateur={props.sfetchUtilisateur}
                      fetchAjouterFavoris={props.fetchAjouterFavoris}
                      fetchSupprimerFavoris={props.fetchSupprimerFavoris}
                      fetchStatsCelliers={props.fetchStatsCelliers}
                      favorisId={props.favorisId}
                      setFavorisId={props.setFavorisId}
                    />
                  </div>
                ))}
              </div>
            )}
            {bouteilles.length == 1 && (
              <div className="Bouteille Bouteille--solo">
                <Bouteille
                  {...bouteilles[0]}
                  setChangementBouteille={setChangementBouteille}
                  fetchVins={props.fetchVins}
                  fetchVin={props.fetchVin}
                  celliers={props.celliers}
                  cellier={cellierId}
                  setCellier={props.setCellier}
                  emailUtilisateur={props.emailUtilisateur}
                  gererCellier={props.gererCellier}
                  gererBouteilles={props.gererBouteilles}
                  bouteille={bouteilles[0]}
                  setBouteilles={props.setBouteilles}
                  URI={props.URI}
                  fetchUtilisateur={props.fetchUtilisateur}
                  fetchAjouterFavoris={props.fetchAjouterFavoris}
                  fetchSupprimerFavoris={props.fetchSupprimerFavoris}
                  fetchStatsCelliers={props.fetchStatsCelliers}
                  favorisId={props.favorisId}
                  setFavorisId={props.setFavorisId}
                />
              </div>
            )}
            {bouteilles.length == undefined && (
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
            {bouteilles.length == 0 &&
              bouteilles.length !== undefined && (
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
            {bouteilles.length > fin ? (
              <div className="fin--liste cliquable" onClick={gererVoirPlus}>
                Voir plus
              </div>
            ) : (
              bouteilles.length > 0 && (
                <div className="fin--liste">Fin de la liste</div>
              )
            )}
          </div>
        </div>
      </div>
  );
}

export default ListeBouteilles;
>>>>>>> master
