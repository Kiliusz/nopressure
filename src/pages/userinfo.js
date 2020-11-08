import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Modal, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import moment from "moment";
import { AuthContext } from "../auth/AuthContextProvider";
import { getUserInfo } from "../database/databaseHelpers";
import CustomSnackBar from "../components/CustomSnackBar";
import PassChangeForm from "../components/forms/PassChangeForm";
import DeleteUserForm from "../components/forms/DeleteUserForm";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xl")]: {
      maxWidth: "800px",
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
}));

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

  useEffect(() => {
    getUserInfo(user.uid).then((info) => {
      setUserInfo(info.data());
    });
  }, [user.uid]);

  const classes = useStyles();
  return (
    userInfo && (
      <>
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
          <DeleteUserForm setOpenDelete={setOpenDelete} />
        </Modal>
        <Modal open={openChangePass} onClose={() => setOpenChangePass(false)}>
          <PassChangeForm
            setOpenSuccessSnack={setOpenSuccessSnack}
            setOpenChangePass={setOpenChangePass}
          />
        </Modal>
        <CustomSnackBar
          setOpen={setOpenSuccessSnack}
          open={openSuccessSnack}
          msg="Password Changed"
          color="success"
        />
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

export default UserInfo;
