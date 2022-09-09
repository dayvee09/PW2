import TextField from "@mui/material/TextField";
import "./FrmSaqInput.scss";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FrmSaqInput(props) {
  const gererType = (e) => {
    props.setType(e.target.value);
  };

  function gererNombre(e) {
    props.setNombre(e.target.value);
  }
  function gererPage(e) {
    props.setPage(e.target.value);
  }
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="nombre">Nombre</InputLabel>
        <Select
          labelId="nombre"
          id="nombre"
          value={props.nombre}
          label="Nombre"
          onChange={gererNombre}
        >
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={48}>48</MenuItem>
          <MenuItem value={96}>96</MenuItem>
        </Select>
      </FormControl>
      <TextField
        placeholder="Page"
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        autoFocus
        onChange={gererPage}
        id="page"
        type={"number"}
        min={0}
        inputProps={{ min: 0 }}
        defaultValue={props.page}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          value={props.type}
          label="Type"
          onChange={gererType}
        >
          <MenuItem value={"rouge"}>Rouge</MenuItem>
          <MenuItem value={"blanc"}>Blanc</MenuItem>
          <MenuItem value={"rose"}>Rosé</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
