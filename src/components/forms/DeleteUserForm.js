import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { Paper, Typography, makeStyles, FormControl, Button, TextField } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AuthContext, createCredential } from "../../auth/AuthContextProvider";
import { DataContext } from "../../database/DataContextProvider";
import CustomSnackBar from "../CustomSnackBar";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xl")]: {
      maxWidth: "600px",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "95%",
    },
    minHeight: "15vh",
    margin: "6em auto",
    padding: "1em 3em",
  },
  modalText: {
    margin: "0.2em 0",
  },
  button: {
    marginRight: "1em",
  },
  form: {
    marginTop: "1em",
  },
}));

const deleteUserSchema = Yup.object().shape({
  password: Yup.string().required("Required").min(8, "Password must be at least 8 characters"),
});

const DeleteUserForm = ({ history, setOpenDelete }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { setAppData } = useContext(DataContext);
  const [openSnack, setOpenSnack] = useState(false);

  const handleAccountDelete = ({ password }) => {
    const cred = createCredential(user.email, password);
    user
      .reauthenticateWithCredential(cred)
      .then(() => {
        user.delete().then(() => {
          setAppData([]);
          history.push("/");
        });
      })
      .catch(() => {
        setOpenSnack(true);
      });
  };
  return (
    <>
      <CustomSnackBar setOpen={setOpenSnack} open={openSnack} msg="Wrong password" color="error" />
      <Paper className={classes.container}>
        <Typography className={classes.modalText}>
          Are you sure to delete account? This is irreversible effect. <br />
          Enter password to delete account.
        </Typography>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={handleAccountDelete}
          validationSchema={deleteUserSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl>
                <Field
                  type="password"
                  name="password"
                  as={TextField}
                  label="Password"
                  helperText={touched.password && errors.password}
                  error={!!errors.password && touched.password}
                />
              </FormControl>
              <div className={classes.form}>
                <Button
                  type="submit"
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                >
                  Delete account
                </Button>
                <Button variant="contained" onClick={() => setOpenDelete(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default withRouter(DeleteUserForm);
