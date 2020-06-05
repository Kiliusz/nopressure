import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteButton from "./DeleteButton";

const useStyles = makeStyles((theme) => ({
  paperResult: {
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("xl")]: {
      padding: "0.8em 1em",
      margin: "0.3em 0em",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0.4em 0.4em",
      margin: "0.3em 0em",
    },
    fontSize: "1.1em",
  },
  unitFont: {
    color: "#808080",
    fontSize: "0.6em",
  },
  timeFont: {
    color: "#808080",
    fontSize: "0.8em",
  },
  warning: {
    position: "absolute",
    color: "red",
    left: "5px",

    [theme.breakpoints.down("xl")]: {
      left: "10%",
    },
    [theme.breakpoints.down("xs")]: {
      left: "2%",
    },
    fontWeight: "bold",
  },
  monthChange: {
    padding: "0.5em 2em",
    width: "100%",
  },
}));

const ResultCard = ({
  upPressure,
  downPressure,
  pulse,
  time,
  monthChange,
  firstMonthInRow,
  docId,
}) => {
  const isWarning = upPressure >= 135 || downPressure >= 90 || pulse >= 90;
  const classes = useStyles();
  return (
    <>
      {firstMonthInRow && (
        <div className={classes.monthChange}>
          {firstMonthInRow ? moment(time).format("MMMM") : ""}
        </div>
      )}
      {!!monthChange && (
        <div className={classes.monthChange}>{monthChange ? moment(time).format("MMMM") : ""}</div>
      )}
      <Paper className={classes.paperResult}>
        {isWarning && <div className={classes.warning}>!</div>}
        <Grid container justify="space-evenly" spacing={1}>
          <Grid item>
            {upPressure} / {downPressure} <span className={classes.unitFont}>mmHG</span>
          </Grid>
          <Grid item>
            {pulse} <span className={classes.unitFont}>bmp</span>
          </Grid>
          <Grid item>
            <Typography variant="caption" className={classes.timeFont}>
              {time}
            </Typography>
          </Grid>
        </Grid>
        <DeleteButton docId={docId} />
      </Paper>
    </>
  );
};

export default ResultCard;

ResultCard.propTypes = {
  upPressure: PropTypes.number.isRequired,
  downPressure: PropTypes.number.isRequired,
  pulse: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
};
