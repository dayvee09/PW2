import * as React from "react";
import "./BouteilleInventaire.scss";
import { useState, useEffect } from "react";
import MuiButton from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import placeholderSaq from "./img/png/placeholder-saq.png";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import ListeInventaire from "./ListeInventaire";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ComponentPropsToStylePropsMap } from "@aws-amplify/ui-react";
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  //   height: "100%",
  //   backgroundColor:
  //     theme.palette.mode === "light"
  //       ? grey[100]
  //       : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const Puller = styled(Box)(({ theme }) => ({
	width: 6,
	height: 50,
	backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
	borderRadius: 4,
	position: "absolute",
	right: 8,
	bottom: "calc(50% - 15px)",
}));

/**
 * La tuile de l'inventaire de bouteille qui fait partie de la liste de l'inventaire de bouteille
 * 
 * Permet à l'utilisateur de consulter les stocks de la bouteille en cliquant le boutton 
 * Contenant le composant de la liste des celliers dans lequel cette bouteille se trouve 
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function BouteilleInventaire(props) {
	/**
	 *  MUI component drawer
	 */
	const { window } = props;
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const container =
	window !== undefined ? () => window().document.body : undefined;

	const theme = useTheme();

	/**
	 *  État de la liste d'inventaire
	 */
	const [listeInventaire, setListeInventaire] = React.useState([]);

	/**
	 *  État des styles des composants MUI
	 */
	const Button = styled(MuiButton)((props) => ({
		color: "#f3f5eb",
		backgroundColor: "#152440",
		textDecoration: "none",
		borderRadius: "4px",
		fontFamily: "Alata",
		fontSize: "12px",
		padding: "10px 20px",
		"&:hover": {
			backgroundColor: "#f1ab50",
			color: "#152440",
		},
	}));

	/**
	 * Fectch la liste
	 */
	useEffect(() => {
		fetchListeInventaire();
	}, []);

	/**
	 * fetch la liste des inventaires d'une bouteille
	 */
	async function fetchListeInventaire() {
		await fetch(
			props.URI +
			"/" +
			"user_id" +
			"/" +
			props.user_id +
			"/" +
			"vinsInventaire" +
			"/" +
			"vin_id" +
			"/" +
			props.bouteilleInventaire.id
		)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw response;
		})
		.then((data) => {
			setListeInventaire(data);
		})
		.catch((error) => {
			console.erro("Error fetching data: ", error);
			props.setError(error);
		});
	}

	return (
	<>
		<div className="BouteilleInventaire" data-quantite="">
		<div className="bouteille--gestion">
			<div className="quantite--container">
			<p className="quantite">
				{" "}
				{props.bouteilleInventaire.quantite_total}{" "}
			</p>
			</div>
			<img
			src={
				props.image && props.image.indexOf("pastille_gout") < 0
				? props.image
				: placeholderSaq
			}
			alt="bouteille"
			/>
		</div>
		<div className="bouteille--info-container">
			<div className="bouteille--description">
			<div className="detail--container">
				<div>
				<div className="bouteille--nom--wrapper">
					<p className="bouteille--nom">{props.nom}</p>
				</div>
				<p className="bouteille--info">
					{props.type} - {props.format} - {props.millesime}
				</p>
				</div>
			</div>
			<hr></hr>
			<div className="prix--container">
				<p className="prix">
				Valeur&nbsp;totale&nbsp;:&nbsp;
				{props.bouteilleInventaire.prix_total
					? parseFloat(props.bouteilleInventaire.prix_total).toFixed(2)
					: 0 || 0}
				&nbsp;$
				</p>
			</div>
			<p className="bouteille--info">
				<button className="action" onClick={toggleDrawer(true)}>
				Consulter les stocks
				</button>
			</p>
			</div>
		</div>
		</div>
		{/* Mui composant drawer  */}
		<Root>
		{/* <CssBaseline /> */}
		{/* <Global
			styles={{
				".MuiDrawer-root > .MuiPaper-root": {
				height: `calc(50% - ${drawerBleeding}px)`,
				overflow: "visible",
				},
			}}
			/> */}
		<SwipeableDrawer
			container={container}
			anchor="left"
			open={open}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
			swipeAreaWidth={drawerBleeding}
			disableSwipeToOpen={true}
			ModalProps={{
			keepMounted: true,
			}}
		>
			<StyledBox
			sx={{
				position: "absolute",
				top: -drawerBleeding,
				borderTopLeftRadius: 8,
				borderTopRightRadius: 8,
				visibility: "visible",
				right: 0,
				left: 0,
			}}
			></StyledBox>
			<Puller />
			<DrawerHeader>
			<IconButton onClick={toggleDrawer(false)}>
				{theme.direction === "ltr" ? (
				<ChevronLeftIcon />
				) : (
				<ChevronRightIcon />
				)}
			</IconButton>
			</DrawerHeader>
			<Divider />
			<Typography
			sx={{
				p: 4,
				color: "text.secondary",
				fontFamily: "raleway",
				fontSize: "12px",
			}}
			>
			Cette bouteille est dans {listeInventaire.length} de vos celliers{" "}
			</Typography>
			<StyledBox
			sx={{
				px: 2,
				pb: 2,
				height: "100%",
				overflow: "auto",
			}}
			>
			<ListeInventaire
				listeInventaire={listeInventaire}
				cellier={props.cellier}
				setOpen={setOpen}
				fetchVins={props.fetchVins}
				fetchNomCellier={props.fetchNomCellier}
				gererCellier={props.gererCellier}
			/>
			</StyledBox>
		</SwipeableDrawer>
		</Root>
		{/* Fin composant drawer */}
	</>
	);
}
