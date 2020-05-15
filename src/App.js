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
import DataContextProvider from "./helpers/DataContextProvider";
import ThemeContextProvider from "./layout/ThemeContextProvider";
import { AuthContext } from "./auth/AuthContextProvider";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";
import AddResultForm from "./components/forms/AddResultForm";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
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
                <Route path="/history" component={History} />
                <Route path="/signup">
                  {user ? <Redirect push to="/" /> : <Signup />}
                </Route>
                <Route path="/login">{user ? <Redirect push to="/" /> : <Login />}</Route>
              </Switch>
              <AddResultForm />
            </MainContent>
            {user && <BottomMenu />}
          </Grid>
        </DataContextProvider>
      </ThemeContextProvider>
    </Router>
  );
}

export default App;
