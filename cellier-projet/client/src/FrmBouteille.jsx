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

export default function FrmBouteille({
  bouteille_id,
  cellier_id,
  bouteille_nom,
  bouteille_image,
  quantite_p,
  quantite,
  setQuantite,
  frmOuvert,
  setFrmOuvert,
  modifierBouteille,
  bouteille_pays,
  bouteille_vino__type_id,
  bouteille_millesime,
  bouteille_date_achat,
  bouteille_description,
  bouteille_url_saq,
  voirFiche,
  setVoirFiche,
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
      if(quantite < 0)
      setOpenErr(true);
    }
  }
  return (
    <div>
      <Dialog open={frmOuvert} onClose={viderFermerFrm}>
        {voirFiche === false ? (
          <DialogTitle> Modifier la quantité de la bouteille</DialogTitle>
        ) : (
          <DialogTitle> {bouteille_nom}</DialogTitle>
        )}
        <DialogContent>
          <div className="img">
            <img src={bouteille_image} alt="bouteille" />
          </div>
          <div className="description">
            <p className="nom">Nom : {bouteille_nom} </p>
            <p className="quantite">Quantité : {quantite}</p>
            <p className="pays">Pays : {bouteille_pays}</p>
            <p className="type">Type : {bouteille_vino__type_id}</p>
            <p className="millesime">Millesime : {bouteille_millesime}</p>
            <p>
              <a href={bouteille_url_saq}>Voir SAQ</a>
            </p>
            <p className="date_achat">Date achat : {bouteille_date_achat}</p>
            <p className="description">Description : {bouteille_description}</p>
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
          {voirFiche === false && (
            <FrmBouteilleInput
              quantite_p={quantite_p}
              setQuantite={setQuantite}
              quantite={quantite}
            />
          )}
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
