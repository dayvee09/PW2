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
  // useEffect(() => {
  //   if (props.id == "1") {
  //     props.setCellier("1");
  //     console.log(props.id);
  //   }
  // }, [test]);
  function test(id) {
    props.setCellier(id);
    console.log(id);
  }

  return (
    <>
      <div className="cellier" data-quantite="">
        <div className="description">
          <div className="description-originale">
            <NavLink
              onClick={test(props.id)}
              exact
              to={`/cellier/${props.id}/vins`}
            >
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
