<<<<<<< HEAD
import "./DateSelecteur.scss";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

/**
 * Gestion de selecteur d'une date en format "YYYY-MM-DD"
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function DateSelecteur(props) {
  const dateValue = props.dateAchat ? dayjs(props.dateAchat) : dayjs();

  return (
    <div
      className={[
        "DateSelecteur",
        props.voirFiche === true ? "hidden" : "",
      ].join(" ")}
    >
      <div className="DateInput">
        <Stack spacing={3}>
          <DatePicker
            views={["day"]}
            value={dateValue}
            onChange={(newValue) => {
              props.setDateAchat(
                newValue
                  ? newValue.format("YYYY-MM-DD")
                  : dayjs().format("YYYY-MM-DD")
              );
            }}
            slotProps={{
              textField: { fullWidth: true, size: "small", helperText: null },
            }}
          />
        </Stack>
      </div>
    </div>
  );
}
=======
import "./DateSelecteur.scss";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

/**
 * Gestion de selecteur d'une date en format "YYYY-MM-DD"
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function DateSelecteur(props) {

    return (
        <div className={['DateSelecteur', props.voirFiche === true? "hidden" : ""].join(' ')}>
            <div className="DateInput">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker
                           dateFormat="YYYY-MM-DD"
                            views={['day']}
                            value={props.dateAchat}
                            onChange={(newValue) => { newValue?
                                props.setDateAchat(newValue.format("YYYY-MM-DD")):props.setDateAchat(moment().format("YYYY-MM-DD"));
                            }}
                            renderInput={(params) => <TextField fullWidth size="small" {...params}  helperText={null}/>}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>
        </div>
    );
}
>>>>>>> monvino/master
