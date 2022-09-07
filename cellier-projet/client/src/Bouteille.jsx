import * as React from "react";
import "./Bouteille.scss";
import FrmBouteille from "./FrmBouteille";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import format from 'date-fns/format';
import moment from 'moment';
import { keyframes } from "@emotion/react";

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
   *  État de la quantité et la quantité précédente
   */
  const [quantite, setQuantite] = useState(props.quantite);
  const [quantite_p, setQuantite_p] = useState(quantite);
  /**
   * État de la date d'achat et la date précédente
   */
  const [dateAchat, setDateAchat] = useState(props.date_achat);
  const [dateAchat_p, setDateAchat_p] = useState(dateAchat);
  /**
   * État de la date de garde et la date de garde précédente
   */
  const [dateGarde, setDateGarde] = useState(props.garde_jusqua);
  const [dateGarde_p, setDateGarde_p] = useState(dateGarde);

  /**
   *  État du formulaire de modification
   */

  const [frmOuvert, setFrmOuvert] = useState(false);

  // useEffect(() => {
  //   fetchPutVinUn(quantite);
  // }, [quantite]);

  /**
   * Gère l'affichage du formulaire quand click du bouton "Modifier"
   */
  function gererModifier() {
    setQuantite_p(quantite);
    setDateAchat_p(dateAchat);
    setDateGarde_p(dateGarde);
    setFrmOuvert(true);
  }

  /**
   * Gère l'affichage du formulaire quand click du bouton "Fiche"
   */
  function gererVoir() {
    setVoirFiche(true);
    setFrmOuvert(true);
  }

  /**
   * Gère le bouton 'ajouter'
   */
  function gererAjouter() {
    setQuantite(quantite=>parseInt(quantite) + 1);
    fetchPutVinUn(parseInt(quantite) + 1, dateAchat, dateGarde);
  }

  /**
   * Gère le bouton 'Boire'
   */
  function gererBoire() {
    if (quantite > 0) {
      setQuantite(quantite=>parseInt(quantite) - 1);
      fetchPutVinUn(parseInt(quantite) - 1, dateAchat, dateGarde);
    }
    else
      setOpenAlert(true);
   
  }

  /**
   * Gère la modification de la quantité de bouteille
   * @param {*} NouveauQuantite 
   */
  function modifierBouteille(NouveauQuantite, NouveauDateAchat, NouveauDateGarde ) {

    var reg = /^[1-9]+[0-9]*]*$/;
    if (reg.test(NouveauQuantite)) {
      setQuantite(NouveauQuantite);
    }
    fetchPutVinUn(quantite, NouveauDateAchat, NouveauDateGarde);
  }
  /**
   * Actualiser la quantité du DB
   * @param {*} NouveauQuantite 
   */
  async function fetchPutVinUn(NouveauQuantite, NouveauDateAchat, NouveauDateGarde) {
    //route: localhost/PW2/cellier-projet/api-php/cellier/3/vins/6/bouteille/7
    let reponse = await fetch(
      // "http://localhost/PW2/cellier-projet/api-php" +
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
        body: JSON.stringify({
          quantite: NouveauQuantite,
          date_achat: NouveauDateAchat,
          garde_jusqua: NouveauDateGarde

        }),
      }
    );
     let reponseJson = await reponse.json();
  }
  // async function fetchVinUn() {
  //   //route: localhost/PW2/cellier-projet/api-php/cellier/3/vins/6/bouteille/7
  //   let reponse = await fetch(props.URI + "/" + "cellier" + "/" + props.vino__cellier_id + "/" + "vins" + "/" + "bouteille" + "/" + props.id );
  //   let reponseJson = await reponse.json();
  // }
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
          vertical: "top",
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
          quantite_p={quantite_p}
          bouteille_pays={props.pays}
          bouteille_type={props.type}
          bouteille_format={props.format}
          bouteille_prix={props.prix_saq}
          bouteille_millesime={props.millesime}
          bouteille_date_achat={props.date_achat}
          bouteille_date_jusqua={props.garde_jusqua}
          bouteille_description={props.description}
          bouteille_url_saq={props.url_saq}
          quantite={quantite}
          setQuantite={setQuantite}
          dateAchat={dateAchat}
          setDateAchat={setDateAchat}
          dateAchat_p={dateAchat_p}
          dateGarde={dateGarde}
          setDateGarde={setDateGarde}
          dateGarde_p={dateGarde_p}
          modifierBouteille={modifierBouteille}
          voirFiche={voirFiche}
          setVoirFiche={setVoirFiche}
        />
      </div>
    </>
  );
}
