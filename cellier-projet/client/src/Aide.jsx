import "./Aide.scss";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import etape1 from "./img/png/etape1.png";
import etape2 from "./img/png/etape2.png";
import etape3 from "./img/png/etape3.png";

/**
 * Gestion de la fonction 'Aide' 
 * 
 * Contenant l'affichage des principales fonctionnalités du site ainsi qu’un lien pour pouvoir contacter l’administration du site
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
function Aide(props) {
    return (
      <div className="Aide">
		<div className="Appli--entete">
		</div>
		<div className="Appli--container">
			<div className="Aide--fonctionnement-container">
				<h1>Fonctionnement</h1>
				<div className="Aide--fonctionnement-grid">
					<div className="Aide--fonctionnement-grid-tile">
						<div>
							<h2><AddLocationRoundedIcon  style={{ color: '#f1ab50', width: '15px', marginRight: '10px' }} />Créer votre cellier</h2>
							<img
								src={etape1}
								width="85"
								height="50"
								alt="logo-mon-vino"
							></img>
						</div>
						<div>
							<p>Ajouter un nouveau cellier ou modifier le nom du cellier par défaut dans la page d'accueil.</p>
						</div>
					</div>
					<div className="Aide--fonctionnement-grid-tile">
						<div>
							<h2><DownloadRoundedIcon  style={{ color: '#f1ab50', width: '15px', marginRight: '10px' }}/>Importer ou créer une bouteille</h2>
							<img
								src={etape2}
								width="85"
								height="50"
								alt="logo-mon-vino"
							></img>
						</div>
						<div>
							<p>
								Vous pouvez ajouter une bouteille à partir de n'importe où sur l'application.
								Accéder au formulaire d'ajout et choisissez l'importation ou la création d'une bouteille personnalisée. 
								Entrez les informations requises et sélectionnez le cellier de votre choix.
							</p>
						</div>
					</div>
					<div className="Aide--fonctionnement-grid-tile">
						<div>
							<h2><SettingsRoundedIcon style={{ color: '#f1ab50', width: '15px', marginRight: '10px' }}/>Gérer et consulter facilement vos celliers</h2>
							<img
								src={etape3}
								width="85"
								height="50"
								alt="logo-mon-vino"
							></img>
						</div>
						<div>
							<p>
								Accèder à la page d'accueil pour gérer l'ensemble de vos celliers.
								Cliquez sur votre cellier pour accèder à celui-ci.
								Consultez vos stock de bouteilles contenu dans tout les celliers sur la page Inventaire.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="Aide--second-section">
				<div className="">
					<h1>Questions fréquentes</h1>
					<div className="Aide--accordion">
					<Accordion disableGutters elevation={0} className="Aide--accordion-item">
						<AccordionSummary
						expandIcon={<ExpandMoreIcon style={{ color: '#f1ab50', height: "20px", width: "20px" }}/>}
						aria-controls="faq-panel1-content"
						id="faq-panel1-header"
						>
						<Typography>Comment créer ou modifier un cellier ?</Typography>
						</AccordionSummary>
						<AccordionDetails>
						<Typography>
							Sur la page d'accueil, ajoutez un nouveau cellier ou modifiez le nom du cellier par défaut.
							Pour renommer un cellier existant, ouvrez-le puis utilisez l'option de modification du nom.
						</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion disableGutters elevation={0} className="Aide--accordion-item">
						<AccordionSummary
						expandIcon={<ExpandMoreIcon style={{ color: '#f1ab50', height: "20px", width: "20px" }}/>}
						aria-controls="faq-panel2-content"
						id="faq-panel2-header"
						>
						<Typography>Comment ajouter une bouteille à mon cellier ?</Typography>
						</AccordionSummary>
						<AccordionDetails>
						<Typography>
							Depuis n'importe quelle page, accédez au formulaire d'ajout de bouteille.
							Choisissez d'importer une bouteille du catalogue ou d'en créer une personnalisée,
							remplissez les informations requises, puis sélectionnez le cellier de destination.
						</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion disableGutters elevation={0} className="Aide--accordion-item">
						<AccordionSummary
						expandIcon={<ExpandMoreIcon style={{ color: '#f1ab50', height: "20px", width: "20px" }}/>}
						aria-controls="faq-panel3-content"
						id="faq-panel3-header"
						>
						<Typography>Où consulter toutes mes bouteilles ?</Typography>
						</AccordionSummary>
						<AccordionDetails>
						<Typography>
							La page Inventaire regroupe toutes les bouteilles présentes dans vos celliers.
							Utilisez l'onglet Inventaire dans le menu de navigation pour y accéder rapidement.
						</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion disableGutters elevation={0} className="Aide--accordion-item">
						<AccordionSummary
						expandIcon={<ExpandMoreIcon style={{ color: '#f1ab50', height: "20px", width: "20px" }}/>}
						aria-controls="faq-panel4-content"
						id="faq-panel4-header"
						>
						<Typography>Comment modifier mon profil ou réinitialiser mon mot de passe ?</Typography>
						</AccordionSummary>
						<AccordionDetails>
						<Typography>
							Rendez-vous dans la page Profil pour mettre à jour vos informations personnelles.
							Pour réinitialiser votre mot de passe, utilisez l'option « Mot de passe oublié »
							sur l'écran de connexion.
						</Typography>
						</AccordionDetails>
					</Accordion>
					</div>
					<div className="Aide--contact-container">
						<p>Besoin de plus de renseignements ?<br></br> Contactez-nous et nous vous répondrons dans les plus bref délais.</p>
						<a className="Aide--contact" href="mailto:assistance.monvino@gmail.com">assistance.monvino@gmail.com</a>
					</div>
				</div>
			</div>
		</div>
	</div>
    );
}

export default Aide;