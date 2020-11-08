import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
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
  text: {
    marginTop: "1em",
  },
});

const Home = () => {
  const classes = useStyles();
  const [isNewUser, setIsNewUser] = useState(false);
  const { appData, setAppData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const NUMBER_OF_RESULTS_DISPLAY = 10;
  const displayHomeHint = user && appData && appData.length > 9;
  const noRecordsYetHint = user && isNewUser;

  useEffect(() => {
    if (user && (!appData || appData.length < 11)) {
      getResults(user.uid, 10)
        .then((results) => {
          setAppData(results);
          if (results && results.length === 0) {
            setIsNewUser(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <Grid container className={classes.wrapper} justify="center">
        {noRecordsYetHint && <h2>Click on plus sign to add your 1st record</h2>}
        {user && <ResultsList data={appData.slice(0, NUMBER_OF_RESULTS_DISPLAY)} />}
        {!user && <LandingPage />}
      </Grid>
      {displayHomeHint && (
        <>
          <Grid container className={classes.wrapper} justify="center">
            <Typography className={classes.text} variant="h6">
              Your last 10 records
            </Typography>
          </Grid>
          <Grid container className={classes.wrapper} justify="center">
            <Typography variant="subtitle1">To see more go to the history page</Typography>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
