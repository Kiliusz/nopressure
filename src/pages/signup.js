import React from "react";
import { Container, Typography, makeStyles, Paper } from "@material-ui/core";
import SignUpForm from "../components/forms/SignUpForm";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    marginTop: "0.3em",
    paddingTop: "1em",
  },
});

const Signup = () => {
  const classes = useStyles();

  return (
    <Container component={Paper} className={classes.title} maxWidth="xs">
      <Typography alignText="center" variant="h5">
        Sign up and start using app
      </Typography>
      <SignUpForm />
    </Container>
  );
};

export default Signup;
