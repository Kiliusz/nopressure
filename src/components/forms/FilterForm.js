import React, { useState, useEffect } from "react";
import { TextField, makeStyles, Button, Grid } from "@material-ui/core";
import { MobileDateRangePicker, LocalizationProvider } from "@material-ui/pickers";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import { customFilter } from "../../database/dataHelpers";

const useStyles = makeStyles({
  formText: {
    "& input": { padding: "0.6em 1em" },
  },
  formDate: {
    "& input": { padding: "0.6em 1em" },
  },
});

const FilterForm = ({ appData, setDisplayData }) => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState([null, null]);
  const [greater, setGreater] = useState("");
  const [less, setLess] = useState("");

  const handleFilterChange = () => {
    let filteredData = customFilter(appData, selectedDate[0], selectedDate[1], "dateOfMeasurement");
    filteredData = customFilter(filteredData, greater, less, "up");
    setDisplayData(filteredData);
  };

  const handleResetFilters = () => {
    handleDateChange([null, null]);
    setGreater("");
    setLess("");
  };

  useEffect(() => {
    if (appData && appData.length > 0) {
      handleFilterChange();
      console.log("useEffect handleFilter");
    }
  }, [appData, selectedDate, greater, less]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={10}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={MomentUtils}>
              <MobileDateRangePicker
                startText="From date"
                endText="To date"
                value={selectedDate}
                onChange={(date) => {
                  handleDateChange(date);
                }}
                renderInput={(startProps, endProps) => (
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        className={classes.formDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...startProps}
                        helperText=""
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        className={classes.formDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...endProps}
                        helperText=""
                      />
                    </Grid>
                  </Grid>
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.formText}
              id="greater"
              value={greater}
              label="Sys. greater than"
              type="number"
              onKeyDown={(e) => (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()}
              onChange={(e) => {
                setGreater(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.formText}
              id="less"
              value={less}
              label="Sys. less than"
              type="number"
              onKeyDown={(e) => (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()}
              onChange={(e) => {
                setLess(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item justify="center" xs={2}>
        <Button onClick={handleResetFilters} color="primary">
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterForm;
