import * as React from "react";
import { Auth } from "aws-amplify";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AppBar from "@mui/material/AppBar";
import { ReactComponent as HomeIcone } from "./img/svg/icone_home_blue_line.svg";
import { ReactComponent as ProfilIcone } from "./img/svg/icone_profil_blue_line.svg";
import { ReactComponent as FavorisIcone } from "./img/svg/icone_favorite_blue_line.svg";
import { ReactComponent as AideIcone } from "./img/svg/icone_help_blue_line.svg";
import { ReactComponent as AddBottleIcone } from "./img/svg/add_bottle_blue_filled.svg";
import "./NavMobile.scss";

export default function NavMobile({Auth}) {

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
				}}
				showLabels
			>
				<BottomNavigationAction label="ACCUEIL" icon={<HomeIcone />} />
				<BottomNavigationAction label="PROFIL" icon={<ProfilIcone />} />
				<BottomNavigationAction
				className="AddBottleIcone"
				icon={<AddBottleIcone />}
				/>
				<BottomNavigationAction disabled={true} />
				<BottomNavigationAction label="FAVORIS" icon={<FavorisIcone />} />
				<BottomNavigationAction label="AIDE" icon={<AideIcone />} />
			</BottomNavigation>
		</AppBar>
	  </div>
	  </div>
	);
}
  