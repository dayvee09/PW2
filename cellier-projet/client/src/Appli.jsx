// Début des modifications

import React from "react";
import {
  Route,
  Routes,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Axios from "axios";
import "./Appli.scss";
import ListeBouteilles from "./ListeBouteilles";
import Admin from "./Admin";
import ListeCelliers from "./ListeCelliers";
import Utilisateur, { user } from "./Utilisateur.jsx";
import Profil from "./Profil.jsx";
import { Auth } from "aws-amplify";
import { email } from "./utilisateur.js";
import Bouteille from "./Bouteille";
import { I18n, userHasAuthenticated } from "aws-amplify";
import Logo from "./img/png/logo-jaune.png";
import NavMobile from "./NavMobile";

let DATA;

const Appli = () => {
  const [error, setError] = useState([]);
  const [bouteilles, setBouteilles] = useState([]);
  const [emailUtilisateur, setEmailUtilisateur] = useState([]);
  const [id, setId] = useState([]);
  const [cellier, setCellier] = useState([]);
  const [username, setUsername] = useState([]);
  const [utilisateur, setUtilisateur] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [celliers, setCelliers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLogged, setIsLogged] = useState(false);
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

  // ------------------------------- Traduction du formulaire d'authentification ----------------------------

  I18n.setLanguage("fr");
  const dict = {
    fr: {
      "Sign In": "Connexion",
      "Sign in": "Se connecter",
      "Create Account": "Inscription",
      "Forgot your password?": "Mot de passe oublié ?",
      "Reset your password": "Réinitialiser votre mot de passe",
      "Send code": "Envoyer le code",
      "Resend Code": "Renvoyer le code",
      Submit: "Envoyer",
      Submitting: "Envoi en cours...",
      Sending: "Envoi en cours...",
      Confirming: "Confirmation en cours...",
      "Back to Sign In": "Retour à la connexion",
      "Signing in": "Veuillez patientez",
      "User does not exist.": "Adresse courriel ou mot de passe incorrecte",
      "Incorrect username or password.":
        "Adresse courriel ou mot de passe incorrecte",
      "Username/client id combination not found.": "Adresse courriel invalide",
      "Attempt limit exceeded, please try after some time.":
        "Trop de tentatives, veuillez réessayer plus tard",
      "Cannot reset password for the user as there is no registered/verified email or phone_number":
        "Adresse courriel invalide",
      "Password must have at least 8 characters":
        "Le mot de passe doit contenir au moins 8 caractère",
      "Your passwords must match": "Vos mots de passe doivent être identiques",
      "An account with the given email already exists.":
        "Adresse courriel invalide",
      "Invalid verification code provided, please try again.":
        "Code invalide, veuillez réessayer",
      "Username cannot be empty": "Veuillez entrer votre adresse courriel",
      "Custom auth lambda trigger is not configured for the user pool.":
        "Adresse courriel ou mot de passe incorrecte",
      "Password cannot be empty": "Veuillez entrer votre mot de passe",
      "Creating Account": "Création du compte",
      Confirm: "Confirmer",
      "We Emailed You": "Courriel envoyé",
      "Your code is on the way. To log in, enter the code we emailed to":
        "Votre code a été envoyé à votre adresse ",
      "It may take a minute to arrive.":
        "Cela pourrait prendre quelque minutes",
      "User does not exist.": "Adresse courriel ou mot de passe incorrecte",
      "Incorrect username or password.":
        "Adresse courriel ou mot de passe incorrecte",
      "Username/client id combination not found.": "Adresse courriel invalide",
      "Attempt limit exceeded, please try after some time.":
        "Trop de tentatives, veuillez réessayer plus tard",
      "Cannot reset password for the user as there is no registered/verified email or phone_number":
        "Adresse courriel invalide",
      "Password must have at least 8 characters":
        "Le mot de passe doit contenir au moins 8 caractère",
      "Your passwords must match": "Vos mots de passe doivent être identiques",
      "An account with the given email already exists.":
        "Adresse courriel invalide",
      "Invalid verification code provided, please try again.":
        "Code invalide, veuillez réessayer",
      "Username cannot be empty": "Veuillez entrer votre adresse courriel",
      "Custom auth lambda trigger is not configured for the user pool.":
        "Adresse courriel ou mot de passe incorrecte",
      "Password cannot be empty": "Veuillez entrer votre mot de passe",
      "Creating Account": "Création du compte",
      Confirm: "Confirmer",
      "We Emailed You": "Courriel envoyé",
      "Your code is on the way. To log in, enter the code we emailed to":
        "Votre code a été envoyé à votre adresse ",
      "It may take a minute to arrive.":
        "Cela pourrait prendre quelque minutes",
      "We Sent A Code": "Code Envoyé",
      "Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.":
        "Votre code a été envoyé à votre adresse. Cela pourrait prendre quelque minutes",
    },
  };

  const formFields = {
    signIn: {
      username: {
        labelHidden: true,
        placeholder: I18n.get("Adresse courriel"),
      },
      password: {
        labelHidden: true,
        placeholder: I18n.get("Mot de passe"),
      },
    },

    signUp: {
      email: {
        labelHidden: true,
        placeholder: I18n.get("Adresse courriel"),
      },
      password: {
        labelHidden: true,
        placeholder: I18n.get("Mot de passe"),
      },
      confirm_password: {
        labelHidden: true,
        placeholder: I18n.get("Confirmation mot de passe"),
      },
    },
    resetPassword: {
      username: {
        labelHidden: true,
        placeholder: I18n.get("Adresse courriel"),
      },
    },
    confirmResetPassword: {
      password: {
        labelHidden: true,
        placeholder: I18n.get("Mot de passe"),
      },
      confirm_password: {
        labelHidden: true,
        placeholder: I18n.get("Confirmation mot de passe"),
      },
    },
  };

  I18n.putVocabularies(dict);

  // ------------------------------- fonctions de gestion des états ----------------------------

  email().then((email) => {
    const emailUtilisateur = email;
    console.log(emailUtilisateur);
    setEmailUtilisateur(emailUtilisateur);
    console.log(DATA);
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
    fetchVins();
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
    utilisateurs.forEach((utilisateur) => {
      if (utilisateur["email"] === emailUtilisateur && bool === false) {
        bool = true;
      }
    });
    if (!bool) {
      let reponse = await fetch(URI + "/admin/ajout/utilisateurs", {
        method: "POST",
        body: JSON.stringify({ email: emailUtilisateur }),
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

  async function gererSignOut() {
    await Auth.signOut()
      .then(() => {
        setId("");
        setUtilisateur("");
        setBouteilles("");
        setCelliers("");
        setEmailUtilisateur("");
        DATA = undefined;
      })
      .catch((err) => console.log("Erreur lors de la déconnexion", err));
  }

  // ---------------------------------- Gestion des celliers -----------------------------

  async function fetchCelliers() {
    console.log("fetchCelliers: ", id);
    await fetch(URI + "/" + "user_id" + "/" + id + "/" + "celliers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCelliers(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  // --------------------------------- Gestion des bouteilles ------------------------------------

  async function fetchVins() {
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
  // ------------------Gestion de l'importation de bouteilles de la SAQ-----------------------

  // ---------------------------------- Rendering -----------------------------------------
  return (
    <div className={Auth.user ? "Appli" : "Login"}>
      <img
        className={Auth.user ? "Hidden" : "logo"}
        src={Logo}
        alt="logo-mon-vino"
      ></img>
      <Authenticator className="Authenticator" formFields={formFields}>
        {({ signOut, user }) => (
          <div>
            <h1>Hello {user.attributes.email}</h1>
            <Utilisateur
              utilisateur={utilisateur}
              setUtilisateur={setUtilisateur}
              utilisateurs={utilisateurs}
              setUtilisateurs={setUtilisateurs}
              id={id}
              setId={setId}
              emailUtilisateur={emailUtilisateur}
              fetchUtilisateurs={fetchUtilisateurs}
              fetchUtilisateur={fetchUtilisateur}
              createUser={createUser}
            />

            {/*-------------------------------- Menu de navigation --------------------------*/}

            <div className="navigation">
              <div className="menu-celliers">
                {location !== "/" && (
                  <div>
                    <NavLink to={`/`}>
                      <button>Retour aux Celliers</button>
                    </NavLink>
                  </div>
                )}
              </div>
              <div className="menu-compte">
                <NavLink to="/">
                  <div>
                    <button onClick={gererSignOut}>Sign Out</button>
                  </div>
                </NavLink>
                {location === "/" && (
                  <div>
                    {utilisateur && utilisateur.privilege === "admin" && (
                      <NavLink to={`/admin/${emailUtilisateur}`}>
                        <button>Admin</button>
                      </NavLink>
                    )}
                  </div>
                )}
              </div>
            </div>

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
                    setUtilisateur={setUtilisateur}
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
                  />
                }
              />
              <Route
                path={`/`}
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
                    gererCellier={gererCellier}
                    URI={URI}
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
      <small className="">© Mon Vino 2022, Tous droits réservés</small>
      <NavMobile Auth={Auth} emailUtilisateur={emailUtilisateur} />
    </div>
  );
};
export default Appli;
