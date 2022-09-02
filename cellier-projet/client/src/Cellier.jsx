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
  const [cellier, setCellier] = useState([props.id]);
  const [selection, setSelection] = useState("fond-normal");

  useEffect(() => {
    props.gererCellier(cellier);
  }, [cellier]);

  const handleChange = () => {
    setCellier(props.id);
    if (selection === "fond-normal") {
      setSelection("fond-selection");
    } else {
      setSelection("fond-normal");
    }
  };

  return (
    <>
      <div
        onClick={handleChange}
        className={
          selection == "fond-selection"
            ? "cellier fond-selection"
            : "cellier fond-normal"
        }
        data-quantite=""
      >
        <div className="description">
          <div className="description-originale">
            {selection == "fond-selection" ? (
              <div className="btn-cellier">
                <NavLink to={`/cellier/${cellier}/vins`}>
                  <button>Voir mes bouteilles</button>
                </NavLink>
                <div>
                  <button>Modifier mon cellier</button>
                </div>
              </div>
            ) : (
              <div>
                <p className="id">ID : {props.id}</p>
                <p className="nom">Nom : {props.nom}</p>
                <p className="vino__utilisateur_id">
                  Id Utilisateur : {props.vino__utilisateur_id}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
