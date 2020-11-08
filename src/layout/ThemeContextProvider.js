/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const ThemeContextProvider = ({ children }) => {
  const darkModeLocSt =
    localStorage.getItem("darkMode") === null
      ? false
      : JSON.parse(localStorage.getItem("darkMode"));

  const [darkMode, setDarkMode] = useState(darkModeLocSt);

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: { fontSize: "0.9em" },
      },
    },
    darkMode,
    setDarkMode,
    palette: {
      primary: {
        main: darkMode ? "#4587d1" : "#1565c0",
      },
      secondary: {
        main: "#e53935",
      },
      type: darkMode ? "dark" : "light",
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContextProvider;

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
