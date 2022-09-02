import * as React from "react";
import "./Bouteille.scss";
import FrmBouteille from "./FrmBouteille";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Bouteille(props) {
  /**
   *  API MUI https://mui.com/material-ui/react-snackbar/
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  /**
  *  État d'affichage de la fiche de bouteille
  */
  const [voirFiche, setVoirFiche] = useState(false);

  /**
   *  État de la quantité
   */

  const [quantite, setQuantite] = useState(props.quantite);
  /**
   *  État du formulaire de modification
   */

  const [frmOuvert, setFrmOuvert] = useState(false);

  useEffect(() => {
    fetchPutVinUn(quantite);
  }, []);

  /**
   * Gère la suppresssion de la quantité de bouteille
   */
  function gererSupprimer() { }

  /**
   * Gère la modification de la quantité de bouteille
   */
  function gererModifier() {
    setFrmOuvert(true);
  }

  /**
   * Gère l'affichage d'un formulaire de modification de la quantité 
   */
  function gererVoir() {
    setVoirFiche(true);
    setFrmOuvert(true);
  }

  /**
   * Gère l'ajout de la quantité de bouteille
   */
  function gererAjouter() {
    setQuantite(parseInt(quantite) + 1);
  }

  /**
   * Gère la suppression de la quantité de bouteille
   */
  function gererBoire() {
    if (quantite > 0)
      setQuantite(parseInt(quantite) - 1);
    else

      setOpenAlert(true);
  }
  /**
   *  Modifier la bouteille //  gererActionBouteille(bouteille_id, cellier_id, quantite);
   */
  function modifierBouteille(NouveauQuantite) {
    var reg = /^[1-9]+[0-9]*]*$/;
    if (reg.test(NouveauQuantite)) {
      setQuantite(NouveauQuantite);
    }
  }

  async function fetchPutVinUn(NouveauQuantite) {
    //route: localhost/PW2/cellier-projet/api-php/cellier/3/vins/6/bouteille/7
    let reponse = await fetch(
      "http://localhost/PW2/cellier-projet/api-php" +
      // props.URI +
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
        body: JSON.stringify({ quantite: NouveauQuantite }),
      }
    );
    // let reponseJson = await reponse.json();
  }
  async function fetchVinUn() {
    //route: localhost/PW2/cellier-projet/api-php/cellier/3/vins/6/bouteille/7
    let reponse = await fetch(
      // props.URI +
      "http://localhost/PW2/cellier-projet/api-php" +
      "/" +
      "cellier" +
      "/" +
      props.vino__cellier_id +
      "/" +
      "vins" +
      "/" +
      "bouteille" +
      props.id
    );
    let reponseJson = await reponse.json();
    console.log(reponseJson)
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
          <button onClick={gererAjouter} className="btnAjouter">Ajouter</button>
          <button onClick={gererBoire} className="btnBoire">Boire</button>
        </div>
        <Snackbar sx={{ height: '100%' }} anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }} open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
            En rupture de stock!
          </Alert>
        </Snackbar>
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
