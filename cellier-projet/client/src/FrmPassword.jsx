import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import "./FrmPassword.scss";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import {
    Flex,
    Heading,
    TextField,
    PasswordField,
    Button,
    useTheme,
} from '@aws-amplify/ui-react';

export default function FrmPassword({
    setFrmPasswordOuvert,
    frmPasswordOuvert,
    passwordActuel,
    setPasswordActuel,
    passwordNouveau,
    setPasswordNouveau,
    PatchPassword
}) {


  /**
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = React.useState(false);

  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmPasswordOuvert(false);
  }

  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    PatchPassword(passwordActuel,passwordNouveau)
    setFrmPasswordOuvert(false);
  }
  
  return (
    <div>
      <Dialog open={frmPasswordOuvert} onClose={viderFermerFrm}>
        <DialogTitle> Modifier votre mot de passe</DialogTitle>
        <DialogContent>
            <div className="frmPassword">
            <PasswordField
              className="PasswordField"
              onChange={(event)=> setPasswordActuel(event.target.value)}
              autoFocus
              label="Mot de passe actuel"
              id="Mot_de_passe_actuel"
              type="password"
            />
            <PasswordField
              className="PasswordField"
              onChange={(event)=> setPasswordNouveau(event.target.value)}
              autoFocus
              label="Nouveau mot de passe"
              id="Nouveau_mot_de_passe"
              type="password"
            />
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
