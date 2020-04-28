/* eslint-disable operator-linebreak */
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@material-ui/core";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import BottomMenu from "./layout/BottomMenu";
import MainContent from "./layout/MainContent";
import Home from "./pages/home";
import Charts from "./pages/charts";
import History from "./pages/history";
import DataContextProvider from "./helpers/DataContextProvider";
import ThemeContextProvider from "./layout/ThemeContextProvider";
import { AuthContext } from "./auth/AuthContextProvider";

function App() {
  const darkModeLocalStorage =
    localStorage.getItem("darkMode") === null
      ? false
      : JSON.parse(localStorage.getItem("darkMode"));

  const [darkMode, setDarkMode] = useState(darkModeLocalStorage);

  const hasUser = useContext(AuthContext);

  return (
    <Router>
      <ThemeContextProvider darkMode={darkMode}>
        <DataContextProvider>
          <CssBaseline />
          <Grid container direction="column" style={{ minHeight: "100vh" }}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <MainContent>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/charts" component={Charts} />
                <Route path="/history" component={History} />
              </Switch>
            </MainContent>
            {hasUser && <BottomMenu />}
            <Footer />
          </Grid>
        </DataContextProvider>
      </ThemeContextProvider>
    </Router>
  );
}

export default App;
