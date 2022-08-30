import "./Cellier.scss";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { generateRandomString } from "@aws-amplify/core";

export default function Cellier(props) {
  const [cellier, setCellier] = useState([]);

  useEffect(() => {
    gererTest();
  }, [cellier]);

  const handleChange = () => {
    setCellier(props.id);
  };

  function gererTest() {
    props.gererCellier(cellier);
  }

  console.log(props);
  return (
    <>
      <div className="cellier" data-quantite="">
        <div className="description">
          <div className="description-originale">
            <NavLink
              onClick={handleChange}
              exact
              to={`/cellier/${props.id}/vins`}
            >
              <p className="id">ID : {props.id}</p>
            </NavLink>
            <p className="nom">Nom : {props.nom}</p>
            <p className="vino__utilisateur_id">
              Id Utilisateur : {props.vino__utilisateur_id}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
