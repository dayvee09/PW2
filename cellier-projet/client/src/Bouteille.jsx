import "./Bouteille.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function Bouteille(props) {
  const [bouteille, setBouteille] = useState(props.id);
  const [selection, setSelection] = useState("fond-normal");
  useEffect(() => {
    props.gererBouteille(bouteille);
  }, [bouteille]);

  const handleChange = (event) => {
    if (event.target.value === props.id) {
      console.log(bouteille);
      if (selection === "fond-normal") {
        setSelection("fond-selection");
      } else {
        setSelection("fond-normal");
      }
    }
  };
  console.log(bouteille);
  return (
    <>
      <div
        onClick={handleChange}
        value={props.id}
        className={
          selection == "fond-selection"
            ? "cellier fond-selection"
            : "cellier fond-normal"
        }
        data-quantite=""
      >
        <div className="bouteille" data-quantite="">
          <div className="img">
            <img src={props.image} alt="bouteille" />
          </div>
          <div className="description">
            <div className="description-originale">
              <p className="nom">Nom : {props.nom} </p>
              <p className="quantite">Quantité : {props.quantite}</p>
              <p className="pays">Pays : {props.pays}</p>
              <p className="type">Type : {props.vino__type_id}</p>
              <p className="millesime">Millesime : {props.millesime}</p>
              <p>
                <a href={props.url_saq}>Voir SAQ</a>
              </p>
            </div>
            <div className="description-ajout">
              <p className="date_achat">Date achat : {props.date_achat}</p>
              <p className="description">Description : {props.description}</p>
            </div>
          </div>
          <div className="options" data-id="{id_bouteille_cellier}">
            <button>Modifier</button>
            <button className="btnAjouter">Ajouter</button>
            <button className="btnBoire">Boire</button>
          </div>
        </div>
      </div>
    </>
  );
}
