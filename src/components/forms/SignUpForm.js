import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  makeStyles,
  FormLabel,
  FormHelperText,
  Typography,
  Link as MuiLink,
} from "@material-ui/core";
import CustomCheckbox from "../customInputs/CustomCheckBox";
import CustomRadioInput from "../customInputs/CustomRadioInput";
import { auth } from "../../auth/AuthContextProvider";
import { makeUser } from "../../database/databaseHelpers";
import CustomSnackBar from "../CustomSnackBar";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "1em",
    textAlign: "left",
  },
  button: {
    marginTop: "1em",
    marginBottom: "1em",
  },
  field: {
    marginBottom: "0.2em",
  },
  snackContainer: {
    padding: "0.3em 1em",
    display: "flex",
    backgroundColor: theme.palette.error.main,
    borderRadius: "1em",
  },
  snackText: {
    color: "white",
    marginRight: "1em",
  },
}));

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(15, "Too Long!").required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required").min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  acceptTerms: Yup.bool().oneOf([true], "You have to accept terms and conditions"),
  gender: Yup.string().required("You have to select one option"),
});

const SignUpForm = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    acceptTerms: false,
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(({ user }) => {
        makeUser(values.name, user.uid, values.gender, values.email);
        actions.resetForm();
        actions.setSubmitting(false);
        history.push("/");
      })
      .catch((err) => {
        setOpen(true);
        setError(err.message);
        // actions.resetForm();
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
        {({ isSubmitting, errors, touched }) => (
          <Form className={classes.form}>
            <FormControl fullWidth>
              <Field
                className={classes.field}
                autoComplete="off"
                name="name"
                as={TextField}
                label="Name"
                helperText={touched.name && errors.name}
                error={!!errors.name && touched.name}
              />
            </FormControl>
            <FormControl fullWidth>
              <Field
                className={classes.field}
                // autoComplete="off"
                name="email"
                as={TextField}
                label="E-mail"
                helperText={touched.email && errors.email}
                error={!!errors.email && touched.email}
              />
            </FormControl>
            <FormControl fullWidth>
              <Field
                className={classes.field}
                autoComplete="off"
                name="password"
                as={TextField}
                label="Password"
                type="password"
                helperText={touched.password && errors.password}
                error={!!errors.password && touched.password}
              />
            </FormControl>
            <FormControl fullWidth>
              <Field
                className={classes.field}
                name="confirmPassword"
                as={TextField}
                label="Confirm password"
                type="password"
                helperText={touched.confirmPassword && errors.confirmPassword}
                error={!!errors.confirmPassword && touched.confirmPassword}
              />
            </FormControl>
            <FormControl margin="normal">
              <FormLabel>Gender</FormLabel>
              <CustomRadioInput
                color="primary"
                type="radio"
                name="gender"
                value="female"
                label="Female"
              />
              <CustomRadioInput
                color="primary"
                type="radio"
                name="gender"
                value="male"
                label="Male"
              />
              <FormHelperText error>{touched.gender && errors.gender}</FormHelperText>
            </FormControl>
            <div>
              <FormControl>
                <CustomCheckbox
                  color="primary"
                  name="acceptTerms"
                  label="I accept terms and conditions"
                />
                <FormHelperText error>{touched.acceptTerms && errors.acceptTerms}</FormHelperText>
              </FormControl>
            </div>

            <div>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
              <Typography variant="caption" display="block">
                Already have an account?{" "}
                <span>
                  <MuiLink component={Link} to="/login">
                    Login
                  </MuiLink>
                </span>
              </Typography>
            </div>
          </Form>
        )}
      </Formik>
      <CustomSnackBar setOpen={setOpen} open={open} msg={error} />
    </>
  );
};

export default withRouter(SignUpForm);
