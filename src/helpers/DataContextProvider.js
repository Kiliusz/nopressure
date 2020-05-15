import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { getAllResults, getResults } from "../database/databaseHelpers";
import { AuthContext } from "../auth/AuthContextProvider";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [initialData, setInitialData] = useState(null);
  const [allData, setAllData] = useState(null);

  // useEffect(() => {
  //   if (user) {
  //     console.log("useffect datacontext");
  //     getResults(user.uid, 10)
  //       .then((results) => {
  //         setInitialData(results);
  //         // console.log(results);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  return (
    <DataContext.Provider value={{ initialData, setInitialData, allData, setAllData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
