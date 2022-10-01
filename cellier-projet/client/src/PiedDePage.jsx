import "./PiedDePage.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

/**
 * Le pied de page
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function PiedDePage(props) {
	return (
	<>
		<div className="PiedDePage">
		<p><small className="">© Mon Vino 2022, Tous droits réservés</small></p>
		<NavLink to="/aide">
			<p className="nav-link-help">Aide</p>
		</NavLink>
		</div>
	</>
	);
}