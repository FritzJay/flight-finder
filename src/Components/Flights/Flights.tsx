import React from "react";
import { Grid, Button, Slider, Typography } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IAirport, IFlight } from "../../interfaces";
import AirportSearchInput from "./AirportSearchInput";
import FlightsTable from "./FlightsTable";
import queryFlights from "../../API/queryFlights";

const formatTime = (time: number) => {
  if (time === 0) return "12am";
  else if (time > 12) return `${time % 12}pm`;
  else return `${time}am`;
};

const Flights = () => {
  const [active, setActive] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [from, setFrom]: [IAirport | undefined, any] = React.useState();
  const [to, setTo]: [IAirport | undefined, any] = React.useState();
  const [date, setDate] = React.useState<Date | null>(new Date(Date.now()));
  const [timeRange, setTimeRange] = React.useState<number[]>([0, 24]);
  const [flights, setFlights] = React.useState<IFlight[]>([]);

  const query = React.useCallback(async () => {
    if (from === undefined || to === undefined || date === null) return;

    setLoading(true);
    setFlights(await queryFlights(from, to, date, timeRange[0], timeRange[1]));
    setLoading(false);
  }, [from, to, date, timeRange]);

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
          <Grid item xs={12}>
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

          <Grid item xs={8} container justify="center" alignItems="center">
            <Typography variant="subtitle2" align="center">
              {formatTime(timeRange[0])} - {formatTime(timeRange[1])}
            </Typography>

            <Slider
              value={timeRange}
              onChange={(event: any, newValue: number | number[]) =>
                setTimeRange(newValue as number[])
              }
              step={1}
              min={0}
              max={23}
              marks={[
                { value: 0, label: "12am" },
                { value: 23, label: "11pm" }
              ]}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={formatTime}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={() => {
                setActive(true);
                query();
              }}
            >
              Search
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid item xs={12}>
          {active && <FlightsTable data={flights} loading={loading} />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Flights;
