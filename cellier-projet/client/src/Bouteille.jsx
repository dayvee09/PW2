import "./Bouteille.scss";
import FrmBouteille from "./FrmBouteille";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function Bouteille(props) {
  const [bouteille, setBouteille] = useState([]);
  const [bouteilles, setBouteilles] = useState([]);
  const [selection, setSelection] = useState("fond-normal");
  useEffect(() => {
    props.gererBouteille(bouteille);
  }, [bouteille]);

  useEffect(() => {
    props.gererBouteilles(bouteilles);
  }, [bouteilles]);

  const handleChange = (event) => {
    setBouteille(props.id);
    console.log(props.cellier);
    console.log(props.id);
    console.log(bouteilles.filter((test) => test.id === props.id));
    setBouteilles(bouteilles.filter((test) => test.id === props.id));
    if (selection === "fond-normal") {
      setSelection("fond-selection");
    } else {
      setSelection("fond-normal");
    }
  };

  console.log(props.bouteilles);

  /**
   *  État de la quantité
   */
  const [quantite, setQuantite] = useState(props.quantite);

  useEffect(() => {
    console.log("ok");
    fetchVinUn();
  }, [quantite]);

  /**
   *  État du formulaire de modification
   */

  const [frmOuvert, setFrmOuvert] = useState(false);
  /**
   * Gère la suppresssion d'une bouteille
   */
  function gererSupprimer() {}

  /**
   * Gère la modification d'une bouteille
   */
  function gererModifier() {
    setQuantite(props.quantite);
    setFrmOuvert(true);
  }

  /**
   *  Modifier la bouteille //  gererActionBouteille(bouteille_id, cellier_id, quantite);
   */
  function modifierBouteille(NouveauQuantite) {
    let objetDonnees = {
      quantite: NouveauQuantite,
      date_achat: props.date_achat,
      garde_jusqua: props.garde_jusqua,
      notes: props.notes,
    };
    var reg = /^[1-9]+[0-9]*]*$/;
    if (reg.test(NouveauQuantite)) {
      fetchPutVinUn(objetDonnees);
    }
  }

  async function fetchPutVinUn(objetDonnees) {
    //route: ocalhost/PW2/cellier-projet/api-php/user_id/3/celliers/6/vins/7
    let reponse = await fetch(
      "http://localhost/PW2/cellier-projet/api-php/" +
        "user_id" +
        "/" +
        props.user_id +
        "/" +
        "celliers" +
        "/" +
        props.vino__cellier_id +
        "/" +
        "vins" +
        "/" +
        props.id,
      {
        method: "PUT",
        body: JSON.stringify(objetDonnees),
      }
    );
    let reponseJson = await reponse.json();
  }
  async function fetchVinUn() {
    //route: ocalhost/PW2/cellier-projet/api-php/user_id/3/celliers/6/vins/7
    let reponse = await fetch(
      "http://localhost/PW2/cellier-projet/api-php/" +
        "user_id" +
        "/" +
        props.user_id +
        "/" +
        "celliers" +
        "/" +
        props.vino__cellier_id +
        "/" +
        "vins" +
        "/" +
        props.id
    );
    let reponseJson = await reponse.json();
  }

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
            <button onClick={gererModifier}>Modifier</button>
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
            quantite={quantite}
            setQuantite={setQuantite}
            modifierBouteille={modifierBouteille}
          />
        </div>
      </div>
    </>
  );
}
