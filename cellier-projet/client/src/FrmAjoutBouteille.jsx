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
import { useNavigate } from "react-router-dom";

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
    props.cellier ? props.cellier : props.celliers[0].id
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
  const [vinNom, setVinNom] = React.useState("");
  /**
   * État du prix de la bouteille
   */
  const [vinPrix, setVinPrix] = React.useState(0);
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
  const navigate = useNavigate();

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

  function clearForm() {
    setValue((value) => {
      value = [];
    });
  }
  /**
   * Gère le bouton 'Ajouter'
   */

  function gererAjoutBouteille() {
    if (value || erreur.length === 0) {
      fetchAjouterVin();
    } else console.log("form invalid");
  }

  /**
   *  Gère l'input du select de cellier
   */
  function gererInputCellier(e) {
    setVinCellier(e.target.value);
    console.log(e.target.value);
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
    let ok = "https://www.saq.com/media/wysiwyg/placeholder/category/06.png";
    if (value) {
      if (value.image && value.image.indexOf("pastille_gout") < 0) {
        ok = value.image;
      } else
        ok = "https://www.saq.com/media/wysiwyg/placeholder/category/06.png";
    }
    return ok;
  };
  return (
    <div className="FrmAjoutBouteille">
      <div className="btnClose">
        <IconButton>
          <CloseIcon />
        </IconButton>
      </div>

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
          <img src={imgUrl() ? imgUrl() : ""} alt="" />
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
            blurOnSelect={true}
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
              error={vinPrix === ""}
              helperText={vinPrix === "" ? "* Champ obligatoire!" : " "}
            />
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
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <label>Description</label>
            <TextField
              // style={{ height: 20 }}
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
              type={"number"}
              inputProps={{
                min: 1,
                inputMode: "numeric",
                pattern: "/^+?[1-9]d*$/",
              }}
              defaultValue={1}
              name="quantite"
              required
              value={vinQuantite}
              onChange={(e) => {
                setVinQuantite(e.target.value);
                e.target.value === ""
                  ? setErreur({ quantite: "champ obligatoire" })
                  : delete erreur["quantite"];
              }}
              error={vinQuantite === ""}
              helperText={vinQuantite === "" ? "* Champ obligatoire!" : " "}
              // onChange={gererQuantiteChange}
            />
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
                  {cellier.nom}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" m={2}>
              <Button
                onClick={gererAjoutBouteille}
                variant="contained"
                style={{
                  borderRadius: 2,
                  backgroundColor: "#cc4240",
                  padding: "10px 36px",
                  fontSize: "14px",
                }}
              >
                AJOUTER
              </Button>
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
