import * as React from "react";
import "./Profil.scss";
import FrmEmail from "./FrmEmail";
import FrmPassword from "./FrmPassword";
import { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import MuiButton from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Image from "./img/svg/icone_profil_blue_line.svg";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useNavigate,
} from "react-router-dom";
import { TextField } from "@aws-amplify/ui-react";
export default function Profil(props) {

  /**
   *  État des styles des composants MUI
   */
  const Button = styled(MuiButton)((props) => ({
    color: "#f3f5eb",
    backgroundColor: "#cc4240",
    textDecoration: "none",
    borderRadius:"0px",
    fontFamily: "Alata",
    '&:hover': {
      backgroundColor: '#f1ab50',
      color: '#f3f5eb',
     }
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
  const navigate = useNavigate();
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  /**
   * Thème de modification du composant TextField
   */
  const theme = createTheme({
    components: {
      // Inputs
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid #f1ab50`,
                boxShadow:'none'
              }
            }
          }
        }
      }
    }
  });

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

  const redirectionAccueil = function () {
    props.gererSignOut();
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      {/* <NavLink to="/"> */}
      <div className="signOut">
        <Button onClick={redirectionAccueil}>Déconnexion</Button>
      </div>
      {/* </NavLink> */}
      <div className="Profil" data-quantite="">
        <div className="description">
          <div className="infos-modification">
            <p>Adresse Courriel</p>
            <button className="modifier" onClick={gererModifierEmail}>
              Modifier
            </button>
          </div>
          <ThemeProvider theme={theme}>
            <TextField
              style={{ width: "100%" }}
              id="email"
              InputProps={{ inputProps: {readOnly: true,  backgroundColor:"black"} }}
              type={"text"}
              variant="outlined"
              defaultValue={props.emailUtilisateur}
            />
          </ThemeProvider>
        </div>
        <div className="description-password">
          <div className="infos-modification">
            <p>Mot de passe</p>
            <button className="modifier" onClick={gererModifierPassword}>
              Modifier
            </button>
          </div>
          <ThemeProvider theme={theme}>
            <TextField
              style={{ width: "100%" }}
              id="email"
              // InputProps={{
              //   readOnly: true,
              // }}
              type={"password"}
              variant="outlined"
              defaultValue={"**********"}
            />
          </ThemeProvider>
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
      {props.utilisateur && props.utilisateur.privilege !== "admin" && (
        <div className="boutonSupprimer" data-id="">
          <button className="boutonSupprimer" onClick={gererSupprimer}>
            Supprimer votre compte
          </button>
        </div>
      )}
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
          <Button onClick={viderFermerFrm}>Annuler</Button>
          <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
