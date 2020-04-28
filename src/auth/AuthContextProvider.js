import React, { createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => (
  <AuthContext.Provider value={false}>{children}</AuthContext.Provider>
);
export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
