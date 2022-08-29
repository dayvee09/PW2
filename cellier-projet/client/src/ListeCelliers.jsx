import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cellier from "./Cellier";
import { useNavigate, useParams } from "react-router-dom";

function ListeCelliers(props) {
  let history = useNavigate();

  useEffect(() => {
    props.fetchCelliers();
  }, []);
  console.log(props);
  if (props.celliers.length > 0) {
    return (
      <div className="ListeCelliers">
        {props.celliers.map((cellier) => (
          <div className="Cellier">
            <Cellier
              key={cellier.id}
              {...cellier}
              fetchVins={props.fetchVins}
              cellier={props.cellier}
              setCellier={props.setCellier}
              celliers={props.celliers}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ListeCelliers;
