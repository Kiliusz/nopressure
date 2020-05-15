import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContextProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <RouteComponent {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
