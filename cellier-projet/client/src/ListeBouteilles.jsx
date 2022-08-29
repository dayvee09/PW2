import React, { useState, useEffect } from "react";
import Axios from "axios";
import Bouteille from "./Bouteille";
import { useNavigate } from "react-router-dom";

function ListeBouteilles(props) {
  let history = useNavigate();

  useEffect(() => {
    props.fetchVins();
  }, []);
  if (props.bouteilles.length > 1) {
    return (
      <div className="ListeBouteilles">
        {props.bouteilles.map((bouteille) => (
          <div className="Bouteille">
            <Bouteille key={bouteille.id} {...bouteille} />
          </div>
        ))}
      </div>
    );
  }
}

export default ListeBouteilles;
