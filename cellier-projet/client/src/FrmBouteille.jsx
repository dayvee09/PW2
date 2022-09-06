import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import FrmBouteilleInput from "./FrmBouteilleInput";
import "./FrmBouteille.scss";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

import DateSelecteur from "./DateSelecteur";
import DateSelecteurAnnee from "./DateSelecteurAnnee";


export default function FrmBouteille({
  bouteille_id,
  cellier_id,
  bouteille_nom,
  bouteille_image,
  quantite_p,
  quantite,
  setQuantite,
  dateAchat,
  setDateAchat,
  dateAchat_p,
  dateGarde,
  setDateGarde,
  dateGarde_p,
  frmOuvert,
  setFrmOuvert,
  modifierBouteille,
  bouteille_pays,
  bouteille_type,
  bouteille_format,
  bouteille_prix,
  bouteille_millesime,
  bouteille_date_achat,
  bouteille_date_jusqua,
  bouteille_description,
  bouteille_url_saq,
  voirFiche,
  setVoirFiche,
  bouteille
}) {

  /**
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = React.useState(false);
  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmOuvert(false);
    setVoirFiche(false);
    setQuantite(quantite_p);
  }
  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    if (quantite >= 0) {
      modifierBouteille(quantite);
      setFrmOuvert(false);
    }
    else {
      if (quantite < 0)
        setOpenErr(true);
    }
  }

  return (
    <div>
      <Dialog open={frmOuvert} onClose={viderFermerFrm}>
        {/* {voirFiche === false ? (
          <DialogTitle> Modifier la quantité de la bouteille</DialogTitle>
        ) : (
          <DialogTitle> {bouteille_nom}</DialogTitle>
        )} */}
        <DialogContent>
          <div className="img">
            <img src={bouteille_image} alt="bouteille" />
          </div>
          <div className="description">
            <h2 className="nom">{bouteille_nom} </h2>
            <p className="type">{bouteille_type} - {bouteille_format} - {bouteille_pays}</p>
            <hr />
            <p className="description">Description : {bouteille_description}</p>
            <p className="millesime">Millesime : {bouteille_millesime}</p>
            <p className="millesime">Prix : {bouteille_prix}.00$</p>
            <p>
              <a href={bouteille_url_saq}>Voir SAQ</a>
            </p>
            <div className={voirFiche === false? "hidden" : ""}>
              <p className="quantite">Quantité : {quantite}</p>
              <p className="date_achat">Date achat : {bouteille_date_achat}</p>
              <p className="date_achat">Date jusqu'à : {bouteille_date_jusqua}</p>
            </div>
            <Dialog open={openErr}>
              <Alert severity="error"
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
                Invalid!
              </Alert>
            </Dialog>
          </div>
          <FrmBouteilleInput
            voirFiche={voirFiche}
            quantite_p={quantite_p}
            setQuantite={setQuantite}
            quantite={quantite} />
          <DateSelecteur
            voirFiche={voirFiche}
            dateAchat={dateAchat}
            setDateAchat={setDateAchat}
            dateAchat_p={dateAchat_p}
          />
          <DateSelecteurAnnee
            voirFiche={voirFiche}
            dateGarde={dateGarde}
            setDateGarde={setDateGarde}
            dateGarde_p={dateGarde_p}
          />
        </DialogContent>
        {voirFiche === false ? (
          <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <Button onClick={gererSoumettre}>Soumettre</Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={viderFermerFrm}>OK</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
