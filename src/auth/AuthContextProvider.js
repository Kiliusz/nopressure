import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0zKDjGn1L7HhmeMVhnAQzhkcPNOpqK_4",
  authDomain: "nopressure-c3f97.firebaseapp.com",
  databaseURL: "https://nopressure-c3f97.firebaseio.com",
  projectId: "nopressure-c3f97",
  storageBucket: "nopressure-c3f97.appspot.com",
  messagingSenderId: "5439112905",
  appId: "1:5439112905:web:89fc2194727a7fab59ef18",
  measurementId: "G-NZRDPMX5QX",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const fstore = firebase.firestore();
export const AuthContext = createContext();

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
    render && (
      <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
    )
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
