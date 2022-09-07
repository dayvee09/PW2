import "./Admin.scss";

import * as React from "react";
import { useState, useEffect } from "react";
import FrmSaq from "./FrmSaq";

export default function Admin(props) {
  const [nombre, setNombre] = useState(props.nombre);
  const [nombre_p, setNombre_p] = useState(nombre);
  const [page, setPage] = useState(props.page);
  const [page_p, setPage_p] = useState(page);
  const [type, setType] = useState(props.type);
  const [type_p, setType_p] = useState(type);
  const [frmOuvert, setFrmOuvert] = useState(false);

  // ----------------------- Gestion de l'admin ------------------------------------------------

  function gererSaq() {
    setNombre_p(nombre);
    setPage_p(page);
    setType_p(type);
    setFrmOuvert(true);
  }

  function importerSaq(nouveauNombre, nouvellePage, nouveauType) {
    var reg = /^[1-9]+[0-9]*]*$/;
    if (reg.test(nouveauNombre)) {
      setNombre(nouveauNombre);
    }
    fetchSaq(nombre, nouvellePage, nouveauType);
  }

  async function fetchSaq(nouveauNombre, nouvellePage, nouveauType) {
    await fetch(props.URI + "/admin/importer/saq", {
      method: "POST",
      body: JSON.stringify({
        nombre: nouveauNombre,
        page: nouvellePage,
        type: nouveauType,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        props.setBouteilles(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(error);
      });
  }

  return (
    <>
      <h1>Bienvenue sur l'interface d'admin!</h1>
      <div>
        <button onClick={gererSaq}>Importer des bouteilles de la Saq</button>
      </div>
      <FrmSaq
        frmOuvert={frmOuvert}
        setFrmOuvert={setFrmOuvert}
        nombre_p={nombre_p}
        nombre={nombre}
        setNombre={setNombre}
        page={page}
        setPage={setPage}
        page_p={page_p}
        type={type}
        setType={setType}
        type_p={type_p}
        importerSaq={importerSaq}
      />
    </>
  );
}
