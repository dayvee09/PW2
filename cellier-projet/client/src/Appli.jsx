import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Axios from "axios";
import "./Appli.scss";
import ListeBouteilles from "./ListeBouteilles";
import ListeCelliers from "./ListeCelliers";
import Utilisateur from "./Utilisateur.jsx";
import { Auth } from "aws-amplify";
import { email } from "./utilisateur.js";
import Bouteille from "./Bouteille";
import { I18n } from "aws-amplify";
import Logo from "./img/logo-rouge.png";

const Appli = () => {
  const [error, setError] = useState([]);
  const [bouteilles, setBouteilles] = useState([]);
  const [emailUtilisateur, setEmailUtilisateur] = useState([]);
  const [id, setId] = useState([]);
  const [cellier, setCellier] = useState([]);
  const [utilisateur, setUtilisateur] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [celliers, setCelliers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const ENV = "prod";
  const [URI, setURI] = useState(
    "https://e2195277.webdev.cmaisonneuve.qc.ca/PW2/cellier-projet/api-php"
  );

  useEffect(() => {
    if (ENV == "prod") {
      console.log(URI);
      setURI(
        "https://e2195277.webdev.cmaisonneuve.qc.ca/PW2/cellier-projet/api-php"
      );
    } else {
      console.log(URI);
      setURI("http://localhost/PW2/cellier-projet/api-php");
    }
  }, []);

  I18n.setLanguage("fr");
  const dict = {
    fr: {
      "Sign In": "Connexion",
      "Sign in": "Se connecter",
      "Create Account": "S'inscrire",
      "Forgot your password?": "Mot de passe oublié ?",
      "Reset your password": "Réinitialiser votre mot de passe",
      "Send code": "Envoyer le code",
      "Back to Sign In": "Retour à la connexion",
      "Signing in": "Veuillez patientez",
    },
  };

  I18n.putVocabularies(dict);

  // ------------------------------- fonctions de gestion des états ----------------------------

  email().then((email) => {
    const emailUtilisateur = email;
    setEmailUtilisateur(emailUtilisateur);
  });

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
  async function createUser() {
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    let bool = false;
    // var u = utilisateurs.find(function (curr) {
    //   return curr.email === user.attributes.email
    // })
    utilisateurs.forEach((utilisateur) => {
      if (utilisateur["email"] === user.attributes.email && bool === false) {
        bool = true;
      }
    });
    if (!bool) {
      let reponse = await fetch(URI + "/admin/ajout/utilisateurs", {
        method: "POST",
        body: JSON.stringify({ email: user.attributes.email }),
      });
      let reponseJson = await reponse.json();
      fetchUtilisateur();
    }
  }

  async function fetchUtilisateurs() {
    console.log(URI);
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
        setId(data[0].id);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function deleteUser() {
    try {
      const result = await Auth.deleteUser();
    } catch (error) {}
    let reponse = await fetch(
      URI + "/" + "email" + "/" + emailUtilisateur + "/" + "utilisateurs",
      { method: "DELETE" }
    );
    let reponseJson = await reponse.json();
  }

  function handleDelete() {
    deleteUser();
  }

  // ---------------------------------- Gestion des celliers -----------------------------

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

  // ---------------------------------- Rendering -----------------------------------------
  console.log(id);
  return (
    <div className="Appli">
      <img
        className="logo"
        src="https://cdn-icons-png.flaticon.com/512/763/763072.png"
        alt="logo-mon-vino"
      ></img>
      <Authenticator className="Authenticator">
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

            <Router>
              <div className="navigation">
                <div className="menu-celliers">
                  <div>
                    <NavLink exact to={`/user_id/${id}/celliers`}>
                      <button>Voir mes Celliers</button>
                    </NavLink>
                  </div>
                </div>
                <div className="menu-compte">
                  <NavLink exact to="/">
                    <div>
                      <button onClick={signOut}>Sign Out</button>
                    </div>
                  </NavLink>
                  <div>
                    <button onClick={handleDelete}>
                      Supprimer votre compte
                    </button>
                  </div>
                </div>
              </div>

              {/* ------------------------------ Routes --------------------------------*/}

              <Routes>
                <Route
                  path={`/cellier/${cellier}/vins`}
                  exact
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
                  path={`/user_id/${id}/celliers`}
                  exact
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
                {/* <Route
                  path="/"
                  exact
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
                /> */}
              </Routes>
            </Router>
          </div>
        )}
      </Authenticator>
      <p className="text">Commencez dès maintenant votre collection de vin !</p>
      <small className="">© Mon Vino 2022, Tous droits réservés</small>
    </div>
  );
};
export default Appli;
