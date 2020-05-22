import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ResultsList from "../components/ResultsList";
import { AuthContext } from "../auth/AuthContextProvider";
import LandingPage from "../components/LandingPage";
import { getResults } from "../database/databaseHelpers";
import { DataContext } from "../database/DataContextProvider";

const useStyles = makeStyles({
  wrapper: {
    maxWidth: "800px",
    margin: "0 auto",
  },
});

const Home = () => {
  const classes = useStyles();
  const { appData, setAppData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const NUMBER_OF_RESULTS_DISPLAY = 10;

  useEffect(() => {
    if (user && (!appData || appData.length < 11)) {
      console.log("useffect datacontext");
      getResults(user.uid, 10)
        .then((results) => {
          setAppData(results);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Grid container className={classes.wrapper} justify="center">
      {user && <ResultsList data={appData.slice(0, NUMBER_OF_RESULTS_DISPLAY)} />}
      {!user && <LandingPage />}
    </Grid>
  );
};

export default Home;
