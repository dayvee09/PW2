import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import "./FrmEmail.scss";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

export default function FrmEmail({
  setEmailUtilisateur,
  emailUtilisateur,
  NouvelEmailUtilisateur,
  setNouvelEmailUtilisateur,
  frmEmailOuvert,
  modifierEmail,
  setFrmEmailOuvert
}) {


  /**
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = React.useState(false);

  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmEmailOuvert(false);
  }

  /**
   *  Gère l'action d'annuler
   */
  function gererInput(e) {
    setNouvelEmailUtilisateur(e.target.value);
  }

  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    modifierEmail(NouvelEmailUtilisateur);
    setFrmEmailOuvert(false);
  }
  
  return (
    <div>
      <Dialog open={frmEmailOuvert} onClose={viderFermerFrm}>
        <DialogTitle> Modifier votre email</DialogTitle>
        <DialogContent>
          <div className="description">
            <p className="">Email actuel: {emailUtilisateur}</p>
            <TextField
                onChange={gererInput}
                autoFocus
                id="email"
                type={"text"}
                defaultValue={emailUtilisateur}
            />
            {/* <Dialog open={openErr}>
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
            </Dialog> */}
          </div>
        </DialogContent>
          <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <Button onClick={gererSoumettre}>Soumettre</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}
