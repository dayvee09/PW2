import React, { useState, useEffect } from "react";
import "./ListeBouteilles.scss";
import Axios from "axios";
import Bouteille from "./Bouteille";
import { useNavigate, NavLink } from "react-router-dom";

function ListeBouteilles(props) {
  let history = useNavigate();
  const [bouteilles, setBouteilles] = useState(props.bouteilles);

  useEffect(() => {
    props.fetchVins();
  }, []);
  if (props.bouteilles) {
    if (props.bouteilles.length > 1) {
      return (
        <div className="ListeBouteilles">
          {bouteilles.map((bouteille) => (
            <div key={bouteille.id} className="Bouteille">
              <Bouteille
                {...bouteille}
                gererBouteille={props.gererBouteille}
                gererBouteilles={props.gererBouteilles}
                bouteilles={props.bouteilles}
                setBouteilles={props.setBouteilles}
                cellier={props.cellier}
                bouteille={bouteille}
                URI={props.URI}
              />
            </div>
          ))}
        </div>
      );
    } else if (props.bouteilles.length > 0) {
      return (
        <div className="ListeBouteilles">
          <div className="Bouteille">
            <Bouteille
              key={props.bouteille.id}
              {...props.bouteille}
              fetchVins={props.fetchVins}
              fetchVin={props.fetchVin}
              celliers={props.celliers}
              cellier={props.cellier}
              setCellier={props.setCellier}
              emailUtilisateur={props.emailUtilisateur}
              gererCellier={props.gererCellier}
              gererBouteilles={props.gererBouteilles}
              bouteilles={props.bouteilles}
              setBouteilles={props.setBouteilles}
              URI={props.URI}
            />
          </div>
        </div>
      );
    } else {
      return (
        <h1 className="aucune-bouteille">Pas de bouteilles dans ce cellier</h1>
      );
    }
  }
}

export default ListeBouteilles;
