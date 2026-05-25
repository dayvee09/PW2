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
