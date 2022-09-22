import * as React from "react";
import "./BouteilleInventaire.scss";
import { useState, useEffect } from "react";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import placeholderSaq from "./img/png/placeholder-saq.png";
import favoriteIconeLine from "./img/svg/icone_favorite_blue_line.svg";
import favoriteIconeFilled from "./img/svg/icone_favorite_blue_filled.svg";
import Button from "@mui/material/Button";
//
// import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
// import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import ListeInventaire from "./ListeInventaire";
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));


export default function BouteilleInventaire(props) {
  /**
   *  MUI component drawer
   */
   const { window } = props;
   const [open, setOpen] = React.useState(false);
 
   const toggleDrawer = (newOpen) => () => {
     setOpen(newOpen);
     
   };
 
   const container =
     window !== undefined ? () => window().document.body : undefined;
 
   /**
   *  État de la liste d'inventaire
   */
    const [listeInventaire, setListeInventaire] = React.useState([]);

   /**
   * Fectch la liste 
   */
    useEffect(() => {
      fetchListeInventaire();
    }, []);

   /**
    * fetch la liste des inventaires d'une bouteille
    */
  async function fetchListeInventaire() {
    await fetch(props.URI +"/" +"user_id" + "/" + props.user_id +"/" + "vinsInventaire" +"/" + "vin_id" + "/" + props.bouteilleInventaire.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setListeInventaire(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(error);
      });
  }

  /**
   *  État des styles des composants MUI
   */
  const Button = styled(MuiButton)((props) => ({
    color: "#f3f5eb",
    backgroundColor: "#152440",
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

  return (
    <>
      <div className="BouteilleInventaire" data-quantite="">
        <div className="bouteille--gestion">
          <div className="quantite--container">
            <p className="quantite">
              {" "}
              {props.bouteilleInventaire.quantite_total}{" "}
            </p>
          </div>
          <img
            src={
              props.image && props.image.indexOf("pastille_gout") < 0
                ? props.image
                : placeholderSaq
            }
            alt="bouteille"
          />
        </div>
        <div className="bouteille--info-container">
          <div className="bouteille--description">
            <div className="detail--container">
              <div>
                <p className="bouteille--nom">{props.nom} </p>
                <p className="bouteille--info">
                  {props.type} - {props.format} - {props.millesime}
                </p>
              </div>
              <div className="prix--container">
                <p className="prix">
                  Prix total : {props.bouteilleInventaire.prix_total || 0} $
                </p>
                <p className="bouteille--info">
                  <Button onClick={toggleDrawer(true)}>Inventaire</Button>
                </p>
              </div>
            </div>
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
      </div>
     {/* Mui composant drawer  */}
      <Root>
          <CssBaseline />
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: "visible",
              },
            }}
          />
          <SwipeableDrawer
            container={container}
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
              }}
            ></StyledBox>
            <Puller />
            <Typography sx={{ p: 4, color: "text.secondary" }}>
              {" "}
              {listeInventaire.length} celliers{" "}
            </Typography>
            <StyledBox
              sx={{
                px: 2,
                pb: 2,
                height: "100%",
                overflow: "auto",
              }}
            >
              <ListeInventaire 
                 listeInventaire={listeInventaire} 
              />
            </StyledBox>
          </SwipeableDrawer>
        </Root>
        {/* Fin composant drawer */}
    </>
  );
}
