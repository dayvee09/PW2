import * as React from "react";
import "./ListeInventaire.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * La liste des celliers qui affiche de différent inventaire d'une bouteille spécifié dans le composant "BouteilleInventaire"
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function ListeInventaire(props) {
	const [idCellier, setIdCellier] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (idCellier > 0) {
			props.gererCellier(idCellier);
			props.fetchVins(idCellier);
			props.fetchNomCellier(idCellier);
			navigate(`/cellier/${idCellier}/vins`, {
			replace: true,
			});
		}
	}, [idCellier]);
	return (
		<List className="ListeInventaire" sx={{ width: "100%" }}>
			{props.listeInventaire.map((chaqueInventaire) => (
			<div className="chaque--inventaire" key={chaqueInventaire.cellier_id}>
				<ListItem
				sx={[
					{
					mr: "150px",
					backgroundColor: "#d3d7dd",
					borderRadius: "4px",
					mb: "10px",
					},
				]}
				onClick={() => setIdCellier(chaqueInventaire.cellier_id)}
				alignItems="center"
				>
				<ListItemAvatar>
					<Avatar
					alt={chaqueInventaire.cellier_nom}
					src="/static/images/avatar/1.jpg"
					/>
				</ListItemAvatar>
				<ListItemText
					className="ListeInventaire--nom-cellier"
					primary={chaqueInventaire.cellier_nom}
				/>
				<ListItemText
					className="ListeInventaire--qt-cellier"
					primary={chaqueInventaire.quantite}
				/>
				</ListItem>
				{/* <Divider variant="inset" component="li" /> */}
			</div>
			))}
		</List>
	);
}