import * as React from "react";
import "./Cellier.scss";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MuiButton from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

export default function Cellier(props) {
  const [cellier, setCellier] = useState([props.id]);
  const [selection, setSelection] = useState("fond-normal");
  const [eltAncrage, setEltAncrage] = useState(null);
  const menuContextuelOuvert = Boolean(eltAncrage);
  const navigate = useNavigate();
  const [messageRetour, setMessageRetour] = useState([]);
  const [severity, setSeverity] = useState([]);
  /**
   *  État de la boite de dialogue de suppression
   */
  const [frmSuppressionOuvert, setFrmSuppressionOuvert] = useState(false);

  /**
   * Gestion du changement de fond au clic du cellier
   */
  const handleClickCellier = () => {
    setCellier(props.id);
    setTimeout(() => {
      navigate(`/cellier/${cellier}/vins`, { replace: true });
    }, 100);
  };

  /**
   *  État des styles des composants MUI
   */
  const Button = styled(MuiButton)((props) => ({
    color: "#f3f5eb",
    backgroundColor: "#cc4240",
    textDecoration: "none",
    borderRadius: "4px",
    fontFamily: "Alata",
    fontSize: "12px",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: "#f1ab50",
      color: "#152440",
    },
  }));

  /**
   * État de l'alerte
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
    props.fetchCelliers();
  };

  useEffect(() => {
    props.gererCellier(cellier);
  }, [cellier]);

  /**
   * Gestion du menu contextuel d'action d'un cellier
   * @param {*} evt
   */
  function gererMenuContextuel(evt) {
    setEltAncrage(evt.currentTarget);
  }

  /**
   * Gestion de la fermeture du menu contextuel d'action d'un cellier
   */
  function gererFermerMenuContextuel() {
    setEltAncrage(null);
  }

  /**
   * Gère la fermeture de la boite de dialogue de supression du profil
   */
  function viderFermerFrm() {
    setFrmSuppressionOuvert(false);
    gererFermerMenuContextuel();
  }

  /**
   * Gère l'ouverture de la boite de dialogue de supression du cellier
   */
  function gererSupprimer() {
    setFrmSuppressionOuvert(true);
  }

  /**
   * Gère la suppression du cellier
   */
  function gererSoumettre() {
    fetchSupprimerCellier();
  }

  /**
   * Redirection vers la modificiation du cellier
   */
  function gererModifier() {
    navigate(`/modifier-cellier`, {
      state: { id: props.id, nom: props.nom },
      replace: true,
    });
  }

  /**
   * Supprime le cellier
   */
  async function fetchSupprimerCellier() {
    await fetch(props.URI + `/cellier/${cellier}/celliers`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setMessageRetour("Suppression effectuée");
        setSeverity("success");
        setOpenAlert(true);
        setTimeout(() => {
          props.fetchCelliers();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(props.error);
      });
  }

  return (
    <>
      <div
        className={
          selection == "fond-selection"
            ? "cellier fond-selection"
            : "cellier fond-normal"
        }
        data-quantite=""
      >
        <div className="cellier--gestion">
          <div
            className="cellier--gestion-container"
            onClick={handleClickCellier}
          >
            <p className="cellier--nom">{props.nom}</p>
          </div>
          <MoreVertIcon
            className="cellier--gestion-dots"
            onClick={gererMenuContextuel}
          />
        </div>
        <div className="cellier--description">
          <p>12 bouteilles</p>
          <p>Valeur totale : 20 000$ </p>
          {/* <p>ID : {props.id}</p> 
          			<p>Id Utilisateur : {props.vino__utilisateur_id}</p> */}
        </div>
        <Menu
          open={menuContextuelOuvert}
          anchorEl={eltAncrage}
          onClose={gererFermerMenuContextuel}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            style: {
              color: "#152440",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#d3d7dd",
              boxShadow: "none",
              border: "0.5px solid #152440",
            },
          }}
        >
		<MenuItem onClick={gererModifier}>Modifier</MenuItem>
		<hr></hr>
		{ props.celliers.length > 1 ?
		<MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
		:
		<MenuItem disabled>Supprimer</MenuItem>
		}
        </Menu>
        <Dialog
          PaperProps={{ sx: { backgroundColor: "#f3f5eb" } }}
          open={frmSuppressionOuvert}
          onClose={viderFermerFrm}
        >
          <DialogTitle>
            {" "}
            Voulez-vous vraiment supprimer ce cellier ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <button onClick={gererSoumettre} className="action">
              Supprimer
            </button>
          </DialogActions>
        </Dialog>
        <Snackbar
          sx={{ height: "100%" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openAlert}
          autoHideDuration={2000}
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
    </>
  );
}
