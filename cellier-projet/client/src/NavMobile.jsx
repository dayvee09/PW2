import "./NavMobile.scss";
import * as React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as HomeIcone } from "./img/svg/icone_home_blue_line.svg";
import { ReactComponent as ProfilIcone } from "./img/svg/icone_profil_blue_line.svg";
import { ReactComponent as FavorisIcone } from "./img/svg/icone_favorite_blue_line.svg";
import { ReactComponent as InventaireIcone } from "./img/svg/icone_inventaire_blue_line.svg";
import { ReactComponent as AddBottleIcone } from "./img/svg/add_bottle_blue_filled.svg";

function bottomNavIndexFromPath(pathname) {
	if (pathname === "/vinsInventaire") return 5;
	if (pathname === "/favoris") return 4;
	if (pathname === "/vins") return 2;
	if (pathname.startsWith("/profil/") || pathname.startsWith("/admin/")) return 1;
	if (
		pathname === "/" ||
		pathname === "/PW2/cellier-projet" ||
		pathname.startsWith("/cellier/") ||
		pathname === "/modifier-cellier"
	) {
		return 0;
	}
	return 0;
}

/**
 * Gestion de la navigation en version mobile
 * @date 2022-09-30
 * @param {*} {Auth ...}
 * @returns {*}
 */
export default function NavMobile({
	isAuthenticated,
	emailUtilisateur,
	utilisateur,
	setIndexNav,
	indexNav,
	setResetBottomNav,
	resetBottomNav,
	prefetchVinsInventaire,
	prefetchFavorisId,
}) {
	const location = useLocation();
	const activeIndex = bottomNavIndexFromPath(location.pathname);

	useEffect(() => {
		setIndexNav(activeIndex);
	}, [activeIndex, setIndexNav]);

	// Gestion du reset du BottomNavigation lors de la déconnexion
	useEffect(() => {
		if (!isAuthenticated && resetBottomNav === false) {
			setResetBottomNav(true);
			if (indexNav === 1) {
				setIndexNav(0);
			}
		}
	}, [isAuthenticated, resetBottomNav, indexNav, setResetBottomNav, setIndexNav]);

	return (
	<div>
      <div className={isAuthenticated ? "NavMobile" : "Hidden"}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
		  >
          <BottomNavigation
            className="BottomNav"
            value={activeIndex}
            onChange={() => {}}
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
                component={emailUtilisateur ? Link : "div"}
                to={
                  emailUtilisateur
                    ? `/admin/${encodeURIComponent(emailUtilisateur)}`
                    : undefined
                }
                disabled={!emailUtilisateur}
              />
            ) : (
              <BottomNavigationAction
                label="PROFIL"
                icon={<ProfilIcone />}
                component={emailUtilisateur ? Link : "div"}
                to={
                  emailUtilisateur
                    ? `/profil/${encodeURIComponent(emailUtilisateur)}`
                    : undefined
                }
                disabled={!emailUtilisateur}
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
              onMouseEnter={prefetchFavorisId}
              onFocus={prefetchFavorisId}
            />
            <BottomNavigationAction
              label="INVENTAIRE"
              icon={<InventaireIcone />}
              component={Link}
              to="/vinsInventaire"
              onMouseEnter={prefetchVinsInventaire}
              onFocus={prefetchVinsInventaire}
            />
          </BottomNavigation>
        </AppBar>
      </div>
    </div>
  );
}