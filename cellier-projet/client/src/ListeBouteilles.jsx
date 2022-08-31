import React, { useState, useEffect } from "react";
import Axios from "axios";
import Bouteille from "./Bouteille";
import { useNavigate, NavLink } from "react-router-dom";

function ListeBouteilles(props) {
  let history = useNavigate();

  useEffect(() => {
    props.fetchVins();
  }, []);
  if (props.bouteilles.length > 1) {
    return (
      <div className="ListeBouteilles">
        {props.bouteilles.map((bouteille) => (
          <div className="Bouteille">
            <Bouteille
              key={bouteille.id}
              {...bouteille}
              fetchVins={props.fetchVins}
              fetchVin={props.fetchVin}
              celliers={props.celliers}
              cellier={props.cellier}
              setCellier={props.setCellier}
              emailUtilisateur={props.emailUtilisateur}
              gererCellier={props.gererCellier}
              gererBouteille={props.gererBouteille}
              bouteilles={props.bouteilles}
              setBouteilles={props.setBouteilles}
              bouteille={props.bouteille}
              setBouteille={props.setBouteille}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ListeBouteilles;
