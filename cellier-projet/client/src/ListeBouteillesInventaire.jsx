import "./ListeBouteillesInventaire.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_search_bar_white.svg";
import BouteilleInventaire from "./BouteilleInventaire";


function ListeBouteillesInventaire(props) {
  
	/**
	 * Fetch la liste de tous les bouteilles dans tout différentes celliers
	 */
	useEffect(() => {
	  props.fetchVinsInventaire();
	}, []);
console.log(props.bouteillesInventaire.length)
	return (
		<>
			<div className="Appli--entete">
			<div className="Appli--search-bar-container">
				<input
				className="Appli--search-bar"
				placeholder="Trouver une bouteille"
				/>
				<div className="Appli--search-bar-icone">
				<img
					className="Appli--search-bar-icone-search"
					src={rowIcone}
					alt="icone-row-left"
					width={15}
				></img>
				</div>
			</div>
			</div>
			<div className="Appli--container">
				<div className="liste-cellier--entete">
					<h1>Mon Inventaire de Bouteilles</h1>
				</div>
				<span className="liste-cellier--message-retour"></span>
				{props.bouteillesInventaire.length > 0 && (

				<div className="ListeBouteillesInventaire">
					{props.bouteillesInventaire.map((bouteilleInventaire) => (
					<div key={bouteilleInventaire.id} >
						<BouteilleInventaire
						{...bouteilleInventaire}
						bouteilleInventaire={bouteilleInventaire}
						setBouteilleInventaire={props.setBouteillesInventaire}
						fetchVinsInventaire={props.fetchVinsInventaire}
						user_id={props.user_id}
						emailUtilisateur={props.emailUtilisateur}
						URI={props.URI}
						/>
					</div>
					))}
				</div>
				)}
				{props.bouteillesInventaire.length == undefined && (
					<div className="ListeBouteillesInventaire" >
						<p>Aucune bouteille dans l'inventaire</p>
					</div>
				)}
			</div>
		</>
	)
}

export default ListeBouteillesInventaire;