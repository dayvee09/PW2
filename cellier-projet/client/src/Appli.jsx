// Début des modifications

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { signOut, deleteUser } from "./auth";
import { email } from "./utilisateur.js";
import Logo from "./img/png/logo-jaune.png";
import FrmAjoutBouteille from "./FrmAjoutBouteille";
import { formFields } from "./aws-form-traduction.js";
import ListeBouteillesInventaire from "./ListeBouteillesInventaire";

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
const AppliContent = () => {
  const { authStatus } = useAuthenticator();
  const isAuthenticated = authStatus === "authenticated";

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
  const ENV = "dev";
  const [URI, setURI] = useState("");
  const [favorisId, setFavorisId] = useState([]);

  let location = window.location.pathname;

  useEffect(() => {
    if (ENV == "prod") {
      setURI("https://monvino.app/api-php/index.php");
    } else {
      setURI("http://localhost/PW2/cellier-projet/api-php");
    }
  }, []);

  // ------------------------------- fonctions de gestion des états ----------------------------

  useEffect(() => {
    email().then((userEmail) => {
      if (userEmail) {
        setEmailUtilisateur(userEmail);
      }
    });
  }, []);

  useEffect(() => {
    if (!URI || !emailUtilisateur || utilisateur) return;
    ensureUser(emailUtilisateur);
  }, [URI, emailUtilisateur, utilisateur]);

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

  async function ensureUser(emailUtilisateur) {
    if (!URI || !emailUtilisateur) return;

    try {
      const existing = await fetch(
        URI + "/email/" + emailUtilisateur + "/utilisateurs"
      );
      if (existing.ok) {
        const data = await existing.json();
        if (Array.isArray(data) && data.length > 0) {
          setUtilisateur(data[0]);
          return;
        }
      }

      const reponse = await fetch(URI + "/admin/ajout/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailUtilisateur,
          nom: defaultUsernameFromEmail(emailUtilisateur),
        }),
      });
      if (!reponse.ok) {
        throw reponse;
      }
      await fetchUtilisateur();
    } catch (error) {
      console.error("Error creating user: ", error);
      setError(error);
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
    await fetch(
      URI + "/" + "email" + "/" + emailUtilisateur + "/" + "utilisateurs"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUtilisateur(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
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
        setUtilisateur("");
        setBouteilles("");
        setBouteillesInventaire("");
        setCelliers("");
        setEmailUtilisateur("");
        setUsername("");
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
        setUtilisateur("");
        setBouteilles("");
        setBouteillesInventaire("");
        setCelliers("");
        setEmailUtilisateur("");
        setUsername("");
        setIndexNav(0);
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
        if (data["erreur"] === undefined) {
          setCelliers(data);
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
    <AppliContent />
  </Authenticator>
);

export default Appli;
