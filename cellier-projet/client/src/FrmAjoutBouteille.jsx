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

export default function FrmAjoutBouteille(props) {
  /**
   * État de la liste de bouteille
   */
  const [vinsListe, setVinsListe] = useState([]);
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
  const [vinCellier, setVinCellier] = React.useState(props.celliers[0].id);
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

  /**
   * Gère le changement du type de bouteille
   * @param {*} event
   */
  const gererTypeChange = (event) => {
    setVinType(event.target.value);
  };
  /**
   * Gère le changement du cellier choisi
   * @param {*} event
   */
  const gererCellierChange = (event) => {
    setVinCellier(event.target.value);
  };
  /**
   * Gère le changement de la quantité choisie
   * @param {*} event
   */
  const gererQuantiteChange = (event) => {
    setVinQuantite(event.target.value);
  };
  /**
   * Gère le bouton 'Ajouter'
   */

  function gererAjoutBouteille() {
    // if(!value) {
    fetchAjouterVin();
    // }
  }
  /**
   * Ajouter une nouvelle bouteille à la BD
   *
   */
  async function fetchAjouterVin() {
    console.log("vin_id:", value.id);
    console.log("cellier_id:", vinCellier);
    console.log("quantite:", vinQuantite);
    console.log("Date_achat:", vinDateAchat);
    console.log("Garde:", vinGarde);
    console.log("notes:", value.notes);
    console.log("personnalise(0):", value.personnalise);

    // //Route API: localhost/PW2/cellier-projet/api-php/cellier/3/vins,
    //   let reponse = await fetch(
    //   // "http://localhost/PW2/cellier-projet/api-php" +
    //   props.URI +
    //   "/" +
    //   "cellier" +
    //   "/" +
    //  vinCellier +
    //   "/" +
    //   "vins",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //           vino__bouteille_id:value.id,
    //           vino__cellier_id:vinCellier,
    //           quantite:vinQuantite,
    //           date_achat:vinDateAchat,
    //           garde_jusqua:vinGarde,
    //           notes:value.notes,
    //           personnalise:value.personnalise
    //     }),
    //   }
    // );
    // let reponseJson = await reponse.json();
    // fetchVinUn();
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
        <BtnGroup />
      </div>
      <div className="bandeRouge"></div>

      <div className="FrmAjoutNouvelle">
        <div className="img--wrap">
          <img src={imgUrl() ? imgUrl() : ""} alt="" />
        </div>

        <label htmlFor="">Nom: {value ? value.nom : ""}</label>

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
        
        <Grid container spacing={1}>
          {/* min-width -- (desktop)lg:1200px - md:992px - sm:768px, xs(mobile)-max-width:768px */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <label>Millesime</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="millesime"
              value={value ? value.millesime : ""}
              // inputProps={
              //   { readOnly: true, }
              // }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <label>Pays</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="pays"
              value={value ? value.pays : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <label>Prix</label>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="prix"
              value={value ? value.prix_saq : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <label>format(ml)</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="format"
              value={value ? value.format : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <label>Description</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="description"
              value={value ? value.description : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <label>Type</label>
            <TextField
              select
              value={value ? value.vino__type_id : vinType}
              onChange={gererTypeChange}
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

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <label>Date d'achat</label>
            <DateSelecteur
              dateAchat={vinDateAchat}
              setDateAchat={setVinDateAchat}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <label>Garde</label>
            <DateSelecteurAnnee
              dateGarde={vinGarde}
              setDateGarde={setVinGarde}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <label>Note</label>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="notes"
              value={value ? value.notes : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <label>Quantite</label>
            <TextField
              fullWidth
              size="small"
              type={"number"}
              min={1}
              inputProps={{ min: 1 }}
              defaultValue={1}
              name="quantite"
              onChange={gererQuantiteChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <label>Cellier</label>
            <TextField
              select
              value={vinCellier}
              onChange={gererCellierChange}
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
