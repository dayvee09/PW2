import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cellier from "./Cellier";
import "./ListeCelliers.scss";
import { useNavigate, useParams, NavLink } from "react-router-dom";

function ListeCelliers(props) {
  let history = useNavigate();

  if (props.celliers.length > 0) {
    return (
      <>
        <div className="liste-cellier--entete">
          <h1>Mes Celliers</h1>
          <div className="entete--items">
            <div className="entete--item">
              <button>+ Ajouter</button>
            </div>
            {window.location.pathname === "/" && (
              <div className="entete--item">
                {props.utilisateur && props.utilisateur.privilege === "admin" && (
                  <NavLink to={`/admin/${props.emailUtilisateur}`}>
                    <button>Menu Admin</button>
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>
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
