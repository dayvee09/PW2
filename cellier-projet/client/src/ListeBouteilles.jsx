import React, { useState, useEffect } from "react";
import "./ListeBouteilles.scss";
import Axios from "axios";
import MuiButton from "@mui/material/Button";
import Bouteille from "./Bouteille";
import { useNavigate, NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

import Grid from "@material-ui/core/Grid";

function ListeBouteilles(props) {
  let history = useNavigate();
  let location = window.location.pathname;

  useEffect(() => {
    props.fetchVins();
  }, []);
  if (props.bouteilles) {
    if (props.bouteilles.length > 1) {
      return (
        <div className="ListeBouteilles">
          <div className="navigation">
            <div className="menu-celliers">
              <div>
                <NavLink to={`/`}>
                  <button className="retour">
                    <img src={rowIcone} alt="icone-row-left" width={5}></img>
                    Retour aux Celliers
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="ListeBouteille--grid">
            {props.bouteilles.map((bouteille) => (
              <Bouteille
                {...bouteille}
                fetchVins={props.fetchVins}
                gererBouteille={props.gererBouteille}
                gererBouteilles={props.gererBouteilles}
                bouteilles={props.bouteilles}
                setBouteilles={props.setBouteilles}
                cellier={props.cellier}
                bouteille={bouteille}
                URI={props.URI}
              />
            ))}
          </div>
        </div>
      );
    } else if (props.bouteilles.length > 0) {
      return (
        <div className="ListeBouteilles">
          <div>
            <NavLink to={`/`}>
              <button className="retour">
                <img src={rowIcone} alt="icone-row-left" width={15}></img>Retour
                aux Celliers
              </button>
            </NavLink>
          </div>
          <div className="Bouteille">
            <Bouteille
              {...props.bouteilles[0]}
              fetchVins={props.fetchVins}
              fetchVin={props.fetchVin}
              celliers={props.celliers}
              cellier={props.cellier}
              setCellier={props.setCellier}
              emailUtilisateur={props.emailUtilisateur}
              gererCellier={props.gererCellier}
              gererBouteilles={props.gererBouteilles}
              bouteille={props.bouteilles[0]}
              setBouteilles={props.setBouteilles}
              URI={props.URI}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="ListeBouteilles--default">
          <div>
            <NavLink to={`/`}>
              <button className="retour">
                <img src={rowIcone} alt="icone-row-left" width={15}></img>Retour
                aux Celliers
              </button>
            </NavLink>
          </div>
          <h1 className="aucune-bouteille">
            Pas de bouteilles dans ce cellier
          </h1>
          <NavLink to="/vins">
            <p>+ Ajouter une bouteille</p>
          </NavLink>
        </div>
      );
    }
  }
}

export default ListeBouteilles;
