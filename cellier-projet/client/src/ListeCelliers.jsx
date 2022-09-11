import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cellier from "./Cellier";
import "./ListeCelliers.scss";
import { useNavigate, useParams, NavLink } from "react-router-dom";

function ListeCelliers(props) {
  let history = useNavigate();

    // Gestion du message de retour après ajout/modification/suppression
  	setTimeout(function() {
		let urlString = window.location.href;
		var url = new URL(urlString);
		var messageRetour = url.searchParams.get("message");
		if(messageRetour != "") {
			document.querySelector('.liste-cellier--message-retour').innerText = messageRetour
		}
	}, 100);
	// Nettoyer le message de retour
	setTimeout(function() {
		document.querySelector('.liste-cellier--message-retour').innerText = "";
	}, 3000);

  if (props.celliers.length > 0) {
    return (
      <>
        <div className="liste-cellier--entete">
            <h1>Mes Celliers</h1>
			<NavLink to="/ajouter-cellier">
           		<button>+ Ajouter</button>
			</NavLink>
        </div>
		<span className="liste-cellier--message-retour"></span>
        <div className="ListeCelliers">
          {props.celliers.map((cellier) => (
            <div key={cellier.id} className="Cellier">
              <Cellier
                {...cellier}
                fetchVins={props.fetchVins}
                celliers={props.celliers}
                cellier={props.cellier}
                setCellier={props.setCellier}
                emailUtilisateur={props.emailUtilisateur}
                gererCellier={props.gererCellier}
                URI={props.URI}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ListeCelliers;