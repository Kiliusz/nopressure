import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, withWidth, Modal } from "@material-ui/core";
import AddResultForm from "./forms/AddResultForm";

const useStyles = makeStyles((theme) => ({
  button: {
    position: "fixed",
    [theme.breakpoints.down("xs")]: {
      bottom: "15%",
    },
    bottom: "10%",
    [theme.breakpoints.up("md")]: {
      right: "20%",
    },
    right: "10%",
    zIndex: "10",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AddMeasurement = ({ width }) => {
  const classes = useStyles();
  const isScreenSmall = width === "xs";
  const buttonSize = { size: isScreenSmall ? "small" : "large" };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <>
          <AddResultForm closeModal={handleClose} />
        </>
      </Modal>
      <Fab onClick={handleOpen} className={classes.button} color="primary" {...buttonSize}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default withWidth()(AddMeasurement);
