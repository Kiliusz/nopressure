import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  darkModeIconContainer: {
    display: "flex",
  },
});

const Navbar = ({ setDarkMode, darkMode }) => {
  const classes = useStyles();

  const ChangeDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          className={classes.root}
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>Logo</Grid>
          <Grid item>
            <Grid container>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={ChangeDarkMode}
                    name="darkModeSwitch"
                  />
                }
                label={
                  <Brightness4Icon
                    fontSize="small"
                    className={classes.darkModeIconContainer}
                  />
                }
                labelPlacement="start"
              />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;

Navbar.propTypes = {
  setDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};
