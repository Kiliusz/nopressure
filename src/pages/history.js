import React, { useContext, useEffect } from "react";
import { DataContext } from "../helpers/DataContextProvider";
import { getAllResults } from "../database/databaseHelpers";
import { AuthContext } from "../auth/AuthContextProvider";

const History = () => {
  const { allData, setAllData } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect  History");
    if (!allData) {
      getAllResults(user.uid)
        .then((results) => {
          setAllData(results);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <p1>
      <pre>{JSON.stringify(allData, null, 2)}</pre>
    </p1>
  );
};

export default History;
