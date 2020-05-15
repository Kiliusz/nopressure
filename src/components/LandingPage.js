import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Container } from "@material-ui/core";
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
    <Container>
      <Grid container className={classes.container} spacing={3} justify="center">
        <Grid className={classes.header} item xs={12}>
          <Typography className={classes.typo} align="center" variant="h3">
            Start tracking your blood pressure today!
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/signup">
            Sign up
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" component={Link} to="/login">
            Login
          </Button>
        </Grid>
        <Grid align="center" item xs={12}>
          <BeatingHeart size={120} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
