import "./FrmAjoutBouteille.scss";
import * as React from "react";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import BtnGroup from "./ToggleBtn";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import DateSelecteur from "./DateSelecteur";
import DateSelecteurAnnee from "./DateSelecteurAnnee";
import moment from "moment";
import placeholderSaq from "./img/png/placeholder-saq.png";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import rowIcone from "./img/svg/icone_row_left_white_filled.svg";

/**
 * Gestion de l'ajout d'une bouteille importé de la SAQ et l'ajout d'une bouteille 'non listée'
 *
 * Contenant la foncition de l'autocomplete, la gestion de la formulaire, la gestion des états
 * ainsi que la lecture et le stockage des données en utilisant 'fetch'
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function FrmAjoutBouteille(props) {
  /**
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = React.useState(false);
  /**
   * L‘état de message d'erreur
   */
  const [messageErr, setMessageErr] = React.useState("");
  /**
   * État de bouton, false- importer , true- créer
   */
  const [btnState, setBtnState] = useState(false);

  /**
   * État de l'erreur du formulaire
   */
  const [erreur, setErreur] = React.useState([]);
  /**
   * État de la liste de bouteille
   */
  const [vinsListe, setVinsListe] = React.useState([]);
  /**
   * État de la valeur choisi du composant 'Autocomplete'
   */
  const [value, setValue] = React.useState([]);

  /**
   * État du type de bouteille
   */
  const [vinType, setVinType] = React.useState("1");
  /**
   * État du cellier choisi
   */
  const [vinCellier, setVinCellier] = React.useState(
    props.cellier != undefined
      ? parseInt(props.cellier)
      : parseInt(props.celliers[0].id)
  );
  /**
   * État de la quantité choisie
   */
  const [vinQuantite, setVinQuantite] = React.useState(1);
  /**
   * État de la date d'achat choisie
   */
  const [vinDateAchat, setVinDateAchat] = React.useState(
    moment().format("YYYY-MM-DD")
  );
  /**
   * État de la date de garde choisie
   */
  const [vinGarde, setVinGarde] = React.useState(
    moment().get("year").toString()
  );
  /**
   * État de la Note
   */
  const [vinNote, setVinNote] = React.useState("");
  /**
   * État du nom de la bouteille
   */
  const [vinNom, setVinNom] = React.useState(" ");
  /**
   * État du prix de la bouteille
   */
  const [vinPrix, setVinPrix] = React.useState(1);
  /**
   * État du millesime de la bouteille
   */
  const [vinMillesime, setMillesime] = React.useState("");
  /**
   * État du pays de la bouteille
   */
  const [vinPays, setVinPays] = React.useState("");
  /**
   * État du format de la bouteille
   */
  const [vinFormat, setVinFormat] = React.useState("");
  /**
   * État de la description de la bouteille
   */
  const [vinDescription, setVinDescription] = React.useState("");
  /**
   * État de l'image de la bouteille
   */
  const [vinImage, setVinImage] = React.useState("");
  /**
   * Collection des vins dans un cellier spécifié par son cellier_id
   */
  const [vinsTest, setVinsTest] = React.useState(props.bouteilles);
  /**
   * État de la navigation (sert à redirection)
   */
  const navigate = useNavigate();

  /**
   *  Fetch la liste de la bouteilles de la BD pour préparer à injecter à la liste du composant 'Autocomplete'
   */

  useEffect(() => {
    if (localStorage.getItem("vins") !== null) {
      setVinsListe(JSON.parse(localStorage.getItem("vins")));
    }
  }, []);

  useEffect(() => {
    fetch(props.URI + "/cellier/1/vins")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setVinsListe(data);
        localStorage.setItem("vins", JSON.stringify(data.slice(0, 1000)));
        if (data["erreur"]) {
          setVinsListe(JSON.parse(localStorage.getItem("vins")));
        }
      });
  }, []);
  /**
   *  Fetch le cellier choisi ayant des bouteilles pour vérifier si la bouteille choisie existe déjà
   */

  useEffect(() => {
    fetch(props.URI + `/cellier/${vinCellier}/vins`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setVinsTest(data);
      });
  }, [vinCellier]);
  /**
   * Purifier le formulaire quand on bascule entre le bouton 'importer' et 'créer'
   */
  function clearForm() {
    setValue((value) => {
      value = [];
    });
    setMillesime("");
    setVinPays("");
    setVinCellier(
      props.cellier != undefined ? props.cellier : props.celliers[0].id
    );
    setVinFormat("");
    setVinPrix(1);
    setVinDescription("");
    setVinGarde(moment().get("year").toString());
    setVinImage("");
    setVinNom(" ");
    setVinNote("");
    setVinQuantite(1);
    setVinType(1);
    setVinDateAchat(moment().format("YYYY-MM-DD"));
    setErreur([]);
  }
  /**
   * Gère le bouton 'Ajouter'
   * si l'usager a bien choisi une bouteille par l'autocomplete (l'objet 'value' n'est pas vide) et le formulaire est valide
   */
  function gererAjoutBouteille() {
    if (!btnState) {
      //importer
      if (value.length !== 0) {
        let vinIndex = gereAjoutRedondance();
        if (vinIndex < 0) {
          fetchAjouterVin();
        } else {
          setOpenErr(true);
          setMessageErr(
            `La bouteille "${value ? value.nom : ""}" existe dans ce cellier !`
          );
        }
      } else {
        setOpenErr(true);
        setMessageErr(`Veuillez choisir une bouteille à ajouter !!`);
      }
    } else {
      //creer
      if (Object.keys(erreur).length === 0 && vinNom.trim() !== "") {
        fetchAjouterVin();
      } else {
        setOpenErr(true);
        setMessageErr(`Formulaire invalide!!`);
      }
    }
  }
  /**
   * Gère l'ajout d'une bouteille existé déjà dans le cellier choisi, faut faire l'option de ce cellier désactivé
   * vérifie que la bouteille à ajouter a déjà existé dans le cellier choisi, si oui on afficher une message à l'usager, Si non, on enregistra cette bouteille en DB
   * @returns  >=0, qui représent la bouteille  exist dans ce cellier, si non on pourrait l'ajouter
   */
  function gereAjoutRedondance() {
    if (vinsTest.length > 0 && value != undefined) {
      let vinsAjout = { vin_id: value.id, cellier_id: vinCellier };

      let vinsAjoutIndex = (vinsTest || []).findIndex(
        (vin) => vin.id === vinsAjout.vin_id
      );
      return vinsAjoutIndex;
    } else {
      return -1; // ajout dans un cellier vide.
    }
  }
  /**
   * Ajouter une nouvelle bouteille à la BD
   * Route API: localhost/PW2/cellier-projet/api-php/cellier/3/vins
   */
  async function fetchAjouterVin() {
    // les données（payload） à ajouter pour l'importation du SAQ, servi au table 'vino__bouteille_has_vino__cellier', le key "personnalise" = 0
    let formData = {};
    if (btnState === false) {
      formData = {
        vino__bouteille_id: value.id,
        vino__cellier_id: parseInt(vinCellier),
        quantite: vinQuantite,
        date_achat: vinDateAchat,
        garde_jusqua: vinGarde,
        notes: vinNote,
        personnalise: 0,
      };
    } else {
      formData = {
        nom: vinNom,
        image: vinImage,
        code_saq: "",
        pays: vinPays,
        description: vinDescription,
        prix_saq: vinPrix,
        url_saq: "",
        url_img: "",
        format: vinFormat,
        vino__type_id: vinType,
        millesime: parseInt(vinMillesime),
        personnalise: 1,
        vino__cellier_id: parseInt(vinCellier),
        quantite: vinQuantite,
        date_achat: vinDateAchat,
        garde_jusqua: vinGarde,
        notes: vinNote,
      };
    }
    // Fetch API d'ajouter une bouteille , soit l'importation du SAQ soit la création personnalisé
    let fetchAjoutBouteille = await fetch(
      // "http://localhost/PW2/cellier-projet/api-php" +
      props.URI + "/" + "cellier" + "/" + vinCellier + "/" + "vins",
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        props.fetchVins(vinCellier);
        props.setCellier(vinCellier);
        navigate(`/cellier/${vinCellier}/vins`, { replace: true });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(error);
      });
  }
  /**
   * gérer l'affichage de l'image de bouteille, l'image par défaut va être à la place de l'image associé si elle n'existe pas
   * @returns URL de l'image
   */
  const imgUrl = () => {
    let ok = placeholderSaq;
    if (value) {
      if (value.image && value.image.indexOf("pastille_gout") < 0) {
        ok = value.image;
      } else ok = placeholderSaq;
    }
    return ok;
  };
  return (
    <div>
      <div className="Appli--entete">
        <div className="Appli--addBottle-container">
          <BtnGroup
            className="Appli--addBottle-btnGroup"
            btnState={btnState}
            setBtnState={setBtnState}
            clearForm={clearForm}
            setMillesime={setMillesime}
            VinMillesime={vinMillesime}
          />
        </div>
      </div>
      <div className="Appli--container">
        <div className="FrmAjoutBouteille">
          <h1>AJOUTER UNE BOUTEILLE</h1>
          <div className="FrmAjoutNouvelle">
            <div className="img--wrap">
              <img src={imgUrl() ? imgUrl() : { placeholderSaq }} alt="" />
            </div>
            {/* Apparaîte uniquement en important de la bouteille du SAQ */}
            <div className={btnState ? "hidden" : ""}>
              <label className="formInputNom" for="nom-bouteille-saq">
                Nom: {value ? value.nom : ""}
              </label>
            </div>
            {/* Autocomplete début */}
            <div className={btnState ? "hidden" : "autocomplete"}>
              <p className="instruction">
                Recherchez et importez une bouteille de la SAQ{" "}
              </p>
              <Autocomplete
                options={vinsListe}
                getOptionLabel={(option) => option.nom}
                disablePortal
                id="nom-bouteille-saq"
                size="small"
                noOptionsText={"La bouteille n'existe pas"}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                // Gère du boutton clear 'X' , faut nettoyer tous les champs du formulaire
                onInputChange={(event, newValue, reason) => {
                  if (reason === "clear" || newValue === "") {
                    setValue((value) => {
                      value = [];
                    });
                  }
                }}
                // Gère du changement de l'option
                onChange={(event, newValue) => {
                  setValue(newValue);
                  // gereAjoutRedondance();
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.nom} - {option.format}
                    </li>
                  );
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </div>
            {/* Autocomplete fin */}

            <Grid container spacing={1}>
              {/* min-width -- (desktop)lg:1200px - md:992px - sm:768px, xs(mobile)-max-width:768px */}
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={btnState ? "" : "hidden"}
              >
                <label className="formInputNom creer" for="nom-bouteille-perso">
                  Nom
                </label>
                <p className="instruction">Créer une bouteille personnalisée</p>
                <TextField
                  fullWidth
                  size="small"
                  id="nom-bouteille-perso"
                  type="text"
                  name="nom"
                  value={vinNom}
                  onChange={(e) => {
                    setVinNom(e.target.value);
                    e.target.value === ""
                      ? setErreur({ nom: "champ obligatoire" })
                      : delete erreur["nom"];
                  }}
                  error={vinNom === ""}
                  helperText={vinNom === "" ? "* Champ obligatoire!" : ""}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                lg={3}
                className={btnState ? "" : "hidden"}
              >
                <label for="millesime">Millesime</label>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="millesime"
                  id="millesime"
                  disabled={btnState ? false : true}
                  className={!btnState ? "nonSelect" : ""}
                  value={value ? value.millesime : vinMillesime}
                  onChange={(e) => {
                    setMillesime(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                item
                xs={btnState ? 6 : 12}
                sm={btnState ? 6 : 12}
                md={btnState ? 3 : 6}
                lg={btnState ? 3 : 6}
              >
                <label for="pays">Pays</label>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="pays"
                  id="pays"
                  disabled={btnState ? false : true}
                  className={!btnState ? "nonSelect" : ""}
                  value={value ? value.pays : vinPays}
                  onChange={(e) => {
                    setVinPays(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3}>
                <label for="prix">Prix</label>
                <TextField
                  fullWidth
                  size="small"
                  id="prix"
                  type="number"
                  name="prix"
                  disabled={btnState ? false : true}
                  className={!btnState ? "nonSelect" : ""}
                  value={value ? value.prix_saq : vinPrix}
                  onChange={(e) => {
                    setVinPrix(e.target.value);
                    e.target.value === ""
                      ? setErreur({ prix: "champ obligatoire" })
                      : delete erreur["prix"];
                  }}
                />
                <p className={erreur["prix"] ? "active" : "hidden"}>
                  ✳ {erreur["prix"]}{" "}
                </p>
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3}>
                <label for="format">format(ml)</label>
                <TextField
                  fullWidth
                  size="small"
                  id="format"
                  type="text"
                  name="format"
                  disabled={btnState ? false : true}
                  className={!btnState ? "nonSelect" : ""}
                  value={value ? value.format : vinFormat}
                  onChange={(e) => {
                    setVinFormat(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <label for="description">Description</label>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="description"
                  multiline
                  rows={2}
                  id="description"
                  // maxRows={3}
                  disabled={btnState ? false : true}
                  className={!btnState ? "nonSelect" : ""}
                  value={value ? value.description : vinDescription}
                  onChange={(e) => {
                    setVinDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <label for="type">Type</label>
                <TextField
                  select
                  value={value ? value.vino__type_id : vinType}
                  onChange={(e) => {
                    setVinType(e.target.value);
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  size="small"
                  name="type"
                  id="type"
                  className={!btnState ? "nonSelect" : ""}
                  disabled={btnState ? false : true}
                >
                  {types.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6} sm={6} md={4} lg={4}>
                <label>Date d'achat</label>
                <DateSelecteur
                  dateAchat={vinDateAchat}
                  setDateAchat={setVinDateAchat}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4}>
                <label>Garde</label>
                <DateSelecteurAnnee
                  dateGarde={vinGarde}
                  setDateGarde={setVinGarde}
                />
              </Grid>

              <Grid item xs={6} sm={6} md={6} lg={6}>
                <label for="quantite">Quantite</label>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  id="quantite"
                  inputProps={{
                    min: 1,
                    inputMode: "numeric",
                    pattern: "/^+?[1-9]d*$/",
                  }}
                  // defaultValue={1}
                  name="quantite"
                  required
                  value={vinQuantite}
                  onChange={(e) => {
                    setVinQuantite(e.target.value);
                    e.target.value === ""
                      ? setErreur({ quantite: "champ obligatoire" })
                      : delete erreur["quantite"];
                  }}
                />
                <p className={erreur["quantite"] ? "active" : "hidden"}>
                  ✳ {erreur["quantite"]}{" "}
                </p>
              </Grid>

              <Grid item xs={6} sm={6} md={6} lg={6}>
                <label for="cellier-bouteille">Cellier</label>
                <TextField
                  select
                  id="cellier-bouteille"
                  value={vinCellier}
                  onChange={(e) => {
                    setVinCellier(e.target.value);
                    console.log(vinCellier);
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  size="small"
                  name="cellier"
                >
                  {props.celliers.map((cellier) => (
                    <option key={cellier.id} value={cellier.id}>
                      {cellier.nom}
                    </option>
                  ))}
                </TextField>
                <p className={erreur["ajout"] ? "active" : "hidden"}>
                  ✳ {erreur["ajout"]}{" "}
                </p>
              </Grid>

              <Grid item xs={12} sm={12}>
                <label for="note">Note</label>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="notes"
                  id="note"
                  value={vinNote}
                  onChange={(e) => {
                    setVinNote(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  mt={2}
                  mb={2}
                >
                  <button
                    className="btn--ajouter"
                    onClick={gererAjoutBouteille}
                  >
                    Ajouter
                  </button>
                </Box>
              </Grid>
              <Dialog open={openErr}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      size="small"
                      onClick={() => {
                        setOpenErr(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {messageErr}
                </Alert>
              </Dialog>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
const types = [
  {
    value: "1",
    label: "Vin rouge",
  },
  {
    value: "2",
    label: "Vin blanc",
  },
  {
    value: "3",
    label: "Vin rose",
  },
];
