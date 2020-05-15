import React from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../auth/AuthContextProvider";

const LogoutButton = ({ history }) => {
  const handleClick = () => {
    auth.signOut().then(() => history.push("/"));
  };

  return (
    <Tooltip title="Logout">
      <IconButton color="inherit" onClick={handleClick}>
        <ExitToAppIcon />
      </IconButton>
    </Tooltip>
  );
};

export default withRouter(LogoutButton);
