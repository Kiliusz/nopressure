import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Grid, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/logo.svg";
import LogoutButton from "../components/LogoutButton";
import DarkModeSelect from "../components/DarkModeSelect";
import { AuthContext } from "../auth/AuthContextProvider";

const useStyles = makeStyles({
  root: {
    maxWidth: "800px",
    margin: "0 auto",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          className={classes.root}
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item component={Link} to="/">
            <img src={logo} alt="App logo NoPressure" />
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>{user && <LogoutButton />}</Grid>
              <Grid item>
                <DarkModeSelect />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
