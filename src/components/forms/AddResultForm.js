import React, { useContext } from "react";
import "date-fns";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  makeStyles,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";
import CustomDatePicker from "../customInputs/CustomDatePicker";
import { addResult } from "../../database/databaseHelpers";
import { AuthContext } from "../../auth/AuthContextProvider";
import { DataContext } from "../../database/DataContextProvider";
import sortByProperty from "../../database/dataHelpers";

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "550px",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "98%",
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
const AddResultForm = ({ closeModal }) => {
  const { user } = useContext(AuthContext);
  const { setAppData } = useContext(DataContext);
  const classes = useStyles();
  const initialValues = {
    up: "",
    down: "",
    pulse: "",
    dateOfMeasurement: new Date(),
  };

  const handleSubmit = (values, actions) => {
    const { up, down, pulse, dateOfMeasurement } = values;
    const time = new Date(dateOfMeasurement).getTime();
    actions.setSubmitting(true);
    addResult(user.uid, up, down, pulse, time)
      .then((doc) => {
        const newData = { up, down, pulse, dateOfMeasurement: time, docId: doc.id };
        actions.setSubmitting(false);
        actions.resetForm();
        setAppData((prevState) => sortByProperty([...prevState, newData]));
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignupSchema}>
      {({ isSubmitting, errors, touched }) => (
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
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default withRouter(AddResultForm);
