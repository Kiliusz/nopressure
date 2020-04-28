import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paperResult: {
    padding: "1em 1em",
    margin: "0.5em 1em",
  },
  timeFont: {
    color: "#808080",
  },
});

const ResultCard = ({ upPressure, downPressure, pulse, time }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paperResult}>
      <Grid container justify="space-evenly" spacing={3}>
        <Grid item>
          {upPressure}/{downPressure} <span className={classes.timeFont}>mmHG</span>
        </Grid>
        <Grid item>
          {pulse} <span className={classes.timeFont}>bmp</span>
        </Grid>
        <Grid item>
          <Typography variant="caption" className={classes.timeFont}>
            {time}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultCard;

ResultCard.propTypes = {
  upPressure: PropTypes.number.isRequired,
  downPressure: PropTypes.number.isRequired,
  pulse: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
};
