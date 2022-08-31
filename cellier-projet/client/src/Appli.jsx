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

const Appli = () => {
  const [error, setError] = useState([]);
  const [bouteilles, setBouteilles] = useState([]);
  const [emailUtilisateur, setEmailUtilisateur] = useState([]);
  const [id, setId] = useState([]);
  const [cellier, setCellier] = useState([]);
  const [bouteille, setBouteille] = useState([]);
  const [utilisateur, setUtilisateur] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [celliers, setCelliers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  email().then((email) => {
    const emailUtilisateur = email;
    setEmailUtilisateur(emailUtilisateur);
  });

  useEffect(() => {
    fetchVins();
  }, [cellier]);

  function gererBouteille(idBouteille) {
    setBouteille(idBouteille);
  }
  function gererCellier(idCellier) {
    setCellier(idCellier);
  }

  async function createUser() {
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    let bool = false;
    utilisateurs.forEach((utilisateur) => {
      if (utilisateur["email"] === user.attributes.email && bool === false) {
        bool = true;
      }
    });
    if (!bool) {
      let reponse = await fetch(
        "http://localhost/PW2/cellier-projet/api-php/admin/ajout/utilisateurs",
        {
          method: "POST",
          body: JSON.stringify({ email: user.attributes.email }),
        }
      );
      let reponseJson = await reponse.json();
      fetchUtilisateur();
    }
  }

  async function fetchVins() {
    await fetch(
      "http://localhost/PW2/cellier-projet/api-php/" +
        "cellier" +
        "/" +
        cellier +
        "/" +
        "vins"
    )
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

  async function fetchVin() {
    await fetch(
      "http://localhost/PW2/cellier-projet/api-php/" +
        "cellier" +
        "/" +
        cellier +
        "/" +
        "vins" +
        "/" +
        "bouteille" +
        "/" +
        bouteille
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setBouteille(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function fetchUtilisateurs() {
    await fetch(
      "http://localhost/PW2/cellier-projet/api-php/admin" +
        "/" +
        emailUtilisateur +
        "/" +
        "utilisateurs"
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
      "http://localhost/PW2/cellier-projet/api-php/" +
        "email" +
        "/" +
        emailUtilisateur +
        "/" +
        "utilisateurs"
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

  async function fetchCelliers() {
    await fetch(
      "http://localhost/PW2/cellier-projet/api-php/" +
        "user_id" +
        "/" +
        id +
        "/" +
        "celliers"
    )
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

  async function deleteUser() {
    try {
      const result = await Auth.deleteUser();
      console.log(result);
    } catch (error) {
      console.log('Error deleting user', error);
    }
    let reponse = await fetch(
      "http://localhost/PW2/cellier-projet/api-php/" +
      "email" +
      "/" +
      emailUtilisateur +
      "/" +
      "utilisateurs",
      { method: 'DELETE' }
    );
    let reponseJson = await reponse.json();
  }

  function handleDelete(){
    deleteUser()
  }

  return (
    <div>
      <Authenticator>
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
            <button onClick={signOut}>Sign Out</button>
            <button onClick={handleDelete}>Supprimer votre compte</button>
            <Router>
              <div>
                <NavLink exact to={`/user_id/${id}/celliers`}>
                  <button>Voir mes Celliers</button>
                </NavLink>
              </div>
              <div>
                <NavLink exact to={`/cellier/${cellier}/vins`}>
                  <button>Voir mes bouteilles</button>
                </NavLink>
              </div>
              <div>
                <NavLink
                  exact
                  to={`/cellier/${cellier}/vins/bouteille/${bouteille}`}
                >
                  <button>Voir la bouteille</button>
                </NavLink>
              </div>
              <Routes>
                <Route
                  path={`/cellier/${cellier}/vins`}
                  exact
                  element={
                    <ListeBouteilles
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      bouteille={bouteille}
                      setBouteille={setBouteille}
                      fetchVins={fetchVins}
                      fetchVin={fetchVin}
                      gererBouteille={gererBouteille}
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
                    />
                  }
                />
                <Route
                  path={`/cellier/${cellier}/vins/bouteille/${bouteille}`}
                  exact
                  element={
                    <Bouteille
                      celliers={celliers}
                      setCelliers={setCelliers}
                      cellier={cellier}
                      setCellier={setCellier}
                      fetchCelliers={fetchCelliers}
                      fetchVin={fetchVin}
                      id={id}
                      emailUtilisateur={emailUtilisateur}
                      gererCellier={gererCellier}
                      gererBouteille={gererBouteille}
                    />
                  }
                />
              </Routes>
            </Router>
          </div>
        )}
      </Authenticator>
    </div>
  );
};
export default Appli;
