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
  useEffect(() => {
    props.setCellier(props.id);
  }, [test]);
  function test() {}
  console.log(props.cellier);
  return (
    <>
      <div className="cellier" data-quantite="">
        <div className="description">
          <div className="description-originale">
            <NavLink onClick={test} exact to={`/cellier/${props.id}/vins`}>
              <p className="id">ID : {props.id} </p>
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
