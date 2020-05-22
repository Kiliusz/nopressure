import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "1em 0.5em 4em 0.5em",
  },
});

const MainContent = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default MainContent;

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};
