import "./DateSelecteurAnnee.scss";
import * as React from "react";
import dayjs from "dayjs";
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
      </div>
    </div>
  );
}
