import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import * as Zoom from "chartjs-plugin-zoom";
import * as Annotation from "chartjs-plugin-annotation";
import moment from "moment";
import { DataContext } from "../database/DataContextProvider";
import { AuthContext } from "../auth/AuthContextProvider";
import { getAllResults } from "../database/databaseHelpers";

const Charts = () => {
  const { appData, setAppData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [chartData, setChartData] = useState({
    datesArr: [],
    systolicArr: [],
    diastolicArr: [],
    avgDia: null,
    avgSys: null,
  });
  const shouldGetData = user && (appData.length || appData.length < 11);

  const dataToChartArray = (data) => {
    let datesArr = [];
    let systolicArr = [];
    let diastolicArr = [];
    let avgSys = 120;
    let avgDia = 80;
    datesArr = data.map((obj) => moment(obj.dateOfMeasurement).format("ll")).reverse();
    systolicArr = data.map((obj) => obj.up).reverse();
    diastolicArr = data.map((obj) => obj.down).reverse();
    avgSys = Math.floor(systolicArr.reduce((a, b) => a + b) / systolicArr.length);
    avgDia = Math.floor(diastolicArr.reduce((a, b) => a + b) / diastolicArr.length);
    return { datesArr, systolicArr, diastolicArr, avgSys, avgDia };
  };

  useEffect(() => {
    if (shouldGetData) {
      getAllResults(user.uid)
        .then((results) => {
          setAppData(results);
          setChartData(dataToChartArray(appData));
        })
        .catch((err) => console.log(err));
    } else {
      setChartData(dataToChartArray(appData));
    }
  }, [setAppData, user.uid, shouldGetData]);
  console.log(chartData);
  const data = {
    labels: chartData.datesArr,
    datasets: [
      {
        label: "Systolic",
        data: chartData.systolicArr,
        fill: false,
        pointRadius: 2,
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
        lineTension: 0,
      },
      {
        label: "Diastolic",
        data: chartData.diastolicArr,
        backgroundColor: "#1565C0",
        borderColor: "#1565C0",
        fill: false,
        pointRadius: 2,
        borderWidth: 1,
        lineTension: 0,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
    responsive: true,
    tooltips: {
      enabled: true,
      mode: "x",
      intersect: false,
    },
    annotation: {
      annotations: [
        {
          drawTime: "afterDraw", // overrides annotation.drawTime if set
          id: "a-line-1", // optional
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: 120,
          borderColor: "green",
          borderWidth: 1,
          label: {
            backgroundColor: "rgba(0,255,0,0.3)",
            fontFamily: "sans-serif",
            fontSize: 13,
            fontStyle: "normal",
            fontColor: "black",
            xPadding: 6,
            yPadding: 6,
            cornerRadius: 6,
            position: "left",
            xAdjust: 0,
            yAdjust: 20,
            enabled: true,
            content: "Normal diastolic pressure",
          },
        },
        {
          drawTime: "afterDatasetsDraw", // overrides annotation.drawTime if set
          id: "a-line-3", // optional
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: chartData.avgDia,
          borderColor: "red",
          borderWidth: 1,
          label: {
            backgroundColor: "rgba(255,0,0,0.8)",
            fontFamily: "sans-serif",
            fontSize: 13,
            fontStyle: "normal",
            fontColor: "white",
            xPadding: 6,
            yPadding: 6,
            cornerRadius: 6,
            position: "right",
            xAdjust: 0,
            yAdjust: chartData.avgDia > 80 ? -20 : 20,
            enabled: true,
            content: `Average ${chartData.avgDia}`,
          },
        },
        {
          drawTime: "afterDraw", // overrides annotation.drawTime if set
          id: "a-line-2", // optional
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: 80,
          borderColor: "green",
          borderWidth: 1,
          label: {
            backgroundColor: "rgba(0,255,0,0.3)",
            fontFamily: "sans-serif",
            fontSize: 13,
            fontStyle: "normal",
            fontColor: "black",
            xPadding: 6,
            yPadding: 6,
            cornerRadius: 6,
            position: "left",
            xAdjust: 0,
            yAdjust: 20,
            enabled: true,
            content: "Normal systolic pressure",
          },
        },
        {
          drawTime: "afterDatasetsDraw", // overrides annotation.drawTime if set
          id: "a-line-4", // optional
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: chartData.avgSys,
          borderColor: "red",
          borderWidth: 1,
          label: {
            backgroundColor: "rgba(255,0,0,0.8)",
            fontFamily: "sans-serif",
            fontSize: 13,
            fontStyle: "normal",
            fontColor: "white",
            xPadding: 6,
            yPadding: 6,
            cornerRadius: 6,
            position: "right",
            xAdjust: 0,
            yAdjust: chartData.avgSys > 120 ? -20 : 20,
            enabled: true,
            content: `Average ${chartData.avgSys}`,
          },
        },
      ],
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
          speed: 2,
        },
        zoom: {
          enabled: true,
          mode: "x",
          speed: 2,
          threshold: 0,
          sensitivity: 0,
        },
      },
    },
  };
  return (
    <div style={{ margin: " 0 auto", maxWidth: "95%" }}>
      <div
        style={{
          position: "relative",
          height: "75vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        {chartData && chartData.avgDia && <Line data={data} options={options} />}
      </div>
    </div>
  );
};

export default Charts;
