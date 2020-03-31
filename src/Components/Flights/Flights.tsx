import React from "react";
import { IAirport } from "../../interfaces";
import AirportSearchInput from "./AirportSearchInput/AirportSearchInput";
import { Grid, Button } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Flights = () => {
  const [fromAirport, setFromAirport]: [
    IAirport | undefined,
    any
  ] = React.useState();
  const [toAirport, setToAirport]: [
    IAirport | undefined,
    any
  ] = React.useState();
  const [departingDate, setDepartingDate] = React.useState<Date | null>(
    new Date(Date.now())
  );
  const [returningDate, setReturningDate] = React.useState<Date | null>(
    new Date(Date.now())
  );

  return (
    <React.Fragment>
      <Grid container spacing={3} justify="space-evenly">
        <Grid item xs={12} sm={6}>
          <AirportSearchInput
            setSelected={setFromAirport}
            label="Flying from"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AirportSearchInput setSelected={setToAirport} label="Destination" />
        </Grid>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Departing"
              inputVariant="outlined"
              value={departingDate}
              onChange={(date: Date | null) => setDepartingDate(date)}
              showTodayButton
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Returning"
              inputVariant="outlined"
              value={returningDate}
              onChange={(date: Date | null) => setReturningDate(date)}
              showTodayButton
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="secondary">
              Search
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
    </React.Fragment>
  );
};

export default Flights;
