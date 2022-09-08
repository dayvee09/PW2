import * as React from "react";
import "./Profil.scss";
import FrmEmail from "./FrmEmail";
import FrmPassword from "./FrmPassword";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from 'aws-amplify';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Profil(props) {
  // /**
  //  *  API MUI https://mui.com/material-ui/react-snackbar/
  //  */
  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });
  // const [openAlert, setOpenAlert] = React.useState(false);
  // const handleCloseAlert = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpenAlert(false);
  // };

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


  // ----------------------- Gestion du profil ------------------------------------------------

  /**
   * Gère la suppression du profil
   */
  function gererSupprimer() {
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
      <div className="bouteille" data-quantite="">
        <div className="description">
          <div className="description-originale">
            <p className="Email">{props.emailUtilisateur}</p>
            <button onClick={gererModifierEmail}>Modifier</button>
          </div>
          <div className="description-originale">
            <p className="Mot de passe">********</p>
            <button onClick={gererModifierPassword}>Modifier</button>
          </div>
        </div>
        <div className="options" data-id="">
          <button onClick={gererSupprimer}>Supprimer votre compte</button>
        </div>
        {/* <Snackbar sx={{ height: '100%' }} anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }} open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
            En rupture de stock!
          </Alert>
        </Snackbar> */}
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
          //PatchPassword={PatchPassword}
        />
      </div>
    </>
  );
}
