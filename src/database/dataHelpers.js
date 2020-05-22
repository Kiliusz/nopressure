const sortByProperty = (array, property = "dateOfMeasurement", direction = "desc") => {
  if (array) {
    const compare = (a, b) => {
      if (a[property] < b[property]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    };
    return array.sort(compare);
  }
  return array;
};
export default sortByProperty;

export const customFilter = (array, start, end, filterBy) => {
  let filtered = [];
  if (array) {
    if (start && !end) {
      filtered = array.filter((obj) => {
        return obj[filterBy] > start;
      });
      return filtered;
    }
    if (!start && end) {
      filtered = array.filter((obj) => {
        return obj[filterBy] < end;
      });
      return filtered;
    }
    if (start && end) {
      filtered = array.filter((obj) => {
        return obj[filterBy] > start && obj[filterBy] < end;
      });
      return filtered;
    }
  }
  return array;
};
