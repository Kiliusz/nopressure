import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [appData, setAppData] = useState([]);

  return (
    <DataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
