import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import "./FrmEmail.scss";
import MuiButton from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  useNavigate,
} from "react-router-dom";

export default function FrmEmail({
  username,
  setEmailUtilisateur,
  emailUtilisateur,
  NouvelEmailUtilisateur,
  setNouvelEmailUtilisateur,
  frmEmailOuvert,
  setFrmEmailOuvert,
  fetchUtilisateur,
  URI
}) {
  /**
   *  État des styles des composants MUI
   */
  const Button = styled(MuiButton)((props) => ({
    color: "#f3f5eb",
    backgroundColor: "#cc4240",
    textDecoration: "none",
    borderRadius:"4px",
    fontFamily: "Alata",
	padding: "10px 20px",
	fontSize: "12px",
    "&:hover": {
      backgroundColor: "#f1ab50",
      color: "#f3f5eb",
    },
  }));

  const CssDialogTitle = styled(DialogTitle)((props) => ({
    fontFamily: "Alata",
    color: "#152440",
    fontSize: "19px",
    marginTop: "10px",
    textAlign: "center",
  }));

  /**
   * État de l'alerte
   */
  const [severity, setSeverity] = useState([]);

  /**
   * État du message retour
   */
  const [messageRetour, setMessageRetour] = useState([]);

  /**
   * Thème de modification du composant TextField
   */
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid #f1ab50`,
                boxShadow: `none`,
              },
            },
          },
        },
      },
    },
  });

  /**
   * État de l'alerte
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false);
    setFrmEmailOuvert(false);
  };

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
   * requête de modification de l'email utilisateur
   */
  async function fetchPatchUtilisateurEmail(NouvelEmailUtilisateur) {
    let user = await Auth.currentAuthenticatedUser();
    let result = await Auth.updateUserAttributes(user, {
      email: NouvelEmailUtilisateur,
    });
    if (result === "SUCCESS") {
      console.log(NouvelEmailUtilisateur);
      console.log(username);
      let reponse = await fetch(
        URI + "/" + "email" + "/" + emailUtilisateur + "/" + "utilisateurs",
        {
          method: "PATCH",
          body: JSON.stringify({email: NouvelEmailUtilisateur}),
        }
      );
      let reponseJson = await reponse.json();
      console.log(reponseJson);
      setEmailUtilisateur(NouvelEmailUtilisateur)
      fetchUtilisateur();
      navigate(`/profil/${NouvelEmailUtilisateur}`, { replace: true })
    }
    return result
  }

  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    setSeverity("");
    var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setNouvelEmailUtilisateur(NouvelEmailUtilisateur);
    if (reg.test(NouvelEmailUtilisateur)) {
      fetchPatchUtilisateurEmail(NouvelEmailUtilisateur);
      setMessageRetour("Modification effectuée");
      setSeverity("success");
      setOpenAlert(true);
    } else {
      setMessageRetour("Courriel invalide");
      setSeverity("error");
      setOpenAlert(true);
    }
  }
  return (
    <div>
      <Dialog
        PaperProps={{ sx: { backgroundColor: "#f3f5eb" } }}
        className="dialogue"
        open={frmEmailOuvert}
        onClose={viderFermerFrm}
      >
        <CssDialogTitle>Modifier votre email</CssDialogTitle>
        <DialogContent>
          <div className="frmEmail">
            <p className="">Email actuel: {emailUtilisateur}</p>
            <ThemeProvider theme={theme}>
              <TextField
                onChange={gererInput}
                autoFocus
                id="email"
                type={"text"}
                defaultValue={emailUtilisateur}
              />
            </ThemeProvider>
            <Snackbar
              sx={{ height: "100%" }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={openAlert}
              autoHideDuration={1000}
              onClose={handleCloseAlert}
            >
              <Alert
                onClose={handleCloseAlert}
                severity={severity}
                sx={{ width: "100%" }}
              >
                {messageRetour}
              </Alert>
            </Snackbar>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={viderFermerFrm}>Annuler</Button>
          <button onClick={gererSoumettre} className="action">Enregistrer</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
