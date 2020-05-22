import React from "react";
import moment from "moment";
import ResultCard from "./ResultCard";

const ResultsList = ({ data }) => {
  if (data) {
    return data.map(({ up, down, pulse, dateOfMeasurement, docId }, index, array) => {
      const monthChange =
        new Date(dateOfMeasurement).getMonth() -
        new Date(array[index ? index - 1 : index].dateOfMeasurement).getMonth();
      return (
        <ResultCard
          firstMonthInRow={index === 0 ? dateOfMeasurement : false}
          monthChange={monthChange}
          key={docId}
          upPressure={parseFloat(up)}
          downPressure={parseFloat(down)}
          pulse={parseFloat(pulse)}
          time={moment(new Date(parseFloat(dateOfMeasurement))).format("Y/MM/DD HH:mm")}
        />
      );
    });
  }
  return null;
};

export default ResultsList;
