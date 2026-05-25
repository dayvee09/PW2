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
