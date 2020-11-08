import React, { useContext, useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { DataContext } from "../database/DataContextProvider";
import { getAllResults } from "../database/databaseHelpers";
import { AuthContext } from "../auth/AuthContextProvider";
import FilterForm from "../components/forms/FilterForm";
import ResultsList from "../components/ResultsList";

const useStyles = makeStyles({
  wrapper: {
    maxWidth: "800px",
    margin: "0 auto",
  },
});

const History = () => {
  const classes = useStyles();
  const { appData, setAppData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [displayData, setDisplayData] = useState(null);
  const shouldGetData = user && (!appData.length || appData.length < 11);

  useEffect(() => {
    if (shouldGetData) {
      getAllResults(user.uid)
        .then((results) => {
          setAppData(results);
        })
        .catch((err) => console.log(err));
    }
  }, [setAppData, user.uid, shouldGetData]);

  return (
    <>
      <Grid container className={classes.wrapper} justify="center">
        <FilterForm appData={appData} setDisplayData={setDisplayData} />
        <ResultsList data={displayData} />
      </Grid>
    </>
  );
};

export default History;
