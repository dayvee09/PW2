import "./NavDesktop.scss";
import { Link, NavLink } from 'react-router-dom';
import Logo from "./img/png/logo-bleu.png";
import Image from "./img/svg/icone_profil_blue_line.svg";

export default function NavDesktop({user}) {
	
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
			<NavLink to={`/profil/${user.attributes.email}`}>
				<div className="NavDesktop--container-profil">
					<img
					src={Image}
					alt="icone-profil"
					width={20}
					></img>
					<p>{user.attributes.email}</p>
				</div>
			</NavLink>
		</div>
	</>
	);
}