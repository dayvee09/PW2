
import TextField from '@mui/material/TextField';

export default function FrmBouteilleInput(props) {
    
    function gererInput(e) {
        props.setQuantite(e.target.value);
      }
    return (
        <div className="FrmBouteilleInput">
            <TextField
                        autoFocus
                        onChange={gererInput} 
                        id="quantite"
                        type={'number'}
                        min={0}
                        inputProps={{ min: 0}}
                        defaultValue={props.bouteille_quantite_p}
                        
              />
            
        </div>
    );
}