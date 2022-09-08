import TextField from "@mui/material/TextField";
import "./FrmSaqInput.scss";

export default function FrmSaqInput(props) {
  function gererNombre(e) {
    props.setNombre(e.target.value);
  }
  function gererPage(e) {
    props.setPage(e.target.value);
  }
  function gererType(e) {
    props.setType(e.target.value);
  }
  return (
    <div>
      <label htmlFor="nombre">Nombre: </label>
      <TextField
        fullWidth
        size="small"
        autoFocus
        onChange={gererNombre}
        id="nombre"
        type={"number"}
        min={0}
        inputProps={{ min: 0 }}
        defaultValue={props.nombre}
      />
      <label htmlFor="page">Page: </label>
      <TextField
        fullWidth
        size="small"
        autoFocus
        onChange={gererPage}
        id="page"
        type={"number"}
        min={0}
        inputProps={{ min: 0 }}
        defaultValue={props.page}
      />
      <label htmlFor="type">Type: </label>
      <TextField
        fullWidth
        size="small"
        autoFocus
        onChange={gererType}
        id="type"
        type={"text"}
        defaultValue={props.type}
      />
    </div>
  );
}
