// Début des modifications

import React from "react";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Axios from "axios";
import "./Appli.scss";
import NavMobile from "./NavMobile";
import NavDesktop from "./NavDesktop";
import PiedDePage from "./PiedDePage.jsx";
import ListeBouteilles from "./ListeBouteilles";
import FrmAjoutCellier from "./FrmAjoutCellier";
import FrmModifierCellier from "./FrmModifierCellier";
import Admin from "./Admin";
import ListeCelliers from "./ListeCelliers";
import Utilisateur, { user } from "./Utilisateur.jsx";
import Profil from "./Profil.jsx";
import { Auth } from "aws-amplify";
import { email } from "./utilisateur.js";
import Bouteille from "./Bouteille";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Logo from "./img/png/logo-jaune.png";
import FrmAjoutBouteille from "./FrmAjoutBouteille";
import { dict, formFields } from "./aws-form-traduction.js";

let DATA;

const Appli = () => {
  const [error, setError] = useState([]);
  const [bouteilles, setBouteilles] = useState([]);
  const [emailUtilisateur, setEmailUtilisateur] = useState([]);
  const [id, setId] = useState([]);
  const [cellier, setCellier] = useState(() => {
    const savedCellier = localStorage.getItem("cellier");
    const initialValueCellier = JSON.parse(savedCellier);
    return initialValueCellier || "";
  });
  const [username, setUsername] = useState([]);
  const [utilisateur, setUtilisateur] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [celliers, setCelliers] = useState([]);
  const [indexNav, setIndexNav] = useState(0);
  const [resetBottomNav, setResetBottomNav] = useState(false);
  const ENV = "dev";
  const [URI, setURI] = useState([]);

  let location = window.location.pathname;
  useEffect(() => {
    if (ENV == "prod") {
      setURI("http://100.26.239.127/PW2/cellier-projet/api-php/index.php");
    } else {
      setURI("http://localhost/PW2/cellier-projet/api-php");
    }
  }, []);

  // ------------------------------- fonctions de gestion des états ----------------------------

  email().then((email) => {
    const emailUtilisateur = email;
    // console.log(emailUtilisateur);
    setEmailUtilisateur(emailUtilisateur);
    // console.log(DATA);
    if (DATA !== undefined) {
      return;
    }
    createUser(emailUtilisateur);
    DATA = true;
  });

  useEffect(() => {
    fetchCelliers();
  }, [id]);

  useEffect(() => {
    fetchVins(cellier);
  }, [cellier]);

  function gererBouteilles(idBouteilles) {
    setBouteilles(idBouteilles);
  }
  function gererCellier(idCellier) {
    setCellier(idCellier);
  }

  // -------------------------- Requêtes Fetch ------------------------------------------------------

  // ----------------------- Gestion des utilisateurs ------------------------------------------------
  async function createUser(emailUtilisateur) {
    let bool = false;
    let DefautUsername = emailUtilisateur.substring(
      0,
      emailUtilisateur.indexOf("@")
    );
    utilisateurs.forEach((utilisateur) => {
      if (utilisateur["email"] === emailUtilisateur && bool === false) {
        bool = true;
      }
    });
    if (!bool) {
      let reponse = await fetch(URI + "/admin/ajout/utilisateurs", {
        method: "POST",
        body: JSON.stringify({ email: emailUtilisateur, nom: DefautUsername }),
      });
      let reponseJson = await reponse.json();
    }
  }

  async function fetchUtilisateurs() {
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
        // console.log("dataJSON:", data[0]);
        setUtilisateur(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function supprimerUtilisateur() {
    await Auth.deleteUser()
      .then(() => {
        setId("");
        setUtilisateur("");
        setBouteilles("");
        setCelliers("");
        setEmailUtilisateur("");
        setUsername("");
        DATA = undefined;
      })
      .catch((err) =>
        console.log("Erreur lors de la suppression de viotre profil", err)
      );
    let reponse = await fetch(
      URI + "/" + "email" + "/" + emailUtilisateur + "/" + "utilisateurs",
      { method: "DELETE" }
    );
    let reponseJson = await reponse.json();
  }

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  async function gererSignOut() {
    await Auth.signOut()
      .then(() => {
        setResetBottomNav(false);
        setId("");
        setUtilisateur("");
        setBouteilles("");
        setCelliers("");
        setEmailUtilisateur("");
        setUsername("");
        setIndexNav(0);
        DATA = undefined;
        // refreshPage()
        // window.location.pathname="/"
      })
      .catch((err) => console.log("Erreur lors de la déconnexion", err));
  }

  // ---------------------------------- Gestion des celliers -----------------------------
  // console.log("user_id:", emailUtilisateur);
  async function fetchCelliers() {
    await fetch(URI + "/" + "user_id" + "/" + id + "/" + "celliers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCelliers(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  // --------------------------------- Gestion des bouteilles ------------------------------------

  async function fetchVins(cellier) {
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

  // ---------------------------------- Rendering -----------------------------------------
  return (
    <div className={Auth.user ? "Appli" : "Login"}>
      {Auth.user && (
        <NavDesktop
          user={Auth.user}
          gererSignOut={gererSignOut}
          utilisateur={utilisateur}
          username={username}
        />
      )}
      <div className="Appli--container ">
        <img
          className={Auth.user ? "Hidden" : "logo"}
          src={Logo}
          alt="logo-mon-vino"
        ></img>
        <Authenticator className="Authenticator" formFields={formFields}>
          {({ signOut, user }) => (
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
                  path={`/profil/${emailUtilisateur}`}
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
                  path={`/admin/${emailUtilisateur}`}
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
                    />
                  }
                />
                <Route
                  path={`/cellier/${cellier}/vins`}
                  element={
                    <ListeBouteilles
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      fetchVins={fetchVins}
                      gererBouteilles={gererBouteilles}
                      cellier={cellier}
                      URI={URI}
                      error={error}
                      setError={setError}
                      fetchUtilisateur={fetchUtilisateur}
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
              </Routes>
            </div>
          )}
        </Authenticator>
        <p className={Auth.user ? "Hidden" : "Auth-sub-title"}>
          Commencez dès maintenant votre collection de vin !
        </p>
        <NavMobile
          Auth={Auth}
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
export default Appli;
