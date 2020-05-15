import React from "react";
import Radio from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";
import { useField } from "formik";

const CustomRadioInput = ({ label, ...props }) => {
  const [field] = useField(props);

  return <FormControlLabel control={<Radio {...field} {...props} />} label={label} />;
};

export default CustomRadioInput;
