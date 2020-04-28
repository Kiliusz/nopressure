import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import dummyData from "./dummyData";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [mainData, setMainData] = useState(dummyData);

  return <DataContext.Provider value={mainData}>{children}</DataContext.Provider>;
};

export default DataContextProvider;

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
