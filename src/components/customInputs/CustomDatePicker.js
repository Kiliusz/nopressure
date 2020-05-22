import React from "react";
import { MobileDateTimePicker, LocalizationProvider } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import MomentUtils from "@material-ui/pickers/adapter/moment";

const CustomDatePicker = ({ field, form }) => {
  const handleDateChange = (date) => {
    form.setFieldValue(field.name, date, true);
  };
  const currentError = form.errors[field.name];

  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <MobileDateTimePicker
        renderInput={(props) => <TextField {...props} />}
        name={field.name}
        value={field.value}
        onChange={handleDateChange}
        label="Time of measurement"
        showTodayButton
        inputFormat="YYYY/MM/DD HH:mm"
        fullWidth
        ampm={false}
        allowKeyboardControl
        helperText={currentError}
        error={Boolean(currentError)}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
