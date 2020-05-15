import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const CustomDatePicker = ({ field, form }) => {
  const handleDateChange = (date) => {
    form.setFieldValue(field.name, date, true);
  };
  const currentError = form.errors[field.name];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        name={field.name}
        value={field.value}
        onChange={handleDateChange}
        label="Time of measurement"
        showTodayButton
        format="yyyy/MM/dd HH:mm"
        fullWidth
        ampm={false}
        allowKeyboardControl
        helperText={currentError}
        error={Boolean(currentError)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
