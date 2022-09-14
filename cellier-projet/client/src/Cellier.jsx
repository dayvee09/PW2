import "./Cellier.scss";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
	useNavigate,
} from "react-router-dom";

export default function Cellier(props) {
  const [cellier, setCellier] = useState([props.id]);
  const [selection, setSelection] = useState("fond-normal");
  const [eltAncrage, setEltAncrage] = useState(null);
  const menuContextuelOuvert = Boolean(eltAncrage);
  const navigate = useNavigate();

  useEffect(() => {
    props.gererCellier(cellier);
  }, [cellier]);

  const handleChange = () => {
    setCellier(props.id);
    if (selection === "fond-normal") {
      setSelection("fond-selection");
    } else {
      setSelection("fond-normal");
    }
  };

  function gererMenuContextuel(evt) {
    setEltAncrage(evt.currentTarget);
  }

  function gererFermerMenuContextuel() {
    setEltAncrage(null);
  }

  function gererSupprimer() {
	props.supprimerCellier(props.id);
  }

  function gererModifier() {
	navigate(`/modifier-cellier`, { state: {id: props.id, nom: props.nom}, replace: true })
	// props.modifierCellier(props.id, "test");
	// console.log('gerer')
	
  }

  return (
    <>
      <div
        className={
          selection == "fond-selection"
            ? "cellier fond-selection"
            : "cellier fond-normal"
        }
        data-quantite=""
      >
		<div className="cellier--gestion">
			<div className="cellier--gestion-container" onClick={handleChange}>
			{selection == "fond-selection" ? (
				<div className="btn-cellier">
				<NavLink to={`/cellier/${cellier}/vins`}>
					<button>Voir mes bouteilles</button>
				</NavLink>
				</div>
			) : (
				<p className="cellier--nom">{props.nom}</p>
			)}
			</div>
			<MoreVertIcon
				className="cellier--gestion-dots"
				onClick={gererMenuContextuel}
			/>
		</div>
        <div className="cellier--description">
		  <p>bouteille</p>
          <p>Valeur totale : </p>
         <p>ID : {props.id}</p> {/* 
          <p>Id Utilisateur : {props.vino__utilisateur_id}</p> */}
        </div>
        <Menu
          open={menuContextuelOuvert}
          anchorEl={eltAncrage}
          onClose={gererFermerMenuContextuel}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            style: {
              color: "#152440",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#d3d7dd",
              boxShadow: "none",
              border: "0.5px solid #152440",
            },
          }}
        >
          <MenuItem onClick={gererModifier}>Modifier</MenuItem>
          <hr></hr>
          <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
        </Menu>
      </div>
    </>
  );
}