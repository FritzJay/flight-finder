import React from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IAirport, IFlight } from "../../interfaces";
import AirportSearchInput from "./AirportSearchInput";
import FlightsTable from "./FlightsTable";
import queryFlights from "../../API/queryFlights";

const Flights = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [from, setFrom]: [IAirport | undefined, any] = React.useState();
  const [to, setTo]: [IAirport | undefined, any] = React.useState();
  const [date, setDate] = React.useState<Date | null>(new Date(Date.now()));
  const [timeStart, setTimeStart] = React.useState<Date | null>(null);
  const [timeEnd, setTimeEnd] = React.useState<Date | null>(null);
  const [flights, setFlights] = React.useState<IFlight[]>([]);

  const query = React.useCallback(async () => {
    if (from === undefined || to === undefined || date === null) return;

    setLoading(true);
    setFlights(await queryFlights(from, to, date, timeStart, timeEnd));
    setLoading(false);
  }, [from, to, date, timeStart, timeEnd]);

  return (
    <React.Fragment>
      <Grid container spacing={3} justify="space-evenly">
        <Grid item xs={12} sm={6}>
          <AirportSearchInput setSelected={setFrom} label="Flying from" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AirportSearchInput setSelected={setTo} label="Destination" />
        </Grid>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12} sm={12}>
            <KeyboardDatePicker
              required
              label="Departing Date"
              inputVariant="outlined"
              value={date}
              onChange={(date: Date | null) => setDate(date)}
              showTodayButton
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KeyboardTimePicker
              label="Start"
              value={timeStart}
              onChange={(date: Date | null) => setTimeStart(date)}
              KeyboardButtonProps={{
                "aria-label": "change start time"
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KeyboardTimePicker
              label="End"
              value={timeEnd}
              onChange={(date: Date | null) => setTimeEnd(date)}
              KeyboardButtonProps={{
                "aria-label": "change end time"
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={() => {
                query();
              }}
            >
              Search
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid item xs={12}>
          {flights.length > 0 && <FlightsTable data={flights} />}
        </Grid>
      </Grid>

      {loading && (
        <Grid container item xs={12} justify="center">
          <CircularProgress size={36} />
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Flights;
