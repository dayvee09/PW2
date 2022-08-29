import "./Cellier.scss";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

export default function Cellier(props) {
  /**
   * Gère la suppresssion d'une bouteille
   */
  function gererSupprimer() {}
  return (
    <>
      <div className="cellier" data-quantite="">
        <div className="description">
          <div className="description-originale">
            <NavLink exact to={`/cellier/${props[0].id}/vins`}>
              <p className="id">ID : {props[0].id} </p>
            </NavLink>
            <p className="nom">Nom : {props[0].nom}</p>
            <p className="vino__utilisateur_id">
              Id Utilisateur : {props[0].vino__utilisateur_id}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
