import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>FOOTER</Toolbar>
    </AppBar>
  );
};
export default Footer;
