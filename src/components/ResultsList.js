import React, { useContext } from "react";
import moment from "moment";
import ResultCard from "./ResultCard";
import { DataContext } from "../helpers/DataContextProvider";

const ResultsList = () => {
  const numberOfItemsToDisplay = 10;
  const listOfPressureResults = useContext(DataContext).slice(0, numberOfItemsToDisplay);

  return listOfPressureResults.map(({ up, down, pulse, timestamps }) => (
    <ResultCard
      key={timestamps}
      upPressure={up}
      downPressure={down}
      pulse={pulse}
      time={moment(new Date(timestamps)).format("lll")}
    />
  ));
};

export default ResultsList;
