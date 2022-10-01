import { useState, useEffect } from "react";
import "./Favoris.scss";
import Bouteille from "./Bouteille";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

/**
 * Gestion de la bouteille à favoris
 *
 * Contenant la gestion des états, de l'ajout et la suppresion de la bouteille à favorie
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
function Favoris(props) {
  const [favoris, setFavoris] = useState([]);
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(200);

  useEffect(() => {
    fetchFavoris(props.id);
  }, []);

  function gererVoirPlus() {
    if (favoris.length > fin) {
      setFin(fin + 200);
    } else if (favoris.length <= fin) {
      setFin(favoris.length);
    }
  }

  async function fetchFavoris(utilisateur) {
    await fetch(
      props.URI + "/" + "utilisateur" + "/" + utilisateur + "/" + "favoris"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setFavoris(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(error);
      });
  }

  if (favoris) {
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
          <h1 className="ListeBouteille--cellier-nom">Favoris</h1>
          <div
            className={
              favoris.length == 1
                ? "ListeBouteilles"
                : "ListeBouteilles--default"
            }
          >
            <div></div>
            {favoris.length > 1 && (
              <div className="ListeBouteille--grid">
                {favoris.slice(debut, fin).map((bouteille, index) => (
                  <div key={index}>
                    <Bouteille
                      {...bouteille}
                      fetchVins={props.fetchVins}
                      fetchVin={props.fetchVin}
                      gererBouteille={props.gererBouteille}
                      gererBouteilles={props.gererBouteilles}
                      cellier={props.cellier}
                      bouteille={bouteille}
                      URI={props.URI}
                      error={props.error}
                      setError={props.setError}
                      fetchUtilisateur={props.fetchUtilisateur}
                      fetchAjouterFavoris={props.fetchAjouterFavoris}
                      fetchSupprimerFavoris={props.fetchSupprimerFavoris}
                      id={bouteille.vino__bouteille_id}
                      vino__utilisateur_id={props.id}
                      favorisId={props.favorisId}
                      setFavorisId={props.setFavorisId}
                    />
                  </div>
                ))}
              </div>
            )}
            {favoris.length == 1 && (
              <div className="Bouteille Bouteille--solo">
                <Bouteille
                  {...favoris[0]}
                  fetchVins={props.fetchVins}
                  fetchVin={props.fetchVin}
                  celliers={props.celliers}
                  cellier={props.cellier}
                  setCellier={props.setCellier}
                  emailUtilisateur={props.emailUtilisateur}
                  gererCellier={props.gererCellier}
                  gererBouteilles={props.gererBouteilles}
                  bouteille={favoris[0]}
                  setBouteilles={props.setBouteilles}
                  URI={props.URI}
                  fetchUtilisateur={props.fetchUtilisateur}
                  fetchAjouterFavoris={props.fetchAjouterFavoris}
                  fetchSupprimerFavoris={props.fetchSupprimerFavoris}
                  id={favoris[0].vino__bouteille_id}
                  vino__utilisateur_id={props.id}
                  favorisId={props.favorisId}
                  setFavorisId={props.setFavorisId}
                />
              </div>
            )}
            {favoris.length == undefined && (
              <div>
                <h2 className="aucune-bouteille">Aucun favoris.</h2>
              </div>
            )}
            {favoris.length == 0 && favoris.length !== undefined && (
              <div>
                <h2 className="aucune-bouteille">Aucun favoris.</h2>
              </div>
            )}
            {favoris.length > fin ? (
              <div className="fin--liste cliquable" onClick={gererVoirPlus}>
                Voir plus
              </div>
            ) : (
              favoris.length > 0 && (
                <div className="fin--liste">Fin de la liste</div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Favoris;
