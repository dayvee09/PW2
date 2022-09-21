import "./Admin.scss";

import * as React from "react";
import { useState, useEffect } from "react";
import FrmSaq from "./FrmSaq";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

export default function Admin(props) {
  const [nbBouteillesSaq, setNbBouteillesSaq] = useState([]);
  const [go, setGo] = useState(false);
  const [prevGo, setPrevGo] = useState(false);
  const [compteur, setCompteur] = useState(0);
  const [frmOuvert, setFrmOuvert] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertLoading, setOpenAlertLoading] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const handleCloseAlertLoading = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertLoading(false);
  };
  const navigate = useNavigate();

  // ----------------------- Gestion de l'admin ------------------------------------------------

  function gererSaq() {
    setFrmOuvert(true);
  }

  useEffect(() => {
    if (go) {
      fetchNbVinsSaq(go);
    }
  }, [go]);

  useEffect(() => {
    if (nbBouteillesSaq) {
      let nbPages = Math.ceil(nbBouteillesSaq / 96);
      for (let i = 0; i <= nbPages; i++) {
        fetchSaq(96, i, go);
      }
      switch (go) {
        case "rouge": {
          setCompteur(compteur + nbBouteillesSaq);
          setGo("blanc");
          setPrevGo("rouge");
          break;
        }
        case "blanc": {
          setCompteur(compteur + nbBouteillesSaq);
          setGo("rose");
          setPrevGo("blanc");
          break;
        }
        case "rose": {
          setCompteur(compteur + nbBouteillesSaq);
          setGo(false);
          setPrevGo("rosé");
          setOpenAlertLoading(false);
          setOpenAlert(true);
          break;
        }
      }
    }
  }, [nbBouteillesSaq]);

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
      .then((data) => {})
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(error);
      });
  }

  async function fetchNbVinsSaq(type) {
    await fetch(props.URI + `/admin/${type}/saq`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setNbBouteillesSaq(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(error);
      });
  }

  const redirectionAccueil = function () {
    props.gererSignOut();
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  };
  return (
    <>
      <div className="Appli--container">
        <div className="Admin">
          <div className="deconnexion-admin" onClick={redirectionAccueil}>
            Déconnexion
          </div>
          <div className="content-admin">
            <h1>Bienvenue sur l'interface d'admin!</h1>
            <div>
              <button className="importer-admin" onClick={gererSaq}>
                Importer des bouteilles de la Saq
              </button>
            </div>
          </div>
          <Snackbar
            sx={{ height: "100%" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="success"
              sx={{ width: "100%" }}
            >
              L'importation des bouteilles de vin de la SAQ a été faite avec
              succès!
            </Alert>
          </Snackbar>
          <Snackbar
            sx={{ height: "100%" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={openAlertLoading}
            onClose={handleCloseAlertLoading}
          >
            <Alert
              onClose={handleCloseAlertLoading}
              severity="success"
              sx={{ width: "100%" }}
            >
              <p>Importation en cours, veuillez patienter.</p>
              {nbBouteillesSaq < 1 ? (
                <p className="contenu--alert">Initialisation...</p>
              ) : (
                <div>
                  <p className="contenu--alert">
                    Chargement de {nbBouteillesSaq} bouteilles de vin {prevGo}
                    ...
                  </p>
                  <p className="contenu--alert">
                    Bouteilles importées au total: {compteur}
                  </p>
                </div>
              )}
            </Alert>
          </Snackbar>
          <FrmSaq
            go={go}
            setGo={setGo}
            frmOuvert={frmOuvert}
            setFrmOuvert={setFrmOuvert}
            setOpenAlertLoading={setOpenAlertLoading}
          />
        </div>
      </div>
    </>
  );
}
