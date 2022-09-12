import "./PiedDePage.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function PiedDePage(props) {
  return (
    <>
      <div className="PiedDePage">
    	<p><small className="">© Mon Vino 2022, Tous droits réservés</small></p>
		    <NavLink to="/">
        	<p className="nav-link-help">Aide</p>
        </NavLink>
      </div>
    </>
  );
}
