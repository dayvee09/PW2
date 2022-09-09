import "./Cellier.scss";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { generateRandomString } from "@aws-amplify/core";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { fontFamily, typography } from "@mui/system";
import { red } from "@mui/material/colors";

export default function Cellier(props) {
  const [cellier, setCellier] = useState([props.id]);
  const [selection, setSelection] = useState("fond-normal");
  const [eltAncrage, setEltAncrage] = useState(null);
  const menuContextuelOuvert = Boolean(eltAncrage);

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
	console.log("test")
  }

  function gererFermerMenuContextuel() {
    setEltAncrage(null);
  }

  return (
    <>
	<div onClick={handleChange}
		className={
		selection == "fond-selection"
			? "cellier fond-selection"
			: "cellier fond-normal"
		}
		data-quantite=""
	>
		<div className="cellier--gestion">
			{selection == "fond-selection" ? (
				<div className="btn-cellier">
				<NavLink to={`/cellier/${cellier}/vins`}>
					<button>Voir mes bouteilles</button>
				</NavLink>
				</div>
			) : (
				<p className="cellier--nom">{props.nom}</p>
			)}
			<MoreVertIcon className="cellier--gestion-dots" onClick={gererMenuContextuel} />
		</div>
		<div className="cellier--description">
			<p>ID : {props.id}</p>
			<p>Id Utilisateur : {props.vino__utilisateur_id}</p>
		</div>
	</div>
	<Menu
        open={menuContextuelOuvert}
        anchorEl={eltAncrage}
        onClose={gererFermerMenuContextuel}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
		PaperProps={{
			style: {
			 color: '#152440',
			 paddingLeft: 10,
			 paddingRight: 10,
			 backgroundColor: '#d3d7dd',
			 
			},
		}}
      >
        <MenuItem>Modifier</MenuItem>
		<hr></hr>
        <MenuItem>Supprimer</MenuItem>
      </Menu>
    </>
  );
}



{/* <div
onClick={handleChange}
className={
  selection == "fond-selection"
	? "cellier fond-selection"
	: "cellier fond-normal"
}
data-quantite=""
>
<div className="description">
  <div className="description-originale">
	{selection == "fond-selection" ? (
	  <div className="btn-cellier">
		<NavLink to={`/cellier/${cellier}/vins`}>
		  <button>Voir mes bouteilles</button>
		</NavLink>
		<div>
		  <button>Modifier mon cellier</button>
		</div>
	  </div>
	) : (
	  <div>
		<MoreVertIcon />
		<p className="id">ID : {props.id}</p>
		<p className="nom">Nom : {props.nom}</p>
		<p className="vino__utilisateur_id">
		  Id Utilisateur : {props.vino__utilisateur_id}
		</p>
	  </div>
	)}
  </div>
</div>
</div> */}