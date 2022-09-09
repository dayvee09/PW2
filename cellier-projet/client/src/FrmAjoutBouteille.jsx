import "./FrmAjoutBouteille.scss";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import BtnGroup from "./ToggleBtn";
import Grid from "@material-ui/core/Grid";

export default function FrmAjoutBouteille(props) {
  // console.log(props);
  const flatProps = {
    options: top100Films.map((option) => option.title),
  };

  const [value, setValue] = React.useState(null);

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
        <img src="" alt="" />

        <label htmlFor="">Nom:</label>

        <label htmlFor="">Recherche: </label>
        <Autocomplete
          {...flatProps}
          id="free-solo-demo"
          freeSolo
          value={value}
          autoHighlight
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
        <Grid container spacing={2}>
          <Grid item sm={6} md={4} lg={3}>
            <label>Millesime</label>
            <TextField fullWidth size="small" type="text" name="millesime" />
            <label>Pays</label>
            <TextField fullWidth size="small" type="text" name="pays" />
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <label>Prix</label>
            <TextField fullWidth size="small" type="text" name="prix" />
            <label>format(ml)</label>
            <TextField fullWidth size="small" type="text" name="format" />
          </Grid>
          <Grid item xs={12}>
            <label>Description</label>
            <TextField fullWidth size="small" type="text" name="description" />
          </Grid>

          <Grid item xs={12}>
            <label>Type</label>
            <TextField fullWidth size="small" type="text" name="type" />
          </Grid>

          <Grid item sm={6} md={4} lg={3}>
            <label>Date d'achat</label>
            <TextField fullWidth size="small" type="text" name="date_achat" />
            <label>Garde</label>
            <TextField fullWidth size="small" type="text" name="garde_jusqua" />
          </Grid>

          <Grid item sm={6} md={4} lg={3}>
            <label>Note</label>
            <TextField fullWidth size="small" type="text" name="note" />
            <label>Quantite</label>
            <TextField fullWidth size="small" type="text" name="quantite" />
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <label>Cellier</label>
            <TextField fullWidth size="small" type="text" name="cellier" />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>

          <button className="ajouter">Ajouter</button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
