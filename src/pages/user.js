import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Modal,
  CardActions,
  CardContent,
  Button,
  Typography,
  Paper,
  FormControl,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { withRouter } from "react-router";
import { AuthContext, createCredential } from "../auth/AuthContextProvider";
import { getUserInfo } from "../database/databaseHelpers";
import { DataContext } from "../database/DataContextProvider";
import CustomSnackBar from "../components/CustomSnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xl")]: {
      maxWidth: "40%",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "40%",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
    margin: "0 auto",
    padding: "1em 0",
  },
  title: {
    marginBottom: "0.5em",
  },
  container: {
    [theme.breakpoints.down("xl")]: {
      maxWidth: "60%",
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

const User = ({ history }) => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);
  const { setAppData } = useContext(DataContext);

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

  const handleChangePass = () => {
    setOpenChangePass(false);
  };

  useEffect(() => {
    getUserInfo(user.uid).then((info) => {
      setUserInfo(info.data());
    });
  }, []);

  const classes = useStyles();
  return (
    userInfo && (
      <>
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
          <>
            <CustomSnackBar setOpen={setOpenSnack} open={openSnack} msg="Wrong password" />
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
        </Modal>

        {/* CHANGE PASS________________________________ */}
        <Modal open={openChangePass} onClose={() => setOpenChangePass(false)}>
          <>
            <Paper className={classes.container}>
              <Typography className={classes.modalText}>Change password.</Typography>
              <Button
                className={classes.button}
                color="secondary"
                variant="contained"
                onClick={handleChangePass}
              >
                Submit
              </Button>
              <Button variant="contained" onClick={() => setOpenChangePass(false)}>
                Cancel
              </Button>
            </Paper>
          </>
        </Modal>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title}>Hello {userInfo.name}</Typography>
            <Typography className={classes.title}>Your email: {userInfo.email}</Typography>
            <Typography className={classes.title}>Gender: {userInfo.gender}</Typography>
            <Typography className={classes.title}>
              Your account has been created {moment(userInfo.createdAt).fromNow()}{" "}
              {`(${moment(userInfo.createdAt).format("LLL")})`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={() => setOpenChangePass(true)}>
              Change Password
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setOpenDelete(true)}>
              Delete account
            </Button>
          </CardActions>
        </Card>
      </>
    )
  );
};

export default withRouter(User);
