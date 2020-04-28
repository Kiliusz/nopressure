import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import { orange, green, blue, red, indigo } from "@material-ui/core/colors";
import PropTypes from "prop-types";

const ThemeContextProvider = ({ children, darkMode }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#1565c0",
        // main: blue[500],
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
  darkMode: PropTypes.bool.isRequired,
};
