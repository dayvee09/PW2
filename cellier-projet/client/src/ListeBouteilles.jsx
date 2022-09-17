import React, { useEffect } from "react";
import "./ListeBouteilles.scss";
import Bouteille from "./Bouteille";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

function ListeBouteilles(props) {

	useEffect(() => {
	props.fetchVins();
	}, []);

	if (props.bouteilles) {
    return (
        <div className={props.bouteilles.length == 1 ? "ListeBouteilles" : "ListeBouteilles--default" }>
			<div>
				<NavLink to={`/`}>
					<button className="retour">
					<img src={rowIcone} alt="icone-row-left" width={15}></img>Retour
					aux Celliers
					</button>
				</NavLink>
			</div>
			{props.bouteilles.length > 1 &&
			<div className="ListeBouteille--grid">
				{props.bouteilles.map((bouteille) => (
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
				))}
			</div>
			}
			{props.bouteilles.length == 1 &&
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
			}
			{props.bouteilles.length == undefined &&
			<div>
				<h1 className="aucune-bouteille">Pas de bouteilles dans ce cellier</h1>
				<NavLink to="/vins">
					<p>+ Ajouter une bouteille</p>
				</NavLink>
			</div>
			}
		</div>
    );
    }
}

export default ListeBouteilles;