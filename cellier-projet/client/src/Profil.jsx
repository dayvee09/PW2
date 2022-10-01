import * as React from "react";
import "./Profil.scss";
import FrmEmail from "./FrmEmail";
import FrmPassword from "./FrmPassword";
import FrmUsername from "./FrmUsername";
import { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import MuiButton from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Image from "./img/svg/icone_profil_blue_filled.svg";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { TextField } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";

/**
 * Gestion de mon profile
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function Profil(props) {
  /**
   *  État des styles des composants MUI
   */
  const Button = styled(MuiButton)((props) => ({
    color: "#152440",
    border: "1px solid #cc4240",
    textDecoration: "none",
    borderRadius: "4px",
    fontFamily: "Alata",
    fontSize: "12px",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: "#f1ab50",
      border: "1px solid #f1ab50",
      color: "#152440",
    },
  }));

  /**
   *  État du nouvel email par défaut
   */
  const [NouvelEmailUtilisateur, setNouvelEmailUtilisateur] = useState(
    props.emailUtilisateur
  );

  /**
   *  État du nouveau nom d'usager par défaut
   */
  const [NouveauUsername, setNouveauUsername] = useState(props.username);

  /**
   *  État des formulaires de modification
   */
  const [passwordActuel, setPasswordActuel] = useState(false);
  const [passwordNouveau, setPasswordNouveau] = useState(false);

  /**
   *  État des formulaires de modification
   */
  const [frmUsernameOuvert, setFrmUsernameOuvert] = useState(false);
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
  const navigate = useNavigate();
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
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
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }

  /**
   * Gère la modification du username
   */
  function gererModifierUsername() {
    setFrmUsernameOuvert(true);
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

  const redirectionAccueil = function () {
    props.gererSignOut();
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="Appli--entete">
        <div className="Appli--signOut-container">
          <button className="Appli--signOut" onClick={redirectionAccueil}>
            Déconnexion
          </button>
        </div>
      </div>
      <div className="Appli--container">
        <div className="infos-profil">
          <img src={Image} className="icone-profil" alt="icone-profil"></img>
          <h1>{props.username}</h1>
        </div>
        <div className="Profil--container">
          <div className="Profil">
            <div className="description-username">
              <div className="infos-modification">
                <p>Nom d'usager</p>
                <button className="modifier" onClick={gererModifierUsername}>
                  Modifier
                </button>
              </div>
              <TextField
                style={{ width: "100%" }}
                id="username"
                type={"text"}
                variant="outlined"
                value={props.username}
                aria-label="username"
                disabled
              />
            </div>
            <div className="description-courriel">
              <div className="infos-modification">
                <p>Adresse Courriel</p>
                <button className="modifier" onClick={gererModifierEmail}>
                  Modifier
                </button>
              </div>
              <TextField
                style={{ width: "100%" }}
                id="email"
                type={"text"}
                variant="outlined"
                value={props.emailUtilisateur}
                aria-label="email"
                disabled
              />
            </div>
            <div className="description-password">
              <div className="infos-modification">
                <p>Mot de passe</p>
                <button className="modifier" onClick={gererModifierPassword}>
                  Modifier
                </button>
              </div>
              <TextField
                style={{ width: "100%" }}
                id="password"
                type={"password"}
                variant="outlined"
                defaultValue={"**********"}
                aria-label="password"
                disabled
              />
            </div>
          </div>
        </div>
        <FrmUsername
          emailUtilisateur={props.emailUtilisateur}
          frmUsernameOuvert={frmUsernameOuvert}
          setFrmUsernameOuvert={setFrmUsernameOuvert}
          username={props.username}
          setUsername={props.setUsername}
          NouveauUsername={NouveauUsername}
          setNouveauUsername={setNouveauUsername}
          URI={props.URI}
        />
        <FrmEmail
          username={props.username}
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
        {props.utilisateur && props.utilisateur.privilege !== "admin" && (
          <div className="boutonSupprimer" data-id="">
            <button className="boutonSupprimer" onClick={gererSupprimer}>
              Supprimer votre compte
            </button>
          </div>
        )}
      </div>
      <Dialog
        PaperProps={{ sx: { backgroundColor: "#f3f5eb" } }}
        open={frmSuppressionOuvert}
        onClose={viderFermerFrm}
      >
        <DialogTitle>
          {" "}
          Voulez-vous vraiment supprimer votre profil ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={viderFermerFrm} className="cancel">
            Annuler
          </Button>
          <button onClick={gererSoumettre} className="action">
            Supprimer
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
