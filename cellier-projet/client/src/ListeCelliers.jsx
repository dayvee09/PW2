import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cellier from "./Cellier";
import { useNavigate, useParams } from "react-router-dom";

function ListeCelliers(props) {
  let history = useNavigate();

  useEffect(() => {
    props.fetchCelliers();
  }, []);

  if (props.celliers.length > 1) {
    return (
      <div className="ListeCelliers">
        {props.celliers["celliers"].map((cellier) => (
          <div className="Cellier">
            <Cellier key={cellier.id} {...cellier} idUtil={props.id} />
          </div>
        ))}
      </div>
    );
  } else if (props.celliers.length > 0) {
    return (
      <div className="ListeCelliers">
        <div className="Cellier">
          <Cellier
            key={props.celliers.id}
            {...props.celliers}
            idUtil={props.id}
          />
        </div>
      </div>
    );
  }
}

export default ListeCelliers;
