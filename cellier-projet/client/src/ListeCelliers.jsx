import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cellier from "./Cellier";
import { useNavigate, useParams } from "react-router-dom";

function ListeCelliers(props) {
  let history = useNavigate();

  useEffect(() => {
    props.fetchCelliers();
  }, []);
  if (props.celliers.length > 0) {
    return (
      <div className="ListeCelliers">
        {props.celliers.map((cellier) => (
          <div className="Cellier">
            <Cellier
              key={cellier.id}
              {...cellier}
              fetchVins={props.fetchVins}
              celliers={props.celliers}
              cellier={props.cellier}
              setCellier={props.setCellier}
              emailUtilisateur={props.emailUtilisateur}
              gererCellier={props.gererCellier}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ListeCelliers;
