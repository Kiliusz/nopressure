import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ResultsList from "../components/ResultsList";
import { AuthContext } from "../auth/AuthContextProvider";
import LandingPage from "../components/LandingPage";

const useStyles = makeStyles({
  wrapper: {
    maxWidth: "800px",
    margin: "0 auto",
  },
});

const Home = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <Grid container className={classes.wrapper} justify="center">
      {user && <ResultsList />}
      {!user && <LandingPage />}
    </Grid>
  );
};

export default Home;
