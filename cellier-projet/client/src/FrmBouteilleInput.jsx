import TextField from "@mui/material/TextField";
import "./FrmBouteilleInput.scss";

export default function FrmBouteilleInput(props) {
  function gererInput(e) {
    props.setQuantite(e.target.value);
  }
  return (
    <div className={["FrmBouteilleInput", props.voirFiche === true? "hidden" : ""].join(' ')} >
      <TextField
        fullWidth
        size="small"
        autoFocus
        onChange={gererInput}
        id="quantite"
        type={"number"}
        min={0}
        inputProps={{ min: 0 }}
        defaultValue={props.bouteille.quantite}
      />
    </div>
  );
}
