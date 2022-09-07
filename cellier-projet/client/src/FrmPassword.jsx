import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import "./FrmEmail.scss";
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

export default function FrmEmail({
    setFrmPasswordOuvert,
    frmPasswordOuvert,
    emailUtilisateur
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
    setFrmPasswordOuvert(false);
  }
  
  return (
    <div>
      <Dialog open={frmPasswordOuvert} onClose={viderFermerFrm}>
        <DialogTitle> Modifier votre mot de passe</DialogTitle>
        <DialogContent>
          <div className="description">
            {/* <TextField
                    onChange={gererInput}
                    autoFocus
                    id="email"
                    type={"text"}
                    defaultValue={emailUtilisateur}
            />
            <TextField
                    onChange={gererInput}
                    autoFocus
                    id="email"
                    type={"text"}
                    defaultValue={emailUtilisateur}
            /> */}
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
          <Flex as="form" direction="column">
            <Heading level={3}>Modifier votre mot de passe</Heading>
            <TextField label="Username" name="username" autoComplete={emailUtilisateur} />s
            <PasswordField
                label="Current password"
                name="current_password"
                autoComplete="current-password"
                descriptiveText="Le mot de passe doit contenir au moins 8 caratères"
            />
            <PasswordField
                label="New password"
                name="new_password"
                autoComplete="new-password"
                descriptiveText="Le mot de passe doit contenir au moins 8 caratères"
            />
            <PasswordField
                label="Confirm password"
                name="confirm_password"
                autoComplete="new-password"
            />
            {/* <Button type="submit" onClick={(e) => e.preventDefault()}>Soumettre</Button>
            <Button onClick={viderFermerFrm}>Annuler</Button> */}
        </Flex>
        </DialogContent>
          <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <Button onClick={gererSoumettre}>Soumettre</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}
