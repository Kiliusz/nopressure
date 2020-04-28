import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const AddButton = () => {
  // TODO: check if button fit into appbar, if not just position it well
  return (
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
