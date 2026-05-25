// Début des modifications

import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Hub } from "aws-amplify/utils";
import {
  Authenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./Appli.scss";
import NavMobile from "./NavMobile";
import NavDesktop from "./NavDesktop";
import PiedDePage from "./PiedDePage.jsx";
import ListeCelliers from "./ListeCelliers";
import Utilisateur from "./Utilisateur.jsx";
import { signOut, deleteUser, emailFromCognitoUser } from "./auth";
import { email } from "./utilisateur.js";
import Logo from "./img/png/logo-jaune.png";
import { formFields } from "./aws-form-traduction.js";

const Admin = lazy(() => import("./Admin"));
const Profil = lazy(() => import("./Profil.jsx"));
const Aide = lazy(() => import("./Aide"));
const ListeBouteilles = lazy(() => import("./ListeBouteilles"));
const FrmAjoutBouteille = lazy(() => import("./FrmAjoutBouteille"));
const ListeBouteillesInventaire = lazy(() =>
  import("./ListeBouteillesInventaire")
);
const Favoris = lazy(() => import("./Favoris"));
const FrmAjoutCellier = lazy(() => import("./FrmAjoutCellier"));
const FrmModifierCellier = lazy(() => import("./FrmModifierCellier"));

const RouteFallback = () => (
  <p className="liste-cellier--etat">Chargement…</p>
);

function ProfilRedirect({ emailUtilisateur }) {
  if (!emailUtilisateur) {
    return <Navigate to="/" replace />;
  }
  return (
    <Navigate
      to={`/profil/${encodeURIComponent(emailUtilisateur)}`}
      replace
    />
  );
}

/**
 * Gestion de l'application
 *
 * contenant la gestion des états, la configuration de la varible de l'environnement , des paramètres de routage du système.
 * Prétraitement, acquisition et chargement de toutes les données à render, déploiement logique algorithmique.
 * Disposition des composants
 *
 * @date 2022-09-30
 * @returns {*}
 */
// In dev, use same-origin path so setupProxy.js forwards to Apache (port 80).
const DEV_API_URI =
  process.env.REACT_APP_API_URI || "/PW2/cellier-projet/api-php";
const PROD_API_URI = "https://monvino.app/api-php/index.php";

function normalizeUtilisateur(data) {
  if (!data) return null;
  if (Array.isArray(data)) {
    return data.length > 0 && data[0]?.id ? data[0] : null;
  }
  if (data.erreur) return null;
  return data.id ? data : null;
}

const AppliContent = ({ cognitoUser }) => {
  const { authStatus, route } = useAuthenticator();
  const isAuthenticated =
    route === "authenticated" ||
    route === "signOut" ||
    authStatus === "authenticated";

  const [error, setError] = useState(null);
  const [bouteilles, setBouteilles] = useState([]);
  const [bouteillesInventaire, setBouteillesInventaire] = useState([]);
  const [emailUtilisateur, setEmailUtilisateur] = useState("");
  const [id, setId] = useState("");
  const [cellier, setCellier] = useState("");
  const [cible, setCible] = useState("");
  const [nomCellier, setNomCellier] = useState(null);
  const [username, setUsername] = useState("");
  const [utilisateur, setUtilisateur] = useState(null);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [celliers, setCelliers] = useState([]);
  const [indexNav, setIndexNav] = useState(0);
  const [resetBottomNav, setResetBottomNav] = useState(false);
  const URI =
    process.env.REACT_APP_API_URI ||
    (process.env.NODE_ENV === "production" ? PROD_API_URI : DEV_API_URI);
  const [favorisId, setFavorisId] = useState([]);
  const [statsCelliers, setStatsCelliers] = useState({});
  const [userLoadError, setUserLoadError] = useState(null);
  const [sessionVersion, setSessionVersion] = useState(0);
  const bootstrapRunning = useRef(false);
  const bouteillesCacheRef = useRef({});
  const vinsFetchInFlightRef = useRef({});
  const inventaireCacheRef = useRef(null);
  const inventaireFetchInFlightRef = useRef(null);
  const favorisLoadedRef = useRef(false);
  const favorisFetchInFlightRef = useRef(null);
  const cellierActifRef = useRef("");

  const location = useLocation();

  useEffect(() => {
    const match = location.pathname.match(/\/cellier\/(\d+)\/vins/);
    if (match) {
      cellierActifRef.current = match[1];
      setCellier(match[1]);
    }
  }, [location.pathname]);

  function applyUtilisateur(user, userEmail) {
    setUtilisateur(user);
    setId(String(user.id));
    setUsername(user.nom || defaultUsernameFromEmail(userEmail));
    setEmailUtilisateur(userEmail);
  }

  // ------------------------------- fonctions de gestion des états ----------------------------

  useEffect(() => {
    if (!isAuthenticated) {
      setId("");
      setUtilisateur(null);
      setEmailUtilisateur("");
      setUsername("");
      setCelliers([]);
      setUserLoadError(null);
      bootstrapRunning.current = false;
      return;
    }

    let cancelled = false;

    async function resolveEmail() {
      setUserLoadError(null);
      let userEmail = emailFromCognitoUser(cognitoUser);
      if (!userEmail) {
        userEmail = await email();
      }
      if (cancelled) return;
      if (userEmail) {
        setEmailUtilisateur((prev) => prev || userEmail);
        return;
      }
      setUserLoadError(
        new Error(
          "Impossible de lire l'email du compte connecté. Réessayez ou utilisez la connexion par courriel."
        )
      );
    }

    resolveEmail();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, cognitoUser, sessionVersion]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!URI || !emailUtilisateur || id) return;

    let cancelled = false;

    async function bootstrap() {
      if (bootstrapRunning.current) return;
      bootstrapRunning.current = true;
      try {
        setUserLoadError(null);
        const ok = await ensureUser(emailUtilisateur);
        if (!cancelled && !ok) {
          setUserLoadError(
            (prev) =>
              prev ||
              new Error(
                "Compte introuvable dans la base de données. Vérifiez que l'API PHP répond."
              )
          );
        }
      } catch (err) {
        console.error("Session bootstrap failed:", err);
        if (!cancelled) {
          setUserLoadError(err);
        }
      } finally {
        bootstrapRunning.current = false;
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
      bootstrapRunning.current = false;
    };
  }, [isAuthenticated, URI, emailUtilisateur, id, sessionVersion]);

  useEffect(() => {
    const cancel = Hub.listen("auth", ({ payload }) => {
      if (
        payload.event === "signedIn" ||
        payload.event === "tokenRefresh"
      ) {
        bootstrapRunning.current = false;
        setSessionVersion((version) => version + 1);
      }
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    if (!URI || !id) return;
    fetchCelliers();
  }, [URI, id]);

  useEffect(() => {
    if (!URI || !id) return;
    const needsFavoris =
      /^\/cellier\/\d+\/vins/.test(location.pathname) ||
      location.pathname === "/favoris";
    const needsInventaire = location.pathname === "/vinsInventaire";
    if (needsFavoris) {
      ensureFavorisLoaded();
    }
    if (needsInventaire) {
      fetchVinsInventaire();
    }
  }, [URI, id, location.pathname]);

  function gererBouteilles(idBouteilles) {
    setBouteilles(idBouteilles);
  }
  function gererCellier(idCellier) {
    cellierActifRef.current = String(idCellier);
    setCellier(idCellier);
  }

  function hasCachedBouteilles(cellierId) {
    return Boolean(bouteillesCacheRef.current[String(cellierId)]);
  }

  function invalidateBouteillesCache(cellierId) {
    if (cellierId != null) {
      delete bouteillesCacheRef.current[String(cellierId)];
    } else {
      bouteillesCacheRef.current = {};
    }
  }
  function gererCible(cible) {
    setCible(cible);
  }

  // -------------------------- Requêtes Fetch ------------------------------------------------------

  // ----------------------- Gestion des utilisateurs ------------------------------------------------
  function defaultUsernameFromEmail(emailUtilisateur) {
    if (emailUtilisateur.includes("@")) {
      return emailUtilisateur.substring(0, emailUtilisateur.indexOf("@"));
    }
    if (emailUtilisateur.includes("amazon")) return "Utilisateur Amazon";
    if (emailUtilisateur.includes("google")) return "Utilisateur Google";
    if (emailUtilisateur.includes("facebook")) return "Utilisateur facebook";
    return "Utilisateur";
  }

  async function ensureUser(userEmail) {
    if (!URI || !userEmail) return false;

    const encodedEmail = encodeURIComponent(userEmail);

    try {
      setUserLoadError(null);
      const existing = await fetch(
        URI + "/email/" + encodedEmail + "/utilisateurs"
      );
      if (existing.ok) {
        const data = await existing.json();
        const user = normalizeUtilisateur(data);
        if (user) {
          applyUtilisateur(user, userEmail);
          return true;
        }
      }

      const reponse = await fetch(URI + "/admin/ajout/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          nom: defaultUsernameFromEmail(userEmail),
        }),
      });
      if (!reponse.ok) {
        let detail = "";
        try {
          const errBody = await reponse.json();
          detail = errBody?.erreur ? `: ${errBody.erreur}` : "";
        } catch {
          /* ignore */
        }
        throw new Error(
          `Création du compte refusée (HTTP ${reponse.status})${detail}`
        );
      }
      const created = await reponse.json();
      if (created?.id) {
        applyUtilisateur(
          {
            id: created.id,
            email: userEmail,
            nom: defaultUsernameFromEmail(userEmail),
          },
          userEmail
        );
        return true;
      }

      const retry = await fetch(
        URI + "/email/" + encodedEmail + "/utilisateurs"
      );
      if (retry.ok) {
        const data = await retry.json();
        const user = normalizeUtilisateur(data);
        if (user) {
          applyUtilisateur(user, userEmail);
          return true;
        }
      }

      setUserLoadError(new Error("Utilisateur introuvable"));
      return false;
    } catch (error) {
      console.error("Error creating user: ", error);
      setUserLoadError(error);
      setError(error);
      return false;
    }
  }

  // Alias kept for any legacy references (e.g. props named createUser)
  const createUser = ensureUser;

  async function fetchUtilisateurs() {
    if (!URI || !emailUtilisateur) return;
    await fetch(
      URI + "/" + "admin" + "/" + emailUtilisateur + "/" + "utilisateurs"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUtilisateurs(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function fetchUtilisateur() {
    if (!URI || !emailUtilisateur) return;
    const encodedEmail = encodeURIComponent(emailUtilisateur);
    await fetch(URI + "/email/" + encodedEmail + "/utilisateurs")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const user = normalizeUtilisateur(data);
        if (user) {
          applyUtilisateur(user, emailUtilisateur);
        }
      })
      .catch((error) => {
        console.error("Error fetching utilisateur: ", error);
        setError(error);
      });
  }

  async function supprimerUtilisateur() {
    let reponse = await fetch(
      URI + "/" + "email" + "/" + emailUtilisateur + "/" + "utilisateurs",
      { method: "DELETE" }
    );
    let reponseJson = await reponse.json();
    await deleteUser()
      .then(() => {
        setId("");
        setUtilisateur(null);
        setBouteilles("");
        setBouteillesInventaire([]);
        inventaireCacheRef.current = null;
        favorisLoadedRef.current = false;
        setFavorisId([]);
        setCelliers("");
        setEmailUtilisateur("");
        setUsername("");
        bootstrapRunning.current = false;
      })
      .catch((err) =>
        console.log("Erreur lors de la suppression de votre profil", err)
      );
  }

  async function gererSignOut() {
    await signOut()
      .then(() => {
        setResetBottomNav(false);
        setId("");
        setUtilisateur(null);
        setBouteilles("");
        setBouteillesInventaire([]);
        inventaireCacheRef.current = null;
        favorisLoadedRef.current = false;
        setFavorisId([]);
        setCelliers([]);
        setEmailUtilisateur("");
        setUsername("");
        setIndexNav(0);
        bootstrapRunning.current = false;
      })
      .catch((err) => console.log("Erreur lors de la déconnexion", err));
  }

  // ---------------------------------- Gestion des celliers -----------------------------
  async function fetchCelliers() {
    if (!URI || !id) return;
    await fetch(URI + "/" + "user_id" + "/" + id + "/" + "celliers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (data?.erreur === undefined) {
          setCelliers(Array.isArray(data) ? data : []);
          fetchStatsCelliers();
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function fetchStatsCelliers() {
    if (!URI || !id) return;
    try {
      const response = await fetch(
        URI + "/" + "user_id" + "/" + id + "/" + "stats"
      );
      if (!response.ok) throw response;
      const data = await response.json();
      const map = {};
      if (Array.isArray(data)) {
        data.forEach((row) => {
          map[String(row.cellier_id)] = row;
        });
      }
      setStatsCelliers(map);
    } catch (error) {
      console.error("Error fetching cellar stats: ", error);
    }
  }

  async function fetchNomCellier(cellierId) {
    const targetCellier = cellierId ?? cellier;
    if (!URI || !id || !targetCellier) return;
    await fetch(
      URI +
        "/" +
        "user_id" +
        "/" +
        id +
        "/" +
        "celliers" +
        "/" +
        "cellier" +
        "/" +
        targetCellier
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (data && data.nom) {
          setNomCellier(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  // --------------------------------- Gestion des bouteilles ------------------------------------

  async function loadVinsFromApi(cellierId) {
    const key = String(cellierId);
    if (vinsFetchInFlightRef.current[key]) {
      return vinsFetchInFlightRef.current[key];
    }
    const promise = (async () => {
      try {
        const response = await fetch(
          URI + "/" + "cellier" + "/" + cellierId + "/" + "vins"
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (data?.erreur) {
          throw new Error(data.erreur);
        }
        const list = Array.isArray(data) ? data : [];
        return { ok: true, data: list };
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        return { ok: false, error };
      } finally {
        delete vinsFetchInFlightRef.current[key];
      }
    })();
    vinsFetchInFlightRef.current[key] = promise;
    return promise;
  }

  async function fetchVins(cellierId, options = {}) {
    const { force = false } = options;
    const key = String(cellierId);
    if (!URI || !cellierId) return { ok: false };

    const cached = bouteillesCacheRef.current[key];
    if (cached && !force) {
      setBouteilles(cached);
      loadVinsFromApi(cellierId).then((result) => {
        if (result.ok) {
          bouteillesCacheRef.current[key] = result.data;
          if (cellierActifRef.current === key) {
            setBouteilles(result.data);
          }
        }
      });
      return { ok: true, data: cached, fromCache: true };
    }

    const result = await loadVinsFromApi(cellierId);
    if (result.ok) {
      bouteillesCacheRef.current[key] = result.data;
      setBouteilles(result.data);
    } else {
      invalidateBouteillesCache(cellierId);
      setBouteilles([]);
    }
    return result;
  }

  function prefetchVins(cellierId) {
    const key = String(cellierId);
    if (!URI || !cellierId || bouteillesCacheRef.current[key]) return;
    if (vinsFetchInFlightRef.current[key]) return;
    loadVinsFromApi(cellierId).then((result) => {
      if (result.ok) {
        bouteillesCacheRef.current[key] = result.data;
      }
    });
  }
  // --------------------------------- Gestion des différentes bouteilles comprises dans tous mes celliers ------------------------------------

  async function loadInventaireFromApi() {
    if (inventaireFetchInFlightRef.current) {
      return inventaireFetchInFlightRef.current;
    }
    const promise = (async () => {
      try {
        const response = await fetch(
          URI + "/" + "user_id" + "/" + id + "/" + "vinsInventaire"
        );
        if (!response.ok) throw response;
        const data = await response.json();
        const list = Array.isArray(data) ? data : [];
        return { ok: true, data: list };
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        return { ok: false, error };
      } finally {
        inventaireFetchInFlightRef.current = null;
      }
    })();
    inventaireFetchInFlightRef.current = promise;
    return promise;
  }

  async function fetchVinsInventaire(options = {}) {
    const { force = false } = options;
    if (!URI || !id) return { ok: false };

    const cached = inventaireCacheRef.current;
    if (cached && !force) {
      setBouteillesInventaire(cached);
      loadInventaireFromApi().then((result) => {
        if (result.ok) {
          inventaireCacheRef.current = result.data;
          setBouteillesInventaire(result.data);
        }
      });
      return { ok: true, data: cached, fromCache: true };
    }

    const result = await loadInventaireFromApi();
    if (result.ok) {
      inventaireCacheRef.current = result.data;
      setBouteillesInventaire(result.data);
    } else {
      inventaireCacheRef.current = null;
      setBouteillesInventaire([]);
    }
    return result;
  }

  function hasCachedInventaire() {
    return inventaireCacheRef.current !== null;
  }

  function prefetchVinsInventaire() {
    if (!URI || !id || inventaireCacheRef.current) return;
    if (inventaireFetchInFlightRef.current) return;
    loadInventaireFromApi().then((result) => {
      if (result.ok) {
        inventaireCacheRef.current = result.data;
        setBouteillesInventaire(result.data);
      }
    });
  }

  function invalidateInventaireCache() {
    inventaireCacheRef.current = null;
  }

  async function fetchAjouterFavoris(vin) {
    const vinId = vin.vino__bouteille_id;
    setFavorisId((prev) => [
      ...prev,
      { vino__bouteille_id: vinId },
    ]);
    try {
      const response = await fetch(URI + `/favoris/ajouter/favoris`, {
        method: "POST",
        body: JSON.stringify(vin),
      });
      if (!response.ok) throw response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
      fetchFavorisId(id);
    }
  }

  async function fetchSupprimerFavoris(vin) {
    setFavorisId((prev) =>
      prev.filter((f) => f.vino__bouteille_id !== vin)
    );
    try {
      const response = await fetch(
        URI + `/utilisateur/${id}/favoris/vin/${vin}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
      fetchFavorisId(id);
    }
  }

  async function fetchFavorisId(utilisateur) {
    if (!URI || !utilisateur) return;
    if (favorisFetchInFlightRef.current) {
      return favorisFetchInFlightRef.current;
    }
    const promise = fetch(
      URI + "/" + "utilisateurId" + "/" + utilisateur + "/" + "favoris"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setFavorisId(data);
        favorisLoadedRef.current = true;
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
        throw error;
      })
      .finally(() => {
        favorisFetchInFlightRef.current = null;
      });
    favorisFetchInFlightRef.current = promise;
    return promise;
  }

  function ensureFavorisLoaded() {
    if (!URI || !id || favorisLoadedRef.current) return;
    fetchFavorisId(id);
  }

  function prefetchFavorisId() {
    ensureFavorisLoaded();
  }

  // ---------------------------------- Rendering -----------------------------------------
  return (
    <div className={isAuthenticated ? "Appli" : "Login"}>
      {isAuthenticated && (
        <NavDesktop
          emailUtilisateur={emailUtilisateur}
          gererSignOut={gererSignOut}
          utilisateur={utilisateur}
          username={username}
          prefetchVinsInventaire={prefetchVinsInventaire}
          prefetchFavorisId={prefetchFavorisId}
        />
      )}
      <div>
        <div>
              <Utilisateur
                utilisateur={utilisateur}
                setUtilisateur={setUtilisateur}
                utilisateurs={utilisateurs}
                setUtilisateurs={setUtilisateurs}
                username={username}
                setUsername={setUsername}
                id={id}
                setId={setId}
                emailUtilisateur={emailUtilisateur}
                setEmailUtilisateur={setEmailUtilisateur}
                fetchUtilisateurs={fetchUtilisateurs}
                fetchUtilisateur={fetchUtilisateur}
                createUser={createUser}
              />

              {/* ------------------------------ Routes --------------------------------*/}
              <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route
                  path="/profil"
                  element={
                    <ProfilRedirect emailUtilisateur={emailUtilisateur} />
                  }
                />
                <Route
                  path="/profil/"
                  element={
                    <ProfilRedirect emailUtilisateur={emailUtilisateur} />
                  }
                />
                <Route
                  path={`/profil/:emailUtilisateur`}
                  element={
                    <Profil
                      supprimerUtilisateur={supprimerUtilisateur}
                      emailUtilisateur={emailUtilisateur}
                      setEmailUtilisateur={setEmailUtilisateur}
                      utilisateur={utilisateur}
                      setUsername={setUsername}
                      username={username}
                      fetchUtilisateur={fetchUtilisateur}
                      setUtilisateur={setUtilisateur}
                      gererSignOut={gererSignOut}
                      URI={URI}
                    />
                  }
                />
                <Route
                  path={`/admin/:emailUtilisateur`}
                  element={
                    <Admin
                      emailUtilisateur={emailUtilisateur}
                      setEmailUtilisateur={setEmailUtilisateur}
                      utilisateur={utilisateur}
                      setUtilisateur={setUtilisateur}
                      URI={URI}
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      error={error}
                      setError={setError}
                      gererSignOut={gererSignOut}
                      fetchVins={fetchVins}
                    />
                  }
                />
                <Route
                  path={`/cellier/:idCellier/vins`}
                  element={
                    <ListeBouteilles
                      nomCellier={nomCellier}
                      setNomCellier={setNomCellier}
                      fetchNomCellier={fetchNomCellier}
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      fetchVins={fetchVins}
                      hasCachedBouteilles={hasCachedBouteilles}
                      gererBouteilles={gererBouteilles}
                      gererCellier={gererCellier}
                      cellier={cellier}
                      celliers={celliers}
                      URI={URI}
                      error={error}
                      setError={setError}
                      fetchUtilisateur={fetchUtilisateur}
                      fetchAjouterFavoris={fetchAjouterFavoris}
                      fetchSupprimerFavoris={fetchSupprimerFavoris}
                      fetchVinsInventaire={fetchVinsInventaire}
                      fetchStatsCelliers={fetchStatsCelliers}
                      favorisId={favorisId}
                      setFavorisId={setFavorisId}
                    />
                  }
                />
                <Route
                  path={`/cellier/:idCellier/vins/:cible`}
                  element={
                    <ListeBouteilles
                      nomCellier={nomCellier}
                      setNomCellier={setNomCellier}
                      fetchNomCellier={fetchNomCellier}
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      fetchVins={fetchVins}
                      hasCachedBouteilles={hasCachedBouteilles}
                      gererBouteilles={gererBouteilles}
                      gererCellier={gererCellier}
                      cellier={cellier}
                      celliers={celliers}
                      URI={URI}
                      error={error}
                      setError={setError}
                      fetchUtilisateur={fetchUtilisateur}
                      fetchAjouterFavoris={fetchAjouterFavoris}
                      fetchSupprimerFavoris={fetchSupprimerFavoris}
                      fetchVinsInventaire={fetchVinsInventaire}
                      fetchStatsCelliers={fetchStatsCelliers}
                      favorisId={favorisId}
                      setFavorisId={setFavorisId}
                      cible={cible}
                    />
                  }
                />
                <Route
                  path={`/vins`}
                  element={
                    <FrmAjoutBouteille
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      fetchVins={fetchVins}
                      fetchVinsInventaire={fetchVinsInventaire}
                      fetchStatsCelliers={fetchStatsCelliers}
                      fetchCelliers={fetchCelliers}
                      gererBouteilles={gererBouteilles}
                      celliers={celliers}
                      cellier={cellier}
                      setCellier={setCellier}
                      URI={URI}
                      error={error}
                      setError={setError}
                    />
                  }
                />
                <Route
                  path={`/vinsInventaire`}
                  element={
                    <ListeBouteillesInventaire
                      bouteillesInventaire={bouteillesInventaire}
                      setBouteillesInventaire={setBouteillesInventaire}
                      fetchVinsInventaire={fetchVinsInventaire}
                      hasCachedInventaire={hasCachedInventaire}
                      user_id={id}
                      URI={URI}
                      error={error}
                      setError={setError}
                      cellier={cellier}
                      fetchVins={fetchVins}
                      fetchNomCellier={fetchNomCellier}
                      gererCellier={gererCellier}
                      gererCible={gererCible}
                    />
                  }
                />
                <Route
                  path={`/`}
                  element={
                    <ListeCelliers
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      celliers={celliers}
                      setCelliers={setCelliers}
                      cellier={cellier}
                      setCellier={setCellier}
                      fetchCelliers={fetchCelliers}
                      fetchStatsCelliers={fetchStatsCelliers}
                      statsCelliers={statsCelliers}
                      fetchVins={fetchVins}
                      prefetchVins={prefetchVins}
                      prefetchFavorisId={prefetchFavorisId}
                      invalidateBouteillesCache={invalidateBouteillesCache}
                      id={id}
                      emailUtilisateur={emailUtilisateur}
                      utilisateur={utilisateur}
                      gererCellier={gererCellier}
                      URI={URI}
                      error={error}
                      setError={setError}
                      userLoadError={userLoadError}
                    />
                  }
                />
                <Route
                  path={`/PW2/cellier-projet`}
                  element={
                    <ListeCelliers
                      celliers={celliers}
                      setCelliers={setCelliers}
                      cellier={cellier}
                      setCellier={setCellier}
                      fetchCelliers={fetchCelliers}
                      fetchVins={fetchVins}
                      id={id}
                      emailUtilisateur={emailUtilisateur}
                      utilisateur={utilisateur}
                      gererCellier={gererCellier}
                      URI={URI}
                      error={error}
                      setError={setError}
                      userLoadError={userLoadError}
                      fetchStatsCelliers={fetchStatsCelliers}
                      statsCelliers={statsCelliers}
                      prefetchVins={prefetchVins}
                      prefetchFavorisId={prefetchFavorisId}
                      invalidateBouteillesCache={invalidateBouteillesCache}
                    />
                  }
                />
                <Route
                  path={`/cellier/ajout/celliers`}
                  element={
                    <FrmAjoutCellier
                      celliers={celliers}
                      fetchCelliers={fetchCelliers}
                      URI={URI}
                      setError={setError}
                    />
                  }
                />
                <Route
                  path={`/modifier-cellier`}
                  element={
                    <FrmModifierCellier
                      fetchCelliers={fetchCelliers}
                      URI={URI}
                      error={error}
                      setError={setError}
                    />
                  }
                />
                <Route
                  path={`/favoris`}
                  element={
                    <Favoris
                      URI={URI}
                      error={error}
                      setError={setError}
                      id={id}
                      nomCellier={nomCellier}
                      setNomCellier={setNomCellier}
                      fetchNomCellier={fetchNomCellier}
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      fetchVins={fetchVins}
                      gererBouteilles={gererBouteilles}
                      cellier={cellier}
                      celliers={celliers}
                      fetchUtilisateur={fetchUtilisateur}
                      fetchAjouterFavoris={fetchAjouterFavoris}
                      fetchSupprimerFavoris={fetchSupprimerFavoris}
                      favorisId={favorisId}
                      setFavorisId={setFavorisId}
                    />
                  }
                />
                <Route
                  path={`/aide`}
                  element={<Aide URI={URI} error={error} setError={setError} />}
                />
              </Routes>
              </Suspense>
        </div>
        <p className={isAuthenticated ? "Hidden" : "Auth-sub-title"}>
          Commencez dès maintenant votre collection de vin !
        </p>
        <NavMobile
          isAuthenticated={isAuthenticated}
          emailUtilisateur={emailUtilisateur}
          utilisateur={utilisateur}
          setIndexNav={setIndexNav}
          indexNav={indexNav}
          setResetBottomNav={setResetBottomNav}
          resetBottomNav={resetBottomNav}
          prefetchVinsInventaire={prefetchVinsInventaire}
          prefetchFavorisId={prefetchFavorisId}
        />
      </div>
      <PiedDePage />
    </div>
  );
};

const Appli = () => (
  <Authenticator
    socialProviders={["amazon", "google"]}
    className="Authenticator"
    formFields={formFields}
    components={{
      Header() {
        return (
          <img className="logo" src={Logo} alt="logo-mon-vino" />
        );
      },
    }}
  >
    {({ user }) => <AppliContent cognitoUser={user} />}
  </Authenticator>
);

export default Appli;
