import "./NavDesktop.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./img/png/logo-bleu.png";
import AddBottleImage from "./img/svg/add_bottle_blue_filled.svg";
import Image from "./img/svg/icone_profil_blue_line.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

/**
 * Gestion de la navigation principale en version desktop (menu déroulant)
 * @date 2022-09-30
 * @param {*} {user ...}
 * @returns {*}
 */
export default function NavDesktop({
	user,
	gererSignOut,
	utilisateur,
	username,
}) {
	const [eltAncrage, setEltAncrage] = useState(null);
	const menuContextuelOuvert = Boolean(eltAncrage);
	const navigate = useNavigate();

	function gererMenuContextuel(evt) {
		setEltAncrage(evt.currentTarget);
	}

	function gererFermerMenuContextuel() {
		setEltAncrage(null);
	}

	const redirectionAccueil = function () {
		gererSignOut();
		const timer = setTimeout(() => {
			navigate("/", { replace: true });
		}, 2000);
		return () => clearTimeout(timer);
	};
  return (
    <>
      <div className="NavDesktop">
        <NavLink to="/">
          <img className="logo" src={Logo} alt="logo-mon-vino"></img>
        </NavLink>
        <div className="actionMenu">
          <NavLink to="/vins">
            <img
              className="iconeAddBottle"
              src={AddBottleImage}
              alt="bouton-ajouter-bouteille"
            ></img>
          </NavLink>
          <div
            className="navDesktop--container-profil"
            onClick={gererMenuContextuel}
          >
            <img src={Image} alt="icone-profil" width={20}></img>
            <p>{username}</p>
          </div>
        </div>
        <Menu
          open={menuContextuelOuvert}
          anchorEl={eltAncrage}
          onClose={gererFermerMenuContextuel}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            style: {
              color: "#152440",
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: -10,
              backgroundColor: "#d3d7dd",
              boxShadow: "none",
              border: "0.5px solid #152440",
            },
          }}
        >
          {utilisateur && utilisateur.privilege === "admin" ? (
            <MenuItem
              onClick={gererFermerMenuContextuel}
              component={Link}
              to={`/admin/${user.attributes.email}`}
            >
              <span>Menu Admin</span>
            </MenuItem>
          ) : (
            <MenuItem
              onClick={gererFermerMenuContextuel}
              component={Link}
              to={`/profil/${user.attributes.email}`}
            >
              <span>Mon Profil</span>
            </MenuItem>
          )}
          <MenuItem
            onClick={gererFermerMenuContextuel}
            component={Link}
            to={`/`}
          >
            <span>Mes Celliers</span>
          </MenuItem>
          <MenuItem
            onClick={gererFermerMenuContextuel}
            component={Link}
            to={`/favoris`}
          >
            <span>Mes Favoris</span>
          </MenuItem>

		  <MenuItem
            onClick={gererFermerMenuContextuel}
            component={Link}
            to={`/vinsInventaire`}
          >
            <span>Mon Inventaire</span>
          </MenuItem>
          <hr></hr>
          <MenuItem>
            <span onClick={redirectionAccueil}>Déconnexion</span>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}