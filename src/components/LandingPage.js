import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import BeatingHeart from "./BeatingHeart";

const useStyles = makeStyles((theme) => ({
  container: {},
  header: {
    marginTop: "2em",
  },
  typo: {
    margin: "1em 0",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2em",
    },
    color:
      theme.palette.type === "light" ? theme.palette.grey[700] : theme.palette.grey[100],
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} xs={12} spacing={3} justify="center">
      <Grid className={classes.header} item xs={12}>
        <Typography className={classes.typo} align="center" variant="h3">
          Start recording your blood pressure today!
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Sign up
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary">
          Login
        </Button>
      </Grid>
      <Grid align="center" item xs={12}>
        <BeatingHeart size={100} />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
