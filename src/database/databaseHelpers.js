import { fstore } from "../auth/AuthContextProvider";

export const makeUser = (name, userId, gender, email) => {
  return fstore.collection("Users").doc(userId).set({
    name,
    gender,
    createdAt: new Date().getTime(),
    email,
  });
};

const resultsCollectionRef = (userId) =>
  fstore.collection(`Results/${userId}/UserResults`);

export const addResult = (userId, up, down, pulse, dateOfMeasurement) => {
  return resultsCollectionRef(userId).add({
    up,
    down,
    pulse,
    dateOfMeasurement,
  });
};

export const getAllResults = async (userId) => {
  const data = [];
  await resultsCollectionRef(userId)
    .orderBy("dateOfMeasurement", "desc")
    .get()
    .then((docs) => docs.forEach((doc) => data.push({ docId: doc.id, ...doc.data() })))
    .catch((err) => data.push(err));
  return data;
};

export const getResults = async (userId, resultNumber = 10) => {
  const data = [];
  await resultsCollectionRef(userId)
    .orderBy("dateOfMeasurement", "desc")
    .limit(resultNumber)
    .get()
    .then((docs) => docs.forEach((doc) => data.push({ docId: doc.id, ...doc.data() })))
    .catch((err) => data.push(err));
  return data;
};
