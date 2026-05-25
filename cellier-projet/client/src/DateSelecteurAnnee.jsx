<<<<<<< HEAD
import "./DateSelecteurAnnee.scss";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

/**
 * Gestion de selecteur d'une date en format "yyyy"
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function DateSelecteurAnnee(props) {
  const dateValue = props.dateGarde ? dayjs(props.dateGarde) : dayjs().add(1, "year");

  return (
    <div
      className={[
        "DateSelecteurAnnee",
        props.voirFiche === true ? "hidden" : "",
      ].join(" ")}
    >
      <div className="DateInput">
        <Stack spacing={3}>
          <DatePicker
            views={["year", "month", "day"]}
            value={dateValue}
            onChange={(newValue) => {
              props.setDateGarde(
                newValue
                  ? newValue.format("YYYY-MM-DD")
                  : dayjs().add(1, "year").format("YYYY-MM-DD")
              );
            }}
            slotProps={{
              textField: { size: "small" },
            }}
          />
        </Stack>
      </div>
    </div>
  );
}
=======
import "./DateSelecteurAnnee.scss";
import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

/**
 * Gestion de selecteur d'une date en format "yyyy"
 * @date 2022-09-30
 * @param {*} props
 * @returns {*}
 */
export default function DateSelecteurAnnee(props) {
  return (
    <div
      className={[
        "DateSelecteurAnnee",
        props.voirFiche === true ? "hidden" : "",
      ].join(" ")}
    >
      <div className="DateInput">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              views={["year", "month", "day"]}
              value={props.dateGarde}
              onChange={(newValue) => {
                newValue
                  ? props.setDateGarde(newValue.format("YYYY-MM-DD"))
                  : props.setDateGarde(
                      moment().add(1, "years").format("YYYY-MM-DD")
                    );
              }}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
    </div>
  );
}
>>>>>>> monvino/master
