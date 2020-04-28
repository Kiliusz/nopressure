import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fill: theme.palette.secondary.main,
    animation: "$beating 0.9s infinite ",
    marginTop: "2em",
  },
  "@keyframes beating": {
    "0%": {
      transform: "scale(1)",
    },
    "20%": {
      transform: "scale(1.2)",
    },
    "40%": {
      transform: "scale(1)",
    },
    "65%": {
      transform: "scale(1.2)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

const BeatingHeart = ({ size }) => {
  const classes = useStyles();
  return (
    <div>
      <svg
        width={size}
        className={classes.root}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -28 512 512"
      >
        <path d="m471.4 44.6c-26.5-28.7-62.9-44.6-102.4-44.6-29.6 0-56.6 9.3-80.4 27.8-12 9.3-22.9 20.7-32.5 34-9.6-13.3-20.5-24.7-32.5-34-23.8-18.4-50.9-27.8-80.4-27.8-39.5 0-75.9 15.8-102.4 44.6-26.2 28.4-40.6 67.2-40.6 109.3 0 43.3 16.1 82.9 50.8 124.7 31 37.4 75.5 75.4 127.1 119.3 17.6 15 37.6 32 58.3 50.2 5.5 4.8 12.5 7.4 19.8 7.4 7.3 0 14.3-2.6 19.8-7.4 20.7-18.1 40.7-35.2 58.3-50.2 51.6-43.9 96.1-81.9 127.1-119.3 34.6-41.8 50.8-81.4 50.8-124.7 0-42.1-14.4-80.9-40.6-109.3zm0 0" />
      </svg>
    </div>
  );
};

export default BeatingHeart;

BeatingHeart.propTypes = {
  size: PropTypes.number.isRequired,
};
