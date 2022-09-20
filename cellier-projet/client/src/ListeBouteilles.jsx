import React, { useEffect, useMemo, useState } from "react";
import "./ListeBouteilles.scss";
import Bouteille from "./Bouteille";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

function ListeBouteilles(props) {
  useEffect(() => {
    props.fetchVins(props.cellier);
  }, []);

for(let i = 0; i < props.celliers.length; i++){
  if(props.celliers[i].id === props.cellier[0]){
	var nomCellier = props.celliers[i].nom
  }
}

const [data, setData] = useState([]);
const [sortType, setSortType] = useState("default");

const sortedData = useMemo(() => {
  let result = data;
  if (sortType === "qt-decroissante") {
	result = [...props.bouteilles].sort((a, b) => {
	  return b.nom.localeCompare(a.nom);
	});
  } else if (sortType === "qt-croissante") {
	result = [...props.bouteilles].sort((a, b) => {
	  return a.nom.localeCompare(b.nom);
	});
  } else if (sortType === "vin-rouge") {
	result = [];
	for (let index = 0; index < props.bouteilles.length; index++) {
	if (props.bouteilles[index]["type"] === "Vin rouge") {
		result.push(props.bouteilles[index])
		console.log(result);
	}
	}
  } else if (sortType === "vin-blanc") {
	result = [];
	for (let index = 0; index < props.bouteilles.length; index++) {
	   if (props.bouteilles[index]["type"] === "Vin blanc") {
		   result.push(props.bouteilles[index])
		   console.log(result);
	   }
	}
  } else if (sortType === "vin-rose") {
	result = [];
	for (let index = 0; index < props.bouteilles.length; index++) {
	   if (props.bouteilles[index]["type"] === "Vin rose") {
		   result.push(props.bouteilles[index])
		   console.log(result);
	   }
	}
  } else {
	result = props.bouteilles;
  }
  return result;
}, [props.bouteilles, sortType]);


  if (props.bouteilles) {
    return (
	<div>
	  <div className="Appli--entete">
			<div className="Appli--tri-container">
				<NavLink to={`/`}>
					<button className="retour">
					<img src={rowIcone} alt="icone-row-left" width={15}></img>Retour&nbsp;aux&nbsp;Celliers&nbsp;
					</button>
				</NavLink>
				<select 
					className="retour" name="tri" id="tri"
					defaultValue="default"
					onChange={(e) => setSortType(e.target.value)}
				>
				<img src={rowIcone} alt="icone-row-down" width={15}></img>
					<option selected value="tout">Tout</option>
					<option value="vin-rouge">Vin Rouge</option>
					<option value="vin-blanc">Vin Blanc</option>
					<option value="vin-rose">Vin Rosé</option>
					<option value="qt-decroissante">Quantité décroissante</option>
					<option value="qt-croissante">Quantité croissante</option>
				</select>
			</div>
	  </div>
	   <div className="Appli--container">
			<h1 className="ListeBouteille--cellier-nom">{nomCellier}</h1>
			<div
				className={
				props.bouteilles.length == 1
					? "ListeBouteilles"
					: "ListeBouteilles--default"
				}
			>
			<div>
			</div>	{props.bouteilles.length > 1 && (
		
			<div className="ListeBouteille--grid">
				{sortedData.map((bouteille, index) => (
				<div key={index}>
					<Bouteille
					{...bouteille}
					fetchVins={props.fetchVins}
					fetchVin={props.fetchVin}
					gererBouteille={props.gererBouteille}
					gererBouteilles={props.gererBouteilles}
					bouteilles={props.bouteilles}
					setBouteilles={props.setBouteilles}
					cellier={props.cellier}
					bouteille={bouteille}
					URI={props.URI}
					error={props.error}
					setError={props.setError}
					fetchUtilisateur={props.sfetchUtilisateur}
					/>
				</div>
				))}
			</div>
			)}
			{props.bouteilles.length == 1 && (
			<div className="Bouteille Bouteille--solo">
				<Bouteille
				{...props.bouteilles[0]}
				fetchVins={props.fetchVins}
				fetchVin={props.fetchVin}
				celliers={props.celliers}
				cellier={props.cellier}
				setCellier={props.setCellier}
				emailUtilisateur={props.emailUtilisateur}
				gererCellier={props.gererCellier}
				gererBouteilles={props.gererBouteilles}
				bouteille={props.bouteilles[0]}
				setBouteilles={props.setBouteilles}
				URI={props.URI}
				fetchUtilisateur={props.sfetchUtilisateur}
				/>
			</div>
			)}
			{props.bouteilles.length == undefined && (
			<div>
				<h2 className="aucune-bouteille">
				Aucune bouteille dans ce cellier.
				</h2>
				<NavLink to="/vins">
				<p className="ListeBouteille--default-button">
					+ Ajouter une bouteille
				</p>
				</NavLink>
			</div>
			)}
		</div>
	  </div>
	</div>
    );
  }
}

export default ListeBouteilles;
