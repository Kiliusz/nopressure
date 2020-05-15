import React from "react";
import { Container, Typography, makeStyles, Paper } from "@material-ui/core";
import LoginForm from "../components/forms/LoginForm";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    marginTop: "0.3em",
    paddingTop: "1em",
  },
});

const Login = () => {
  const classes = useStyles();

  return (
    <Container component={Paper} className={classes.title} maxWidth="xs">
      <Typography alignText="center" variant="h5">
        Welcome back, please log in
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;
