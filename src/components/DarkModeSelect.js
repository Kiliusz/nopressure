import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { FormControlLabel, Switch } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const DarkModeSelect = () => {
  const { darkMode, setDarkMode } = useTheme();
  const ChangeDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={darkMode}
          onChange={ChangeDarkMode}
          name="darkModeSwitch"
        />
      }
      label={
        <Brightness4Icon
          style={{
            verticalAlign: "middle",
            padding: "0.05em",
          }}
        />
      }
      labelPlacement="start"
    />
  );
};

export default DarkModeSelect;
