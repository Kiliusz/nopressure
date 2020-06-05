import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import fbConfig from "./fbConfig";

firebase.initializeApp(fbConfig);

export const auth = firebase.auth();
export const fstore = firebase.firestore();
export const AuthContext = createContext();
export const createCredential = (email, password) => {
  return firebase.auth.EmailAuthProvider.credential(email, password);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((fbUser) => {
      setUser(fbUser);
      setRender(true);
    });
  }, []);

  return (
    render && <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
