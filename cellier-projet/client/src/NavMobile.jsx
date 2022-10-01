import "./NavMobile.scss";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as HomeIcone } from "./img/svg/icone_home_blue_line.svg";
import { ReactComponent as ProfilIcone } from "./img/svg/icone_profil_blue_line.svg";
import { ReactComponent as FavorisIcone } from "./img/svg/icone_favorite_blue_line.svg";
import { ReactComponent as InventaireIcone } from "./img/svg/icone_inventaire_blue_line.svg";
import { ReactComponent as AddBottleIcone } from "./img/svg/add_bottle_blue_filled.svg";

/**
 * Gestion de la navigation en version mobile
 * @date 2022-09-30
 * @param {*} {Auth ...}
 * @returns {*}
 */
export default function NavMobile({
	Auth,
	emailUtilisateur,
	utilisateur,
	setIndexNav,
	indexNav,
	setResetBottomNav,
	resetBottomNav
}) {
  	// état du BottomNavigation
	const [value, setValue] = useState(indexNav);

    useEffect(() => {
	  setIndexNav(value);
	}, [value]);

	// Gestion du reset du BottomNavigation lors de la déconnexion
	if(Auth.user == null ) {
		if(resetBottomNav == false) {
			setResetBottomNav(true);
			if(value == 1) {
				setIndexNav(0)
				setValue(0);
			}
		}
	}

	return (
	<div>
      <div className={Auth.user ? "NavMobile" : "Hidden"}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
		  >
          <BottomNavigation
            className="BottomNav"
            value={indexNav}
            onChange={(event, newValue) => {
				setValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction
              className="IconeHome"
              label="ACCUEIL"
              icon={<HomeIcone />}
              component={Link}
              to="/"
            />
            {utilisateur && utilisateur.privilege === "admin" ? (
              <BottomNavigationAction
                label="ADMIN"
                icon={<ProfilIcone />}
                component={Link}
                to={`/admin/${emailUtilisateur}`}
              />
            ) : (
              <BottomNavigationAction
                label="PROFIL"
                icon={<ProfilIcone />}
                component={Link}
                to={`/profil/${emailUtilisateur}`}
              />
            )}
            <BottomNavigationAction
              className="AddBottleIcone"
              icon={<AddBottleIcone />}
              component={Link}
              to={`/vins`}
			  aria-label="bouton-ajouter-bouteille"
            />
            <BottomNavigationAction className="disabledIcone" disabled={true} aria-label="bouton-ajouter-bouteille"/>
            <BottomNavigationAction
              label="FAVORIS"
              icon={<FavorisIcone />}
              component={Link}
              to="/favoris"
            />
            <BottomNavigationAction
              label="INVENTAIRE"
              icon={<InventaireIcone />}
              component={Link}
              to="/vinsInventaire"
            />
          </BottomNavigation>
        </AppBar>
      </div>
    </div>
  );
}