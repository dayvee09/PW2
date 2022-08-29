import "./Bouteille.scss";
import { useState } from "react";
export default function Bouteille(props) {
  /**
   * Gère la suppresssion d'une bouteille
   */
  function gererSupprimer() {}

  /**
   * Gère la modification d'une bouteille
   */
  function gererModifier() {}
  console.log(props[0]);
  return (
    <>
      <div className="bouteille" data-quantite="">
        <div className="img">
          <img src={props[0].image} alt="bouteille" />
        </div>
        <div className="description">
          <div className="description-originale">
            <p className="nom">Nom : {props[0].nom} </p>
            <p className="quantite">Quantité : {props[0].quantite}</p>
            <p className="pays">Pays : {props[0].pays}</p>
            <p className="type">Type : {props[0].vino__type_id}</p>
            <p className="millesime">Millesime : {props[0].millesime}</p>
            <p>
              <a href={props[0].url_saq}>Voir SAQ</a>
            </p>
          </div>
          <div className="description-ajout">
            <p className="date_achat">Date achat : {props[0].date_achat}</p>
            <p className="description">Description : {props[0].description}</p>
          </div>
        </div>
        <div className="options" data-id="{id_bouteille_cellier}">
          <button>Modifier</button>
          <button className="btnAjouter">Ajouter</button>
          <button className="btnBoire">Boire</button>
        </div>
      </div>
    </>
  );
}
