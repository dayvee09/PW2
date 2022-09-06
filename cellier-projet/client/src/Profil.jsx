import * as React from "react";
import "./Profil.scss";
import FrmEmail from "./FrmEmail";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from 'aws-amplify';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Profil(props) {
  /**
   *  API MUI https://mui.com/material-ui/react-snackbar/
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

  /**
   *  État du nouvel email par défaut
   */

  const [NouvelEmailUtilisateur, setNouvelEmailUtilisateur] = useState(props.emailUtilisateur);

  /**
   *  État des formulaires de modification
   */

  const [frmEmailOuvert, setFrmEmailOuvert] = useState(false);
  const [frmPasswordOuvert, setFrmPasswordOuvert] = useState(false);


  // ----------------------- Gestion du profil ------------------------------------------------

  /**
   *  Supprimer un profil;
   */

  async function supprimerUtilisateur() {
    try {
      const result = await Auth.deleteUser();
    } catch (error) {}
    let reponse = await fetch(
      props.URI + "/" + "email" + "/" + props.emailUtilisateur + "/" + "utilisateurs",
      { method: "DELETE" }
    );
    let reponseJson = await reponse.json();
  }

  /**
   * Gère la suppression du profil
   */
  function gererSupprimer() {
    supprimerUtilisateur();
  }

  /**
   *  Modifier le courriel du profil;
   */
  function modifierEmail(NouvelEmailUtilisateur) {
    var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (reg.test(NouvelEmailUtilisateur)) {
      setNouvelEmailUtilisateur(NouvelEmailUtilisateur);
    }
    fetchPatchUtilisateurEmail(NouvelEmailUtilisateur);
  }

  /**
   * Gère la modification de l'email
   */
  function gererModifierEmail() {
    setNouvelEmailUtilisateur(props.emailUtilisateur);
    setFrmEmailOuvert(true);
  }

  /**
   * Gère la modification du password
   */
  function gererModifierPassword() {
    setFrmPasswordOuvert(true);
  }

  /**
   * requête de modification du password dans aws
   */
  async function fetchPatchtPassword(passwordActuel, nouveauPassword) {
    Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, passwordActuel, nouveauPassword);
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  /**
   * requête de modification de l'email utilisateur
   */
  async function fetchPatchUtilisateurEmail(NouvelEmailUtilisateur) {
    let user = await Auth.currentAuthenticatedUser();
    let result = await Auth.updateUserAttributes(user, {
        'email': NouvelEmailUtilisateur,
    });
    console.log(result);
    if (result === "SUCCESS") {
      let reponse = await fetch(
          props.URI + "/" + "email" + "/" + props.emailUtilisateur + "/" + "utilisateurs",
          {
              method: "PATCH",
              body: JSON.stringify({ email: NouvelEmailUtilisateur }),
          }
      );
      let reponseJson = await reponse.json();
    }
    props.setEmailUtilisateur(NouvelEmailUtilisateur)
  }

  return (
    <>
      <div className="bouteille" data-quantite="">
        <div className="description">
          <div className="description-originale">
            <p className="nom">{props.emailUtilisateur}</p>
            <button onClick={gererModifierEmail}>Modifier</button>
          </div>
        </div>
        <div className="options" data-id="">
          <button onClick={gererSupprimer}>Supprimer votre compte</button>
        </div>
        <Snackbar sx={{ height: '100%' }} anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }} open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
            En rupture de stock!
          </Alert>
        </Snackbar>
        <FrmEmail
          frmEmailOuvert={frmEmailOuvert}
          setFrmEmailOuvert={setFrmEmailOuvert}
          emailUtilisateur={props.emailUtilisateur}
          modifierEmail={modifierEmail}
          setNouvelEmailUtilisateur={setNouvelEmailUtilisateur}
          NouvelEmailUtilisateur={NouvelEmailUtilisateur}
        />
      </div>
    </>
  );
}
