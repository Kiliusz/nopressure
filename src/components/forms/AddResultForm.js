import React from "react";
import "date-fns";
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
  Grid,
  Container,
  Paper,
} from "@material-ui/core";
import CustomDatePicker from "../customInputs/CustomDatePicker";

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "600px",
    },
    margin: "1em auto",
  },
  container: {
    paddingBottom: "1em",
  },
  button: {
    marginTop: "2em",
    marginBottom: "1em",
  },
}));

const SignupSchema = Yup.object().shape({
  up: Yup.number().min(20).max(380).required("Required"),
  down: Yup.number().min(20).max(320).required("Required"),
  pulse: Yup.number().min(20).max(250).required("Required"),
  dateOfMeasurement: Yup.date().typeError("Invalid date"),
});

// COMPONENT
const AddResultForm = ({ history }) => {
  const classes = useStyles();

  const initialValues = {
    up: "",
    down: "",
    pulse: "",
    dateOfMeasurement: new Date(),
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    console.log(new Date(values.dateOfMeasurement).getTime());
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ isSubmitting, errors, touched, values, ...rest }) => (
          <Form className={classes.form}>
            <Container className={classes.container} component={Paper}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <Field
                      autoComplete="off"
                      name="up"
                      type="number"
                      as={TextField}
                      label="Systolic"
                      helperText={touched.up && errors.up}
                      error={!!errors.up && touched.up}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <Field
                      autoComplete="off"
                      name="down"
                      type="number"
                      as={TextField}
                      label="Diastolic"
                      helperText={touched.down && errors.down}
                      error={!!errors.down && touched.down}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Field
                      autoComplete="off"
                      type="number"
                      name="pulse"
                      as={TextField}
                      label="Pulse"
                      helperText={touched.pulse && errors.pulse}
                      error={!!errors.pulse && touched.pulse}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="dateOfMeasurement" component={CustomDatePicker} />
                </Grid>
              </Grid>

              <div>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
                <Typography variant="caption" display="block">
                  Dont have an account?{" "}
                  <span>
                    <MuiLink href="#" component={Link} to="/signup">
                      Sign up
                    </MuiLink>
                  </span>
                </Typography>
                {/* <pre>{JSON.stringify(values, null, 4)}</pre>
                <h4>errors</h4>
                <pre>{JSON.stringify(errors, null, 4)}</pre>
                <h4>touched</h4>
                <pre>{JSON.stringify(touched, null, 4)}</pre>
                <h4>rest</h4>
                <pre>{JSON.stringify(rest, null, 4)}</pre> */}
              </div>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withRouter(AddResultForm);
