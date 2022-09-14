import * as React from "react";
import "./FrmAjoutCellier.scss";
import { useNavigate } from "react-router-dom";

function FormAjoutCellier({ celliers, URI, fetchCelliers, setError }) {
  const navigate = useNavigate();

  async function ajouterCellier(cellier) {
    await fetch(URI + `/cellier/ajout/celliers`, {
      method: "POST",
      body: JSON.stringify(cellier),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        fetchCelliers();
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function gererAjoutCellier() {
    let nomCellier = document.getElementById("nomCellier").value;
    let utilisateurId = celliers[0].vino__utilisateur_id;
    if (nomCellier === "") {
      let error = document.querySelector("span");
      error.innerText = "Veuillez entrer un nom de cellier";
      // alert("Veuillez entrer un nom de cellier");
    } else {
      let cellier = {
        nom: nomCellier,
        vino__utilisateur_id: utilisateurId,
      };
      ajouterCellier(cellier);
    }
  }
  return (
    <div className="FormAjoutCellier">
      <h1>Ajouter un cellier</h1>
      <div className="form-ajout--container">
        <label htmlFor="nom">Nom du cellier</label>
        <br></br>
        <input type="text" id="nomCellier" name="nom" placeholder="Nom" />
        <br></br>
        <span></span>
        <br></br>
        <button onClick={gererAjoutCellier}>Ajouter</button>
      </div>
    </div>
  );
}

export default FormAjoutCellier;
