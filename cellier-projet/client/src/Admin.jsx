import "./Admin.scss";

import * as React from "react";
import FrmEmail from "./FrmEmail";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Profil(props) {
  /**
   *  API MUI https://mui.com/material-ui/react-snackbar/
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  /**
   *  État du nouvel email par défaut
   */

  const [NouvelEmailUtilisateur, setNouvelEmailUtilisateur] = useState(
    props.emailUtilisateur
  );

  /**
   *  État des formulaires de modification
   */

  const [frmEmailOuvert, setFrmEmailOuvert] = useState(false);
  const [frmPasswordOuvert, setFrmPasswordOuvert] = useState(false);

  // ----------------------- Gestion de l'admin ------------------------------------------------

  return (
    <>
      <h1>Bienvenue sur l'interface d'admin!</h1>
    </>
  );
}
