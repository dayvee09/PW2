// Début des modifications

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
import ListeBouteilles from "./ListeBouteilles";
import FrmAjoutCellier from "./FrmAjoutCellier";
import FrmModifierCellier from "./FrmModifierCellier";
import Admin from "./Admin";
import ListeCelliers from "./ListeCelliers";
import Utilisateur from "./Utilisateur.jsx";
import Profil from "./Profil.jsx";
import Favoris from "./Favoris";
import Aide from "./Aide";
import { signOut, deleteUser, emailFromCognitoUser } from "./auth";
import { email } from "./utilisateur.js";
import Logo from "./img/png/logo-jaune.png";
import FrmAjoutBouteille from "./FrmAjoutBouteille";
import { formFields } from "./aws-form-traduction.js";
import ListeBouteillesInventaire from "./ListeBouteillesInventaire";

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
  const [nomCellier, setNomCellier] = useState("");
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
  const [userLoadError, setUserLoadError] = useState(null);
  const [sessionVersion, setSessionVersion] = useState(0);
  const bootstrapRunning = useRef(false);

  let location = window.location.pathname;

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
    fetchVinsInventaire();
    fetchFavorisId(id);
  }, [URI, id]);

  useEffect(() => {
    if (!URI || !cellier) return;
    fetchVins(cellier);
  }, [URI, cellier]);

  function gererBouteilles(idBouteilles) {
    setBouteilles(idBouteilles);
  }
  function gererCellier(idCellier) {
    setCellier(idCellier);
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
        setBouteillesInventaire("");
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
        setBouteillesInventaire("");
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
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function fetchNomCellier() {
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
        cellier
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setNomCellier(data.nom);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  // --------------------------------- Gestion des bouteilles ------------------------------------

  async function fetchVins(cellier) {
    if (!URI || !cellier) return;
    await fetch(URI + "/" + "cellier" + "/" + cellier + "/" + "vins")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setBouteilles(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }
  // --------------------------------- Gestion des différentes bouteilles comprises dans tous mes celliers ------------------------------------

  async function fetchVinsInventaire() {
    if (!URI || !id) return;
    await fetch(URI + "/" + "user_id" + "/" + id + "/" + "vinsInventaire")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setBouteillesInventaire(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function fetchAjouterFavoris(vin) {
    await fetch(URI + `/favoris/ajouter/favoris`, {
      method: "POST",
      body: JSON.stringify(vin),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        fetchFavorisId(id);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function fetchSupprimerFavoris(vin) {
    await fetch(URI + `/utilisateur/${id}/favoris/vin/${vin}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        fetchFavorisId(id);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function fetchFavorisId(utilisateur) {
    if (!URI || !utilisateur) return;
    await fetch(
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
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
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
                      gererBouteilles={gererBouteilles}
                      cellier={cellier}
                      celliers={celliers}
                      URI={URI}
                      error={error}
                      setError={setError}
                      fetchUtilisateur={fetchUtilisateur}
                      fetchAjouterFavoris={fetchAjouterFavoris}
                      fetchSupprimerFavoris={fetchSupprimerFavoris}
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
                      gererBouteilles={gererBouteilles}
                      cellier={cellier}
                      celliers={celliers}
                      URI={URI}
                      error={error}
                      setError={setError}
                      fetchUtilisateur={fetchUtilisateur}
                      fetchAjouterFavoris={fetchAjouterFavoris}
                      fetchSupprimerFavoris={fetchSupprimerFavoris}
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
                      fetchVins={fetchVins}
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
