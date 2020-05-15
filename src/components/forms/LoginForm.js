import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  makeStyles,
  Typography,
  Link as MuiLink,
} from "@material-ui/core";
import { auth } from "../../auth/AuthContextProvider";

const useStyles = makeStyles({
  form: {
    padding: "1em",
    textAlign: "left",
  },
  button: {
    marginTop: "2em",
    marginBottom: "1em",
  },
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),
});

// COMPONENT
const LoginForm = ({ history }) => {
  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        actions.resetForm();
        actions.setSubmitting(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={classes.form}>
            <FormControl fullWidth margin="normal">
              <Field
                name="email"
                as={TextField}
                label="E-mail"
                helperText={touched.email && errors.email}
                error={!!errors.email && touched.email}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Field
                autoComplete="off"
                name="password"
                as={TextField}
                label="Password"
                type="password"
                helperText={touched.password && errors.password}
                error={!!errors.password && touched.password}
              />
            </FormControl>
            <div>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
              <Typography variant="caption" display="block">
                Dont have an account?{" "}
                <span>
                  <MuiLink href="#" component={Link} to="/signup">
                    Sign up
                  </MuiLink>
                </span>
              </Typography>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withRouter(LoginForm);
