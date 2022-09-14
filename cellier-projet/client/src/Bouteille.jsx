import * as React from "react";
import "./Bouteille.scss";
import FrmBouteille from "./FrmBouteille";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import vinExemple from "./img/png/vin-default.png";
// import format from 'date-fns/format';
// import moment from 'moment';
// import { keyframes } from "@emotion/react";
export default function Bouteille(props) {
  /**
   *  API MUI https://mui.com/material-ui/react-snackbar/
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  /**
   *  État d'affichage de la fiche de bouteille
   */
  const [voirFiche, setVoirFiche] = useState(false);

  /**
   *  État du formulaire de modification
   */
  const [frmOuvert, setFrmOuvert] = useState(false);

  /**
   * État de la bouteille
   */
  const [bouteille, setBouteille] = useState(props.bouteille);

  /**
   *  État de la quantité et la quantité précédente
   */
  const [quantite, setQuantite] = useState(props.quantite);

  /**
   * État de la date d'achat et la date précédente
   */
  const [dateAchat, setDateAchat] = useState(props.date_achat);

  /**
   * État de la date de garde et la date de garde précédente
   */
  const [dateGarde, setDateGarde] = useState(props.garde_jusqua);

  /**
   * Gère l'affichage du formulaire quand click du bouton "Modifier"
   */
  function gererModifier() {
    setQuantite(bouteille.quantite);
    setDateAchat(bouteille.date_achat);
    setDateGarde(bouteille.garde_jusqua);
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
    setQuantite((quantite) => parseInt(quantite) + 1);
    fetchPutVinUn(parseInt(quantite) + 1, dateAchat, dateGarde);
  }

  /**
   * Gère le bouton 'Boire'
   */
  function gererBoire() {
    if (quantite > 0) {
      setQuantite((quantite) => parseInt(quantite) - 1);
      fetchPutVinUn(parseInt(quantite) - 1, dateAchat, dateGarde);
    } else setOpenAlert(true);
  }

  /**
   * Gère la modification de la quantité de bouteille
   * @param {*} NouveauQuantite
   */
  function modifierBouteille(
    NouveauQuantite,
    NouveauDateAchat,
    NouveauDateGarde
  ) {
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
  async function fetchPutVinUn(
    NouveauQuantite,
    NouveauDateAchat,
    NouveauDateGarde
  ) {
    //Route API: localhost/PW2/cellier-projet/api-php/cellier/3/vins/6/bouteille/7,
    //           Execute dans l'ordre 'VinsControleur.cls.php'->'VinsModele.cls.php'->function changer($params, $idEntite, $fragmentVin),'fragmentVin'-> body
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
          garde_jusqua: NouveauDateGarde,
        }),
      }
    );
    let reponseJson = await reponse.json();
    fetchVinUn();
  }
  async function fetchVinUn() {
    //Route API: localhost/PW2/cellier-projet/api-php/cellier/3/vins/6/bouteille/7, collection->'vins', params-> 'cellier'=> 6, idEntite-> 'bouteille'=> 7
    await fetch(
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
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setBouteille(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // setError(error);
      });
  }
  return (
    <>
      <div className="bouteille" data-quantite="">
        <div className="img">
          <img
            src={
              (props.image&&props.image.indexOf("pastille_gout") < 0)
                ? props.image
                : vinExemple
            }
            alt="bouteille"
          />
        </div>
        <div className="bouteille--info-container">
          <div className="description">
            <div className="description-originale">
              <p className="nom titre">{props.nom} </p>
              <p className="nom">Quantité: {bouteille.quantite} </p>
            </div>
          </div>
          <div className="options" data-id="{id_bouteille_cellier}">
            <button onClick={gererModifier}>Modifier</button>
            <button onClick={gererVoir}>Fiche</button>
            <button onClick={gererAjouter} className="btnAjouter">
              Ajouter
            </button>
            <button onClick={gererBoire} className="btnBoire">
              Boire
            </button>
          </div>
        </div>
        <Snackbar
          sx={{ height: "100%" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openAlert}
          autoHideDuration={1000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            En rupture de stock!
          </Alert>
        </Snackbar>
        <FrmBouteille
          bouteille={bouteille}
          frmOuvert={frmOuvert}
          setFrmOuvert={setFrmOuvert}
          voirFiche={voirFiche}
          setVoirFiche={setVoirFiche}
          bouteille_type={props.type}
          quantite={quantite}
          setQuantite={setQuantite}
          dateAchat={dateAchat}
          setDateAchat={setDateAchat}
          dateGarde={dateGarde}
          setDateGarde={setDateGarde}
          modifierBouteille={modifierBouteille}
        />
      </div>
    </>
  );
}
