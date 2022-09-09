import "./NavMobile.scss";
import * as React from "react";
import { Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as HomeIcone } from "./img/svg/icone_home_blue_line.svg";
import { ReactComponent as ProfilIcone } from "./img/svg/icone_profil_blue_line.svg";
import { ReactComponent as FavorisIcone } from "./img/svg/icone_favorite_blue_line.svg";
import { ReactComponent as AideIcone } from "./img/svg/icone_help_blue_line.svg";
import { ReactComponent as AddBottleIcone } from "./img/svg/add_bottle_blue_filled.svg";

export default function NavMobile({Auth, emailUtilisateur}) {
    // état du BottomNavigation
	const [value, setValue] = React.useState(0);
	
	return (
	<div>
	  <div className={Auth.user ? "NavMobile" : "Hidden"}>
	  	<AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
			<BottomNavigation
				className="BottomNav"
				value={value}
				onChange={(event, newValue) => {
				setValue(newValue);
				// console.log(event.target.svg);
				}}
				showLabels
			>
				<BottomNavigationAction label="ACCUEIL" icon={<HomeIcone />} component={Link} to="/" />
				<BottomNavigationAction label="PROFIL" icon={<ProfilIcone />} component={Link} to={`/profil/${emailUtilisateur}`}/>
				<BottomNavigationAction
				className="AddBottleIcone"
				icon={<AddBottleIcone />}
				component={Link} 
				to={`/vins`}
				/>
				<BottomNavigationAction disabled={true} />
				<BottomNavigationAction label="FAVORIS" icon={<FavorisIcone />} component={Link} to="." />
				<BottomNavigationAction label="AIDE" icon={<AideIcone />} component={Link} to="." />
			</BottomNavigation>
		</AppBar>
	  </div>
	  </div>
	);
}