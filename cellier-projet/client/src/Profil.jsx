import * as React from "react";
import "./Profil.scss";
import FrmEmail from "./FrmEmail";
import FrmPassword from "./FrmPassword";
import { useState, useEffect } from "react";
import MuiAlert from '@mui/material/Alert';
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Route,
  Routes,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  TextField,
  Button,
} from '@aws-amplify/ui-react';
export default function Profil(props) {

  /**
   *  État des styles des composants MUI
   */
  const Button = styled(MuiButton)((props) => ({
    color: "black"
  }));

  /**
   *  État du nouvel email par défaut
   */
  const [NouvelEmailUtilisateur, setNouvelEmailUtilisateur] = useState(props.emailUtilisateur);

  /**
   *  État des formulaires de modification
   */
  const [passwordActuel, setPasswordActuel] = useState(false);
  const [passwordNouveau, setPasswordNouveau] = useState(false);

  /**
   *  État des formulaires de modification
   */
  const [frmEmailOuvert, setFrmEmailOuvert] = useState(false);
  const [frmPasswordOuvert, setFrmPasswordOuvert] = useState(false);

  /**
   *  État de la boite de dialogue de suppression
   */
  const [frmSuppressionOuvert, setFrmSuppressionOuvert] = useState(false);

  /**
   * État de l'alerte
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


  // ----------------------- Gestion du profil ------------------------------------------------

  /**
   * Gère la fermeture de la boite de dialogue de supression du profil
   */
  function viderFermerFrm() {
    setFrmSuppressionOuvert(false);
  }

  /**
   * Gère l'ouverture de la boite de dialogue de supression du profil
   */
  function gererSupprimer() {
    setFrmSuppressionOuvert(true);
  }

  /**
   * Gère la suppression du profil
   */
    function gererSoumettre() {
      props.supprimerUtilisateur();
    }

  /**
   * Gère la modification de l'email
   */
  function gererModifierEmail() {
    setNouvelEmailUtilisateur(props.emailUtilisateur);
    setFrmEmailOuvert(true);
  }

  /**
   * Gère la modification du mot de passe
   */
  function gererModifierPassword() {
    setFrmPasswordOuvert(true);
  }

  return (
    <>
      <NavLink to="/">
        <div className="signOut">
          <Button onClick={props.gererSignOut}>Déconnexion</Button>
        </div>
      </NavLink> 
      <div className="Profil" data-quantite="">
        <div className="description">
            <div className="infos-modification">
              <p>Adresse Courriel</p>
              <button className="modifier" onClick={gererModifierEmail}>Modifier</button>
            </div>
            <TextField
                style = {{width: '80%'}} 
                id="email"
                InputProps={{
                  readOnly: true,
                }}
                type={"text"}
                variant="outlined" 
                defaultValue={props.emailUtilisateur}
            />
          </div>
          <div className="description-password">
            <div className="infos-modification">
              <p>Mot de passe</p>
              <button className="modifier" onClick={gererModifierPassword}>Modifier</button>
            </div>
            <TextField
                style = {{width: '80%'}}  
                id="email"
                InputProps={{
                  readOnly: true,
                }}
                type={"password"}
                variant="outlined" 
                defaultValue={"**********"}
            />
        </div>
        <FrmEmail
          frmEmailOuvert={frmEmailOuvert}
          setFrmEmailOuvert={setFrmEmailOuvert}
          utilisateur={props.utilisateur}
          emailUtilisateur={props.emailUtilisateur}
          setEmailUtilisateur={props.setEmailUtilisateur}
          URI={props.URI}
          setNouvelEmailUtilisateur={setNouvelEmailUtilisateur}
          NouvelEmailUtilisateur={NouvelEmailUtilisateur}
        />
         <FrmPassword
          frmPasswordOuvert={frmPasswordOuvert}
          setFrmPasswordOuvert={setFrmPasswordOuvert}
          emailUtilisateur={props.emailUtilisateur}
          passwordActuel={passwordActuel}
          setPasswordActuel={setPasswordActuel}
          passwordNouveau={passwordNouveau}
          setPasswordNouveau={setPasswordNouveau}
        />
      </div>
      <div className="boutonSupprimer" data-id="">
          <button className="boutonSupprimer" onClick={gererSupprimer}>Supprimer votre compte</button>
      </div>
      <Dialog PaperProps={{ sx: {backgroundColor: "#f3f5eb"} }} open={frmSuppressionOuvert} onClose={viderFermerFrm}>
        <DialogTitle> Voulez-vous vraiment supprimer votre profil ?</DialogTitle>
        <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
