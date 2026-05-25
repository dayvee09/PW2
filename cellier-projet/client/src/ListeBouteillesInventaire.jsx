import "./ListeBouteillesInventaire.scss";
import { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import BouteilleInventaire from "./BouteilleInventaire";
import Pagination from "@mui/material/Pagination";
import usePagination from "./Pagination";

/**
 * Gestion de la liste de l'inventaire des bouteilles
 *
 * Contenant l'affichage de l'inventaire total de bouteille de l'utilisateur et
 * l'inventaire par la bouteille, ainsi retrouver le cellier dans lequel la bouteille s'y trouve;
 * Intégrer la fonctionnalité de recherche permettant à l’utilisateur de retrouver la bouteille désirée
 * et la fonctionnalité de pagination
 *
 * @date 2022-09-30
 * @param {any} props
 * @returns {any}
 */
function ListeBouteillesInventaire(props) {
  const inventaire = Array.isArray(props.bouteillesInventaire)
    ? props.bouteillesInventaire
    : [];
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(
    () => !props.hasCachedInventaire?.()
  );
  const [debut, setDebut] = useState(0);
  const [fin, setFin] = useState(200);

  const results = useMemo(() => {
    if (!search) return inventaire;
    const q = search.toLowerCase();
    return inventaire.filter((b) => b.nom?.toLowerCase().includes(q));
  }, [inventaire, search]);

  const { quantite_total, prix_total } = useMemo(() => {
    if (results.length === 0) {
      return { quantite_total: 0, prix_total: 0 };
    }
    return {
      quantite_total: results.reduce(
        (prev, cur) =>
          parseInt(cur.quantite_total || 0, 10) + parseInt(prev || 0, 10),
        0
      ),
      prix_total: results.reduce(
        (prev, cur) =>
          parseFloat(cur.prix_total || 0) + parseFloat(prev || 0),
        0
      ),
    };
  }, [results]);

  /**
   * configuration de la pagination
   */
  let [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const count = Math.ceil(results.length / PER_PAGE);
  const _DATA = usePagination(results, PER_PAGE);
  //  const [afficheParPage, setAfficheParPage] = useState(12);
  //  const count = Math.ceil(results.length / afficheParPage);
  //  const _DATA = usePagination(results, afficheParPage);
  /**
   * gestion du changement de pagination
   * @param {*} e
   * @param {*} p
   */
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  //  /**
  //   * Permet à l'utilisateur de sélectionner le nb de bouteilles affichées par page
  //   * @param {*} event
  //   */
  //  const handleAfficheParPageChange = (event) => {
  //   setAfficheParPage(event.target.value);
  // };
  //  // style du composant NativeSelect
  //  const BootstrapInput = styled(InputBase)(({ theme }) => ({
  //   '& .MuiInputBase-input': {
  //     borderRadius: 4,
  //     position: 'relative',
  //     border: '1px solid #ced4da',
  //     fontSize: 14,
  //     padding: '2px 20px 4px 10px',
  //     transition: theme.transitions.create(['border-color', 'box-shadow']),
  //     '&:focus': {
  //       borderRadius: 4,
  //       borderColor: '#80bdff',
  //       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  //     },
  //   },
  // }));

  useEffect(() => {
    let cancelled = false;
    const hasCache = props.hasCachedInventaire?.();
    if (!hasCache) {
      setLoading(true);
    }
    props.fetchVinsInventaire().then((result) => {
      if (!cancelled) setLoading(false);
      return result;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function gererVoirPlus() {
    if (results.length > fin) {
      setFin(fin + 200);
    } else if (results.length <= fin) {
      setFin(results.length);
    }
  }

  function gererInputRecherche(e) {
    setSearch(e.target.value);
  }

  if (loading) {
    return (
      <>
        <div className="Appli--entete">
          <div className="Appli--search-bar-container">
            <input
              className="Appli--search-bar"
              placeholder="Trouver une bouteille"
              disabled
            />
          </div>
        </div>
        <div className="Appli--container">
          <p className="liste-cellier--etat">Chargement de l&apos;inventaire…</p>
        </div>
      </>
    );
  }

  if (results.length > 1) {
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
            <div className="liste-inventaire-total">
              <p>Quantité&nbsp; totale: &nbsp;{quantite_total}&nbsp; </p>
              <p>
                Valeur&nbsp; totale: &nbsp;{parseFloat(prix_total).toFixed(2)}
                &nbsp; $
              </p>
            </div>
          </div>
          <span className="liste-cellier--message-retour"></span>
          <Pagination
            className="pagination"
            count={count}
            size="small"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            aria-label="pagination"
          />

          <div className="ListeBouteillesInventaire">
            {_DATA.currentData().map((bouteilleInventaire) => (
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
                  gererCible={props.gererCible}
                />
              </div>
            ))}
          </div>
          <Pagination
            className="pagination"
            count={count}
            size="small"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
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
              onChange={gererInputRecherche}
            />
          </div>
        </div>
        <div className="Appli--container">
          <div className="liste-cellier--entete">
            <h1>Mes Bouteilles</h1>
            <div className="liste-inventaire-total">
              <p>Quantité&nbsp; totale: &nbsp;{quantite_total}&nbsp; </p>
              <p>
                Valeur&nbsp; totale: &nbsp;{parseFloat(prix_total).toFixed(2)}
                &nbsp; $
              </p>
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
                gererCible={props.gererCible}
              />
            </div>
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
          </div>
          <NavLink to="/vins">
            <p className="ListeBouteille--default-button">
              + Ajouter une bouteille
            </p>
          </NavLink>
        </div>
      </>
    );
  }
}

export default ListeBouteillesInventaire;
