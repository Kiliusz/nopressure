import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";
import { useField } from "formik";

const CustomCheckBox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props });

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...meta} {...field} />}
      label={label}
    />
  );
};

export default CustomCheckBox;
