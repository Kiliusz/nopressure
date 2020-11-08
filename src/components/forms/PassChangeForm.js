import React, { useContext, useState } from "react";
import { TextField, FormControl, Typography, Paper, makeStyles, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { AuthContext, createCredential } from "../../auth/AuthContextProvider";
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
  text: {
    margin: "0.2em 0",
  },
  button: {
    marginRight: "1em",
  },
  inputs: {
    marginBottom: "1em",
  },
}));

const changePassSchema = Yup.object().shape({
  oldPass: Yup.string().required("Required").min(8, "Password must be at least 8 characters"),
  newPass: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .notOneOf([Yup.ref("oldPass"), null], "New Password must be different than old one"),
  newPassConfirm: Yup.string().oneOf([Yup.ref("newPass"), null], "Passwords must match"),
});

const PassChangeForm = ({ setOpenChangePass, setOpenSuccessSnack }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);

  const handlePassChange = ({ oldPass, newPass }) => {
    const cred = createCredential(user.email, oldPass);
    user
      .reauthenticateWithCredential(cred)
      .then(() => {
        user.updatePassword(newPass).then(() => {
          setOpenSuccessSnack(true);
          setOpenChangePass(false);
        });
      })
      .catch(() => {
        setOpenErrorSnack(true);
        setOpenChangePass(true);
      });
  };

  return (
    <>
      <Paper className={classes.container}>
        <Typography className={classes.text}>Change password.</Typography>
        <Formik
          initialValues={{ oldPass: "", newPass: "", newPassConfirm: "" }}
          onSubmit={handlePassChange}
          validationSchema={changePassSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl>
                <Field
                  className={classes.inputs}
                  type="password"
                  name="oldPass"
                  as={TextField}
                  label="Old Password"
                  helperText={touched.password && errors.password}
                  error={!!errors.password && touched.password}
                />
                <Field
                  className={classes.inputs}
                  type="password"
                  name="newPass"
                  as={TextField}
                  label="New Password"
                  helperText={touched.newPass && errors.newPass}
                  error={!!errors.newPass && touched.newPass}
                />
                <Field
                  className={classes.inputs}
                  type="password"
                  name="newPassConfirm"
                  as={TextField}
                  label="Confirm New Password"
                  helperText={touched.newPassConfirm && errors.newPassConfirm}
                  error={!!errors.newPassConfirm && touched.newPassConfirm}
                />
              </FormControl>
              <div>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
                <Button variant="contained" onClick={() => setOpenChangePass(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
      <CustomSnackBar
        setOpen={setOpenErrorSnack}
        open={openErrorSnack}
        msg="Invalid password"
        color="error"
      />
    </>
  );
};

export default PassChangeForm;
