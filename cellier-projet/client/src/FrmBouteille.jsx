import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import FrmBouteilleInput from "./FrmBouteilleInput";
import "./FrmBouteille.scss";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import placeholderSaq from "./img/png/placeholder-saq.png";
import DateSelecteur from "./DateSelecteur";
import DateSelecteurAnnee from "./DateSelecteurAnnee";

/**
 * Gestion du formulaire d'une bouteille
 *
 * Contenant l'affichage et la modification de la bouteille spécifié
 * @date 2022-09-30
 * @param {*} {bouteille ...}
 * @returns {*}
 */
export default function FrmBouteille({
  bouteille,
  frmOuvert,
  setFrmOuvert,
  voirFiche,
  setVoirFiche,
  bouteille_type,
  quantite,
  setQuantite,
  dateAchat,
  setDateAchat,
  dateGarde,
  setDateGarde,
  modifierBouteille,
  personnalise,
}) {
  /**
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = React.useState(false);

  const ficheStyle = [
    {
      backgroundColor: "#d3d7dd78",
      padding: "20px",
      height: "100%",
    },
    {
      "& .img-wrap": {
        backgroundColor: "#d3d7dd",
        height: "200px",
        marginBottom: "25px",
      },
    },
    {
      "& .bouteille--description": {
        width: "100px",
        "@media only screen and (min-width: 325px)": {
          width: "200px",
        },
        "@media only screen and (min-width: 400px)": {
          width: "250px",
        },
        "@media only screen and (min-width: 500px)": {
          width: "400px",
        },
      },
    },
    {
      img: {
        objectFit: "contain",
        padding: "5px 0 5px 0",
        height: "100%",
        mixBlendMode: "multiply",
        maxHeight: "250px",
        width: "100%",
      },
    },
  ];
  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmOuvert(false);
    setTimeout(() => {
      setVoirFiche(false);
    }, 200);
  }
  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    if (quantite >= 0) {
      modifierBouteille(quantite, dateAchat, dateGarde);
      setFrmOuvert(false);
    } else {
      if (quantite < 0) setOpenErr(true);
    }
  }
  return (
    <div className="FormBouteille">
      <Dialog
        open={frmOuvert}
        onClose={viderFermerFrm}
        PaperProps={{ sx: { backgroundColor: "#f3f5eb" } }}
      >
        <DialogContent sx={ficheStyle}>
          <div className="img-wrap">
            <img
              src={
                bouteille.image && bouteille.image.indexOf("pastille_gout") < 0
                  ? bouteille.image
                  : placeholderSaq
              }
              alt="bouteille"
            />
          </div>
          <div className="description">
            <div className="description--entete">
              <h2 className="nom">{bouteille.nom} </h2>
              <p className="type">
                {bouteille_type} - {bouteille.format} - {bouteille.pays}
              </p>
            </div>
            <hr></hr>
            <div className="hr"></div>
            <p className="bouteille--description">
              Description : {bouteille.description}
            </p>
            <p className={personnalise == 0 ? "hidden" : ""}>
              Millesime : {bouteille.millesime}
            </p>
            <p className="prix">Prix : {bouteille.prix_saq}$</p>
            <div className={voirFiche === false ? "hidden" : ""}>
              <p className="quantite">Quantité : {quantite}</p>
              <p className="date_achat">Date achat : {bouteille.date_achat}</p>
              <p className="date_achat">
                Garde jusqu'à : {bouteille.garde_jusqua}
              </p>
              <p className="notes">Note : {bouteille.notes}</p>
              <p className="lien_saq">
                {bouteille.personnalise === "0" && (
                  <a href={bouteille.url_saq} target="_blank">
                    Voir SAQ
                  </a>
                )}
              </p>
            </div>
            <Dialog open={openErr}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setOpenErr(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Champ invalide
              </Alert>
            </Dialog>
          </div>
          <div className={voirFiche === true ? "hidden" : ""}>
            <label htmlFor="">Quantité: </label>
          </div>
          <FrmBouteilleInput
            bouteille={bouteille}
            voirFiche={voirFiche}
            setQuantite={setQuantite}
            quantite={quantite}
            setOpenErr={setOpenErr}
          />
          <div className={voirFiche === true ? "hidden" : ""}>
            <label>Date d'achat: </label>
          </div>
          <DateSelecteur
            voirFiche={voirFiche}
            bouteille={bouteille}
            dateAchat={dateAchat}
            setDateAchat={setDateAchat}
          />
          <div className={voirFiche === true ? "hidden" : ""}>
            <label>Garde: </label>
          </div>
          <DateSelecteurAnnee
            voirFiche={voirFiche}
            bouteille={bouteille}
            dateGarde={dateGarde}
            setDateGarde={setDateGarde}
          />
        </DialogContent>
        {voirFiche === false ? (
          <DialogActions>
            <Button
              className={"FormBouteille--button"}
              onClick={viderFermerFrm}
            >
              Annuler
            </Button>
            <Button
              className={"FormBouteille--button"}
              onClick={gererSoumettre}
            >
              Soumettre
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button className="FormBouteille--button" onClick={viderFermerFrm}>
              OK
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
