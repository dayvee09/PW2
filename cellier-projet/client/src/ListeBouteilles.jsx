import React, { useState, useEffect } from "react";
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
      console.log("plus qu'une bouteille");
      return (
        <div className="ListeBouteilles">
          {bouteilles.map((bouteille) => (
            <div className="Bouteille">
              <Bouteille
                key={bouteille.id}
                {...bouteille}
                gererBouteille={props.gererBouteille}
                bouteilles={props.bouteilles}
                setBouteilles={props.setBouteilles}
                cellier={props.cellier}
                bouteille={props.bouteille}
              />
            </div>
          ))}
        </div>
      );
    } else {
      console.log("1 seule bouteille");
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
              gererBouteille={props.gererBouteille}
              bouteilles={props.bouteilles}
              setBouteilles={props.setBouteilles}
              bouteille={props.bouteille}
              setBouteille={props.setBouteille}
            />
          </div>
        </div>
      );
    }
  }
}

export default ListeBouteilles;
