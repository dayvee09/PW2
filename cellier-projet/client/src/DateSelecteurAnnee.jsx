import "./DateSelecteurAnnee.scss";
import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateSelecteurAnnee(props) {

  return (
    <div className={['DateSelecteurAnnee', props.voirFiche === true? "hidden" : ""].join(' ')}>
      <label>Date jusqu'à: </label>
      <div className="DateInput">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              dateFormat="yyyy"
              views={['year']}
              value={props.dateGarde}
              onChange={(newValue) => {
                props.setDateGarde(newValue.format('YYYY').toString());
              }}
              renderInput={(params) => <TextField size="small" {...params} helperText={null} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
    </div >
  );
}