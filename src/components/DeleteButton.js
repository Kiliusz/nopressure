import React, { useContext } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AuthContext } from "../auth/AuthContextProvider";
import { DataContext } from "../database/DataContextProvider";
import { deleteResult } from "../database/databaseHelpers";
import sortByProperty from "../database/dataHelpers";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    position: "absolute",
    [theme.breakpoints.down("xl")]: {
      bottom: "5%",
      right: "5%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0.1em",
      bottom: "14%",
      right: "0",
    },
  },
}));

const DeleteButton = ({ docId }) => {
  const { user } = useContext(AuthContext);
  const { setAppData } = useContext(DataContext);

  const classes = useStyles();
  const handleClick = () => {
    deleteResult(user.uid, docId).then(() => {
      setAppData((prevState) => sortByProperty(prevState.filter((data) => data.docId !== docId)));
    });
  };

  return (
    <IconButton onClick={handleClick} aria-label="delete" className={classes.deleteButton}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteButton;
