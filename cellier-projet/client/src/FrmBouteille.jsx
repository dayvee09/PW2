import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import FrmBouteilleInput from "./FrmBouteilleInput";

export default function FrmBouteille({
  bouteille_id,
  cellier_id,
  bouteille_nom,
  bouteille_image,
  bouteille_quantite_p,
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
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmOuvert(false);
    setVoirFiche(false);
  }
  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    console.log(quantite);
    if (quantite !== bouteille_quantite_p && quantite >= 0) {
      modifierBouteille(quantite);
    }
    setFrmOuvert(false);
  }
  console.log(voirFiche);
  return (
    <div>
      <Dialog open={frmOuvert} onClose={viderFermerFrm}>
        <DialogTitle> Modifier la quantité de la bouteille</DialogTitle>
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
          </div>
          {voirFiche === false && (
            <FrmBouteilleInput
              bouteille_quantite_p={bouteille_quantite_p}
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
