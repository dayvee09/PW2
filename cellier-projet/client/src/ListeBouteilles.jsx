import React, { useState, useEffect } from "react";
import Axios from "axios";
import Bouteille from "./Bouteille";
import { useNavigate } from "react-router-dom";

function ListeBouteilles(props) {
  let history = useNavigate();

  useEffect(() => {
    props.fetchVins();
  }, []);
  console.log(props);
  if (props.bouteilles.length > 1) {
    return (
      <div className="ListeBouteilles">
        {props.bouteilles["bouteilles"].map((bouteille) => (
          <div className="Bouteille">
            <Bouteille key={bouteille.id} {...bouteille} />
          </div>
        ))}
      </div>
    );
  } else if (props.bouteilles.length > 0) {
    return (
      <div className="ListeBouteilles">
        <div className="Bouteille">
          <Bouteille key={props.bouteilles.id} {...props.bouteilles} />
        </div>
      </div>
    );
  }
}

export default ListeBouteilles;
