import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import HistoryIcon from "@material-ui/icons/History";
import PropTypes from "prop-types";

const BottomMenu = ({ location }) => {
  //   const classes = useStyles();

  const [value, setValue] = useState(location.pathname);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
      showLabels
      // className={classes.root}
    >
      <BottomNavigationAction
        value="/"
        component={Link}
        to="/"
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        value="/charts"
        component={Link}
        to="/charts"
        label="Charts"
        icon={<ShowChartIcon />}
      />
      <BottomNavigationAction
        component={Link}
        value="/history"
        to="/history"
        label="History"
        icon={<HistoryIcon />}
      />
    </BottomNavigation>
  );
};

export default withRouter(BottomMenu);

BottomMenu.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};
