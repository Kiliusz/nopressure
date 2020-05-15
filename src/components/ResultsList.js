import React, { useContext } from "react";
import moment from "moment";
import ResultCard from "./ResultCard";
import { DataContext } from "../helpers/DataContextProvider";

const ResultsList = () => {
  const { initialData } = useContext(DataContext);
  if (initialData) {
    return initialData.map(({ up, down, pulse, dateOfMeasurement }) => (
      <ResultCard
        key={Math.random()}
        upPressure={parseFloat(up)}
        downPressure={parseFloat(down)}
        pulse={parseFloat(pulse)}
        time={moment(new Date(parseFloat(dateOfMeasurement))).format("lll")}
      />
    ));
  }
  return null;
};

export default ResultsList;
