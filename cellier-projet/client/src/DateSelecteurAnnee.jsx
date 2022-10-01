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
				dateFormat="yyyy"
				views={["year"]}
				value={props.dateGarde}
				onChange={(newValue) => {
				newValue
					? props.setDateGarde(newValue.format("YYYY").toString())
					: props.setDateGarde(moment().format("YYYY").toString());
				}}
				renderInput={(params) => (
				<TextField
					size="small"
					{...params}
					
				/>
				
				)}
			/>
			</Stack>
		</LocalizationProvider>
		</div>
	</div>
	);
}
