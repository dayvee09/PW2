<<<<<<< HEAD
import "./PiedDePage.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

/**
 * Le pied de page
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function PiedDePage(props) {
	const anneeCourante = new Date().getFullYear();

	return (
	<>
		<div className="PiedDePage">
			<p className="PiedDePage__copyright">
				© Mon Vino {anneeCourante}, Tous droits réservés
			</p>
			<NavLink to="/aide" className="nav-link-help">
				Aide
			</NavLink>
		</div>
	</>
	);
=======
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
>>>>>>> monvino/master
}