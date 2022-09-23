import * as React from "react";
import "./Bouteille.scss";
import FrmBouteille from "./FrmBouteille";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import placeholderSaq from "./img/png/placeholder-saq.png";
import favoriteIconeLine from "./img/svg/icone_favorite_blue_line.svg";
import favoriteIconeFilled from "./img/svg/icone_favorite_blue_filled.svg";

export default function Bouteille(props) {
  /**
   *  API MUI https://mui.com/material-ui/react-snackbar/
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [eltAncrage, setEltAncrage] = useState(null);
  const [contexteModif, setContexteModif] = useState(false);
  const menuContextuelOuvert = Boolean(eltAncrage);
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

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
   *  État de la boite de dialogue de suppression
   */
  const [frmSuppressionOuvert, setFrmSuppressionOuvert] = useState(false);

  /**
   *  État d'affichage de la fiche de bouteille
   */
  const [voirFiche, setVoirFiche] = useState(false);

  /**
   *  État du formulaire de modification
   */
  const [frmOuvert, setFrmOuvert] = useState(false);

  /**
   * État de la bouteille
   */
  const [bouteille, setBouteille] = useState(props.bouteille);

  /**
   *  État de la quantité et la quantité précédente
   */
  const [quantite, setQuantite] = useState(props.quantite);

  /**
   * État de la date d'achat et la date précédente
   */
  const [dateAchat, setDateAchat] = useState(props.date_achat);

  /**
   * État de la date de garde et la date de garde précédente
   */
  const [dateGarde, setDateGarde] = useState(props.garde_jusqua);
  const [messageRetour, setMessageRetour] = useState([]);
  const [severity, setSeverity] = useState([]);

  /**
   * Gestion du menu contextuel d'action d'un cellier
   * @param {*} evt
   */
  function gererMenuContextuel(evt) {
    setEltAncrage(evt.currentTarget);
    if (contexteModif === true) {
      setQuantite(quantite);
    } else {
      setQuantite(props.quantite);
    }
    fetchVinUn();
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
    gererFermerMenuContextuel();
    setFrmSuppressionOuvert(false);
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
    fetchSupprimerBouteille();
  }

  /**
   * Gère l'affichage du formulaire quand click du bouton "Modifier"
   */
  function gererModifier() {
    setFrmOuvert(true);
    gererFermerMenuContextuel();
  }

  /**
   * Gère l'affichage du formulaire quand click du bouton "Fiche"
   */
  function gererVoir() {
    if (contexteModif === true) {
      setQuantite(quantite);
    } else {
      setQuantite(props.quantite);
    }
    fetchVinUn();
    setVoirFiche(true);
    setFrmOuvert(true);
  }

  /**
   * Gère le bouton 'ajouter'
   */
  function gererAjouter() {
    fetchVinUn();
    // setQuantite((quantite) => parseInt(quantite) + 1);
    fetchPutVinUn(parseInt(props.quantite) + 1, dateAchat, dateGarde);
  }

  /**
   * Gère le bouton 'Boire'
   */
  function gererBoire() {
    fetchVinUn();
    if (quantite > 0) {
      // setQuantite((quantite) => parseInt(quantite) - 1);
      fetchPutVinUn(parseInt(props.quantite) - 1, dateAchat, dateGarde);
    } else {
      //   setMessageRetour("En rupture de stock");
      //   setSeverity("error");
      //   setOpenAlert(true);
      setFrmSuppressionOuvert(true);
    }
  }

  /**
   * Gère l'ajout d'une bouteille au favoris
   */
  function gererFavoris(e, idBouteille) {
    let iconeFavoris = document.querySelectorAll(".bouteille--btn-favoris");
    let url = window.location.protocol + "//" + window.location.host;
    let favoriteIconeLineUrl =
      url +
      "/PW2/cellier-projet/static/media/icone_favorite_blue_line.1497cb6ab627fa7efc52a978b1de0507.svg";
    let favoriteIconeFilledUrl =
      url +
      "/PW2/cellier-projet/static/media/icone_favorite_blue_filled.4a820c77bc0a5c4a3f0fb93d65b4a9f6.svg";

    for (let i = 0; i < iconeFavoris.length; i++) {
      if (idBouteille == iconeFavoris[i].id) {
        if (iconeFavoris[i].src == favoriteIconeLineUrl) {
          iconeFavoris[i].src = favoriteIconeFilled;
        } else if (iconeFavoris[i].src == favoriteIconeFilledUrl) {
          iconeFavoris[i].src = favoriteIconeLine;
        }
      }
    }
  }

  /**
   * Gère la modification de la quantité de bouteille
   * @param {*} NouveauQuantite
   */
  function modifierBouteille(
    NouveauQuantite,
    NouveauDateAchat,
    NouveauDateGarde
  ) {
    var reg = /^[1-9]+[0-9]*]*$/;
    if (reg.test(NouveauQuantite)) {
      setQuantite(NouveauQuantite);
    }
    fetchPutVinUn(quantite, NouveauDateAchat, NouveauDateGarde);
  }
  /**
   * Actualiser la quantité du DB
   * @param {*} NouveauQuantite
   */
  async function fetchPutVinUn(
    NouveauQuantite,
    NouveauDateAchat,
    NouveauDateGarde
  ) {
    let reponse = await fetch(
      props.URI +
        "/" +
        "cellier" +
        "/" +
        props.vino__cellier_id +
        "/" +
        "vins" +
        "/" +
        "bouteille" +
        "/" +
        props.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          quantite: NouveauQuantite,
          date_achat: NouveauDateAchat,
          garde_jusqua: NouveauDateGarde,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        props.setChangementBouteille(Math.random());
        fetchVinUn();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // setError(error);
      });
  }
  async function fetchVinUn() {
    await fetch(
      props.URI +
        "/" +
        "cellier" +
        "/" +
        props.vino__cellier_id +
        "/" +
        "vins" +
        "/" +
        "bouteille" +
        "/" +
        props.id
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setContexteModif(true);
        setBouteille(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  /**
   * Supprime le cellier
   */
  async function fetchSupprimerBouteille() {
    await fetch(
      props.URI +
        `/supprimer/${props.id}/vins/cellier/${props.vino__cellier_id}`,
      {
        method: "DELETE",
      }
    )
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
          props.fetchVins(props.vino__cellier_id);
          viderFermerFrm();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(props.error);
      });
  }
  return (
    <>
      <div className="Bouteille" data-quantite="">
        <div className="bouteille--gestion">
          <div className="quantite--container">
            <p className="quantite">
              {/* {" "}
              {contexteModif === true
                ? bouteille.quantite
                : props.quantite}{" "} */}
              {props.quantite}
            </p>
          </div>
          <img
            onClick={gererVoir}
            src={
              props.image && props.image.indexOf("pastille_gout") < 0
                ? props.image
                : placeholderSaq
            }
            alt="bouteille"
          />
          <div data-id="{id_bouteille_cellier}">
            <MoreVertIcon
              className="bouteille--gestion-dots"
              onClick={gererMenuContextuel}
            />
          </div>
        </div>
        <div className="bouteille--info-container">
          <div className="bouteille--description">
            <p className="bouteille--nom">{props.nom} </p>
            <p className="bouteille--info">
              {props.type} - {props.format} - {props.millesime}
            </p>
            <img
              className="bouteille--btn-favoris"
              src={favoriteIconeLine}
              alt="icone-row-left"
              width={20}
              onClick={(e) => gererFavoris(e, props.id)}
              id={props.id}
            ></img>
          </div>
        </div>
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
          <MenuItem onClick={gererAjouter}>Ajouter</MenuItem>
          <MenuItem onClick={gererBoire}>Boire</MenuItem>
          <hr></hr>
          <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
        </Menu>
        <Dialog
          PaperProps={{ sx: { backgroundColor: "#f3f5eb" } }}
          open={frmSuppressionOuvert}
          onClose={viderFermerFrm}
        >
          <DialogTitle>
            {" "}
            Voulez-vous vraiment supprimer cette bouteille ?
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
        <FrmBouteille
          bouteille={bouteille}
          frmOuvert={frmOuvert}
          setFrmOuvert={setFrmOuvert}
          voirFiche={voirFiche}
          setVoirFiche={setVoirFiche}
          bouteille_type={props.type}
          quantite={props.quantite}
          setQuantite={setQuantite}
          dateAchat={dateAchat}
          setDateAchat={setDateAchat}
          dateGarde={dateGarde}
          setDateGarde={setDateGarde}
          modifierBouteille={modifierBouteille}
        />
      </div>
    </>
  );
}
