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
import Button from "@mui/material/Button";
import DateSelecteur from "./DateSelecteur";
import DateSelecteurAnnee from "./DateSelecteurAnnee";
import moment from "moment";
import placeholderSaq from "./img/png/placeholder-saq.png";
import { useNavigate } from "react-router-dom";
import Bouteille from "./Bouteille";

export default function FrmAjoutBouteille(props) {
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

  // const [form, setForm] = React.State({vinCellier: props.celliers[0].id, vinQuantite: 1, vinDateAchat: moment().format("YYYY-MM-DD"), vinGarde:  moment().get("year").toString(), vinNote: "", vinNom: "", vinImage: "", vinPays: "", vinDescription: "", vinPrix: 0, vinFormat: "750 ml", vinType: "1", vinMillesime: 2023});

  /**
   * État du type de bouteille
   */
  const [vinType, setVinType] = React.useState("1");
  /**
   * État du cellier choisi
   */
  const [vinCellier, setVinCellier] = React.useState(
    props.cellier ? props.cellier : props.cellier? props.cellier : props.celliers[0].id
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
  const [vinNom, setVinNom] = React.useState("#");
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
  // /**
  //  * Collection des vins dans un cellier spécifié par son cellier_id
  //  */
  // const [vinsTest, setVinsTest] = React.useState([]);
  // /**
  //  * État d'identifiant d'un cellier où la bouteille à ajouter existe déjà
  //  */
  // const [redondance, setRedondance] = React.useState("");
  // /**
  //  * État de la navigation (sert à redirection)
  //  */
  const navigate = useNavigate();

  // /**
  //  * Variable
  //  */
  // let redon;
  /**
   *  Fetch la liste de la bouteilles de la BD pour préparer à injecter à la liste du composant 'Autocomplete'
   */
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
      });
      
  }, []);

  // useEffect(() => {
  //   fetch(props.URI + `/cellier/${vinCellier}/vins`)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw response;
  //     })
  //     .then((data) => {
  //       setVinsTest(data);
  //     });

  //     if(gereAjoutRedondance() === -1 ){
  //       setRedondance();
  //     }else{
  //       setRedondance(vinCellier);
  //     }
  // }, [vinCellier,value]);

  function clearForm() {
    setValue((value) => {
      value = [];
    });
    setMillesime("");
    setVinPays("");
    setVinCellier(props.cellier? props.cellier : props.celliers[0].id);
    setVinFormat("");
    setVinPrix(1);
    setVinDescription("");
    setVinGarde(moment().get("year").toString());
    setVinImage("");
    setVinNom("#");
    setVinNote("");
    setVinQuantite(1);
    setVinType(1);
    setVinDateAchat(moment().format("YYYY-MM-DD"));
    setErreur([]);
  }
  /**
   * Gère le bouton 'Ajouter'
   */
  function gererAjoutBouteille() {
    // console.log("error[]:", erreur);
    // console.log("vin_id:", value.id);
    // console.log("cellier_id:", vinCellier);
    // console.log("quantite:", vinQuantite);
    // console.log("Date_achat:", vinDateAchat);
    // console.log("Garde:", vinGarde);
    // console.log("notes:", value ? value.notes : vinNote);
    // console.log("personnalise(0 ou 1):", value ? value.personnalise : 1);
    // console.log("Nom: ", vinNom);
    // console.log("Image: ", vinImage);
    // console.log("Pays: ", vinPays);
    // console.log("Description: ", vinDescription);
    // console.log("Prix: ", vinPrix);
    // console.log("format: ", vinFormat);
    // console.log("type_id: ", vinType);
    // console.log("Millesime: ", vinMillesime);
    // console.log("error:", erreur);
    // si l'usager a bien choisi une bouteille par l'autocomplete (l'objet 'value' n'est pas vide) et le formulaire est valide

    if (value || erreur.length === 0) {
      // let vinIndex = gereAjoutRedondance();

      // if (vinIndex < 0) {
        // console.log("ajout en cours", vinCellier);
        fetchAjouterVin();

        // props.setCellier(vinCellier);
        
        // navigate(`/cellier/${vinCellier}/vins`, { replace: true });
    } else console.log("form invalid");
  
  //     // }
  //   } else console.log("Formulaire invalid!");
  // }
  // /**
  //  * Gère l'ajout d'une bouteille existé déjà dans le cellier choisi, faut faire l'option de ce cellier désactivé
  //  */
  // function gereAjoutRedondance() {
  //   // vérifie que la bouteille à ajouter a déjà existé dans le cellier choisi, si oui on afficher une message à l'usager, Si non, on enregistra cette bouteille en DB
  //   if (vinsTest.length > 0) {
  //     let vinsAjout = { vin_id: value.id, cellier_id: vinCellier };
  //     console.log("vinsTest:",vinsTest)
  //     console.log("celliers", props.celliers)
  //     let vinsAjoutIndex = (vinsTest || []).findIndex(
  //       (vin) => vin.id === vinsAjout.vin_id
  //     );
     
  //     // setErreur({ ajout: "Bouteille existe! Veuillez choisir un autre cellier! " });
  //    return vinsAjoutIndex; // si return >=0, qui représent la bouteille  exist dans ce cellier
  //   } else {
     
  //     // delete erreur["ajout"];
  //      return -1;
  //   }
  }
  /**
   * Ajouter une nouvelle bouteille à la BD
   *
   */
  async function fetchAjouterVin() {
    //Route API: localhost/PW2/cellier-projet/api-php/cellier/3/vins,
    // les données（payload） à ajouter pour l'importation du SAQ, servi au table 'vino__bouteille_has_vino__cellier', le key "personnalise" = 0

    let formData = {};
    if (btnState === false) {
      formData = {
        vino__bouteille_id: value.id,
        vino__cellier_id: vinCellier,
        quantite: vinQuantite,
        date_achat: vinDateAchat,
        garde_jusqua: vinGarde,
        notes: value.notes,
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
        millesime: vinMillesime,
        personnalise: 1,
        vino__cellier_id: vinCellier,
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
        props.fetchVins();
        navigate(`/cellier/${props.cellier}/vins`, { replace: true });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        props.setError(error);
      });
  }
  const imgUrl = () => {
    let ok = placeholderSaq;
    if (value) {
      if (value.image && value.image.indexOf("pastille_gout") < 0) {
        ok = value.image;
      } else ok = placeholderSaq;
    }
    return ok;
  };
  console.log(props);
  return (
    <div className="FrmAjoutBouteille">
      {/* <div className="btnClose">
        <IconButton>
          <CloseIcon />
        </IconButton>
      </div> */}
      <div className="EnteteAjoutBouteille">
        <h2>AJOUTER UNE BOUTEILLE</h2>
        <BtnGroup
          btnState={btnState}
          setBtnState={setBtnState}
          clearForm={clearForm}
          setMillesime={setMillesime}
          VinMillesime={vinMillesime}
        />
      </div>
      <div className="bandeRouge"></div>

      <div className="FrmAjoutNouvelle">
        <div className="img--wrap">
          <img src={imgUrl() ? imgUrl() : { placeholderSaq }} alt="" />
        </div>
        {/* Apparaîte uniquement en important de la bouteille du SAQ */}
        <div className={btnState ? "hidden" : ""}>
          <label>Nom: {value ? value.nom : ""}</label>
        </div>
        {/* Autocomplete début */}
        <div className={btnState ? "hidden" : ""}>
          <label htmlFor="">Recherche: </label>
          <Autocomplete
            options={vinsListe}
            getOptionLabel={(option) => option.nom}
            disablePortal
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
            renderInput={(params) => <TextField {...params}  size="small" />}
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
            lg={6}
            className={btnState ? "" : "hidden"}
          >
            <label>Nom</label>
            <TextField
              fullWidth
              size="small"
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
              helperText={vinNom === "" ? "* Champ obligatoire!" : " "}
            />
            {/* <p className={erreur["nom"] ? "active" : "hidden"}>
              ✳ {erreur["nom"]}{" "}
            </p> */}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <label>Millesime</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="millesime"
              value={value ? value.millesime : vinMillesime}
              onChange={(e) => {
                setMillesime(e.target.value);
              }}
              // inputProps={
              //   { readOnly: true, }
              // }
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <label>Pays</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="pays"
              value={value ? value.pays : vinPays}
              onChange={(e) => {
                setVinPays(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <label>Prix</label>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="prix"
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
            <label>format(ml)</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="format"
              value={value ? value.format : vinFormat}
              onChange={(e) => {
                setVinFormat(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <label>Description</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="description"
              multiline
              rows={2}
              // maxRows={3}
              value={value ? value.description : vinDescription}
              onChange={(e) => {
                setVinDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <label>Type</label>
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
            >
              {types.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6} sm={6} md={4} lg={3}>
            <label>Date d'achat</label>
            <DateSelecteur
              dateAchat={vinDateAchat}
              setDateAchat={setVinDateAchat}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <label>Garde</label>
            <DateSelecteurAnnee
              dateGarde={vinGarde}
              setDateGarde={setVinGarde}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4} lg={3}>
            <label>Note</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="notes"
              value={value ? value.notes : vinNote}
              onChange={(e) => {
                setVinNote(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <label>Quantite</label>
            <TextField
              fullWidth
              size="small"
              type="number"
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
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <label>Cellier</label>
            <TextField
              select
              value={vinCellier}
              onChange={gererInputCellier}
              SelectProps={{
                native: true,
              }}
              fullWidth
              size="small"
              name="cellier"
            >
              {props.celliers.map((cellier) => (
                <option key={cellier.id} value={cellier.id}>
               {/* <option key={cellier.id} value={cellier.id} disabled={cellier.id==redondance? true:false}> */}
                  {cellier.nom}
                </option>
              ))}
            </TextField>
            <p className={erreur["ajout"] ? "active" : "hidden"}>
              ✳ {erreur["ajout"]}{" "}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2} mb={2}>
              <button className="btn--ajouter" onClick={gererAjoutBouteille}>
                Ajouter
              </button>
            </Box>
          </Grid>
        </Grid>
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
