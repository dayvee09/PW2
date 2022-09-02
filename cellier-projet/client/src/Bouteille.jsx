import "./Bouteille.scss";
import FrmBouteille from "./FrmBouteille";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Bouteille(props) {
  /**
   *  État de la quantité
   */
  const [voirFiche, setVoirFiche] = useState(false);
  const [quantite, setQuantite] = useState(props.quantite);
  /**
   *  État du formulaire de modification
   */

  const [frmOuvert, setFrmOuvert] = useState(false);

  useEffect(() => {
    fetchPutVinUn(quantite);
  }, [quantite]);

  useEffect(() => {
    fetchVinUn();
  }, [voirFiche]);

  /**
   * Gère la suppresssion d'une bouteille
   */
  function gererSupprimer() {}

  /**
   * Gère la modification d'une bouteille
   */
  function gererModifier() {
    setFrmOuvert(true);
  }

  /**
   * Gère la modification d'une bouteille
   */
  function gererVoir() {
    setVoirFiche(true);
    setFrmOuvert(true);
  }

  /**
   *  Modifier la bouteille //  gererActionBouteille(bouteille_id, cellier_id, quantite);
   */
  function modifierBouteille(NouveauQuantite) {
    let objetDonnees = {
      quantite: NouveauQuantite,
    };
    var reg = /^[1-9]+[0-9]*]*$/;
    if (reg.test(NouveauQuantite)) {
      setQuantite(NouveauQuantite);
    }
  }

  async function fetchPutVinUn(objetDonnees) {
    //route: ocalhost/PW2/cellier-projet/api-php/user_id/3/celliers/6/vins/7
    let reponse = await fetch(
      props.URI +
        "/" +
        "cellier" +
        "/" +
        props.vino__cellier_id +
        "/" +
        "vins" +
        "/" +
        "bouteille" +
        "/" +
        props.id,
      {
        method: "PATCH",
        body: JSON.stringify({ quantite: objetDonnees }),
      }
    );
    let reponseJson = await reponse.json();
  }
  async function fetchVinUn() {
    //route: ocalhost/PW2/cellier-projet/api-php/user_id/3/celliers/6/vins/7
    let reponse = await fetch(
      props.URI +
        "/" +
        "cellier" +
        "/" +
        props.vino__cellier_id +
        "/" +
        "vins" +
        "/" +
        "bouteille" +
        "/" +
        props.id
    );
    let reponseJson = await reponse.json();
  }
  return (
    <>
      <div className="bouteille" data-quantite="">
        <div className="img">
          <img src={props.image} alt="bouteille" />
        </div>

        <div className="description">
          <div className="description-originale">
            <p className="nom">{props.nom} </p>
            <p className="nom">Quantité: {quantite} </p>
          </div>
        </div>
        <div className="options" data-id="{id_bouteille_cellier}">
          <button onClick={gererModifier}>Modifier</button>
          <button onClick={gererVoir}>Fiche</button>
          <button className="btnAjouter">Ajouter</button>
          <button className="btnBoire">Boire</button>
        </div>

        <FrmBouteille
          frmOuvert={frmOuvert}
          setFrmOuvert={setFrmOuvert}
          bouteille_id={props.id}
          cellier_id={props.vino__cellier_id}
          bouteille_nom={props.nom}
          bouteille_image={props.image}
          bouteille_quantite_p={props.quantite}
          bouteille_pays={props.pays}
          bouteille_vino__type_id={props.vino__type_id}
          bouteille_millesime={props.millesime}
          bouteille_date_achat={props.date_achat}
          bouteille_description={props.description}
          bouteille_url_saq={props.url_saq}
          quantite={quantite}
          setQuantite={setQuantite}
          modifierBouteille={modifierBouteille}
          voirFiche={voirFiche}
          setVoirFiche={setVoirFiche}
        />
      </div>
    </>
  );
}
