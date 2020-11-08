import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@material-ui/core";
import Navbar from "./layout/Navbar";
import BottomMenu from "./layout/BottomMenu";
import MainContent from "./layout/MainContent";
import Home from "./pages/home";
import Charts from "./pages/charts";
import History from "./pages/history";
import DataContextProvider from "./database/DataContextProvider";
import ThemeContextProvider from "./layout/ThemeContextProvider";
import { AuthContext } from "./auth/AuthContextProvider";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";
import AddMeasurement from "./components/AddMeasurement";
import User from "./pages/userinfo";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeContextProvider>
        <DataContextProvider>
          <CssBaseline />
          <Grid container direction="column" style={{ minHeight: "100vh" }}>
            <Navbar />
            <MainContent>
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/charts" component={Charts} />
                <PrivateRoute path="/history" component={History} />
                <PrivateRoute path="/userinfo" component={User} />
                <Route path="/signup">{user ? <Redirect push to="/" /> : <Signup />}</Route>
                <Route path="/login">{user ? <Redirect push to="/" /> : <Login />}</Route>
              </Switch>
            </MainContent>
            {user && <AddMeasurement />}
            {user && <BottomMenu />}
          </Grid>
        </DataContextProvider>
      </ThemeContextProvider>
    </Router>
  );
}

export default App;
