import TextField from "@mui/material/TextField";
import { StyledEngineProvider } from '@mui/material/styles';
import DateSelecteur from './DateSelecteur';
import DateSelecteurAnnee from './DateSelecteurAnnee';
import "./FrmBouteilleInput.scss";

export default function FrmBouteilleInput(props) {
  function gererInput(e) {
    props.setQuantite(e.target.value);
  }
  return (
    <div className={["FrmBouteilleInput", props.voirFiche === true? "hidden" : ""].join(' ')} >
      <label htmlFor="">Quantité: </label>
      <TextField
        fullWidth
        size="small"
        autoFocus
        onChange={gererInput}
        id="quantite"
        type={"number"}
        min={0}
        inputProps={{ min: 0 }}
        defaultValue={props.quantite}
      />
    </div>
  );
}
