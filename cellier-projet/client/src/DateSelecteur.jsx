import "./DateSelecteur.scss";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelecteur(props) {

    return (
        <div className={['DateSelecteur', props.voirFiche === true? "hidden" : ""].join(' ')}>
            {/* <label>Date d'achat: </label> */}
            <div className="DateInput">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>

                        <DatePicker
                           dateFormat="YYYY-MM-DD"
                            views={['day']}
                            value={props.dateAchat}
                            onChange={(newValue) => {
                                props.setDateAchat(newValue.format("YYYY-MM-DD"));
                            }}
                            renderInput={(params) => <TextField fullWidth size="small" {...params} helperText={null} />}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>
        </div>
    );
}