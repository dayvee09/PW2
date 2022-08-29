import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useParams,
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

const Appli = () => {
  const [error, setError] = useState([]);
  const [bouteilles, setBouteilles] = useState([]);
  const [emailUtilisateur, setEmailUtilisateur] = useState([]);
  const [id, setId] = useState([]);
  const [cellier, setCellier] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [celliers, setCelliers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  email().then((email) => {
    const emailUtilisateur = email;
    setEmailUtilisateur(emailUtilisateur);
  });

  console.log(celliers);
  console.log(emailUtilisateur);
  console.log(id);
  console.log(cellier);
  console.log(bouteilles);
  console.log(utilisateurs);

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
        setUtilisateurs(data[0]);
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

  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h1>Hello {user.attributes.email}</h1>
            <Utilisateur
              utilisateurs={utilisateurs}
              setUtilisateurs={setUtilisateurs}
              id={id}
              setId={setId}
              emailUtilisateur={emailUtilisateur}
              fetchUtilisateur={fetchUtilisateur}
            />
            <button onClick={signOut}>Sign Out</button>
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
              <Routes>
                <Route
                  path={`/cellier/${cellier}/vins`}
                  exact
                  element={
                    <ListeBouteilles
                      bouteilles={bouteilles}
                      setBouteilles={setBouteilles}
                      fetchVins={fetchVins}
                    />
                  }
                />
                <Route
                  path={`/user_id/${id}/celliers`}
                  exact
                  element={
                    <ListeCelliers
                      cellier={cellier}
                      setCellier={setCellier}
                      celliers={celliers}
                      setCelliers={setCelliers}
                      fetchCelliers={fetchCelliers}
                      fetchVins={fetchVins}
                      id={id}
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
