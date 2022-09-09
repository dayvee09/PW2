import "./NavDesktop.scss";
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import Logo from "./img/png/logo-bleu.png";
import Image from "./img/svg/icone_profil_blue_line.svg";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NavDesktop({user, gererSignOut}) {
	const [eltAncrage, setEltAncrage] = useState(null);
	const menuContextuelOuvert = Boolean(eltAncrage);

	function gererMenuContextuel(evt) {
		setEltAncrage(evt.currentTarget);
		console.log("test")
	}

	function gererFermerMenuContextuel() {
		setEltAncrage(null);
	}
	
	return (
	<>
		<div className="NavDesktop">
			<NavLink to="/" >
			<img
				className="logo"
				src={Logo}
				alt="logo-mon-vino"
			></img>
			</NavLink>
			<div className="NavDesktop--container-profil" onClick={gererMenuContextuel}>
				<img
				src={Image}
				alt="icone-profil"
				width={20}
				></img>
				<p>{user.attributes.email}</p>
			</div>
		</div>
		<Menu
        open={menuContextuelOuvert}
        anchorEl={eltAncrage}
        onClose={gererFermerMenuContextuel}
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{vertical: 'top', horizontal: 'left'}}
		PaperProps={{
			style: {
			 color: '#152440',
			 paddingLeft: 10,
			 paddingRight: 10,
			 marginTop: -10,
			 backgroundColor: '#d3d7dd',
			 boxShadow: 'none',
			 border: '0.5px solid #152440',
			},
		}}
      >
        <MenuItem component={Link} to={`/profil/${user.attributes.email}`}><span>Mon Profil</span></MenuItem>
		<hr></hr>
		<MenuItem component={Link} to={`/`}><span>Mes Celliers</span></MenuItem>
		<hr></hr>
        <MenuItem><span onClick={gererSignOut}>Déconnexion</span></MenuItem>
      </Menu>
	</>
	);
}