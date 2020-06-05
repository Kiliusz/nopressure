import React, { useState } from "react";
import { makeStyles, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
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

const CustomSnackBar = ({ open, msg, setOpen }) => {
  const classes = useStyles();

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <div className={classes.snackContainer}>
        <p className={classes.snackText}>{msg}</p>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </Snackbar>
  );
};

export default CustomSnackBar;
