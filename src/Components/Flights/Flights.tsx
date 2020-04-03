import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Slider, Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IAirport, IFlight } from "../../interfaces";
import AirportSearchInput from "./AirportSearchInput";
import FlightsTable from "./FlightsTable";
import queryFlights from "../../API/queryFlights";
import { RootState } from "../../Redux";
import {
  setTo,
  setFrom,
  setDate,
  setTimeRange,
  setSelectedFlight
} from "../../Redux/flights";

const formatTime = (time: number) => {
  if (time === 0 || time === 2400) return "12am";
  else if (time > 1200) return `${(time / 100) % 12}pm`;
  else return `${time / 100}am`;
};

const useFlights = () => {
  const dispatch = useDispatch();
  return useSelector((state: RootState) => ({
    from: state.flights.from,
    to: state.flights.to,
    date: state.flights.date,
    timeRange: state.flights.timeRange,
    selectedFlight: state.flights.selectedFlight,
    handleToChange: (airport: IAirport | null) => dispatch(setTo(airport)),
    handleFromChange: (airport: IAirport | null) => dispatch(setFrom(airport)),
    handleDateChange: (date: Date | null) => dispatch(setDate(date)),
    handleTimeRangeChange: (timeRange: number[]) =>
      dispatch(setTimeRange(timeRange)),
    handleSelectFlight: (flight: IFlight | null) =>
      dispatch(setSelectedFlight(flight))
  }));
};

const Flights = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [flights, setFlights] = React.useState<IFlight[]>([]);
  const {
    from,
    to,
    date,
    timeRange,
    selectedFlight,
    handleToChange,
    handleFromChange,
    handleDateChange,
    handleTimeRangeChange,
    handleSelectFlight
  } = useFlights();

  const query = React.useCallback(async () => {
    if (from === null || to === null || date === null) return;

    setLoading(true);
    setFlights(await queryFlights(from, to, date, timeRange[0], timeRange[1]));
    setLoading(false);
  }, [from, to, date, timeRange]);

  return (
    <React.Fragment>
      <Grid container spacing={3} justify="space-evenly">
        <Grid item xs={12} sm={6}>
          <AirportSearchInput
            value={from}
            handleChange={handleFromChange}
            label="Flying from"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AirportSearchInput
            value={to}
            handleChange={handleToChange}
            label="Destination"
          />
        </Grid>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12}>
            <KeyboardDatePicker
              required
              label="Departing Date"
              inputVariant="outlined"
              value={date}
              onChange={handleDateChange}
              showTodayButton
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid
            item
            xs={8}
            container
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="h6" align="center">
                {formatTime(timeRange[0])}
              </Typography>
            </Grid>

            <Grid item xs={2} style={{ textAlign: "center" }}>
              <AccessTimeIcon fontSize="large" />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="h6" align="center">
                {formatTime(timeRange[1])}
              </Typography>
            </Grid>

            <Slider
              value={timeRange}
              onChange={(event: any, newValue: number | number[]) =>
                handleTimeRangeChange(newValue as number[])
              }
              step={100}
              min={0}
              max={2400}
              marks={[
                { value: 0, label: "12am" },
                { value: 2400, label: "12am" }
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
              disabled={
                loading ||
                from === null ||
                  to === null ||
                  date === null ||
                  timeRange === null
              }
              onClick={() => query()}
            >
              Search
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid item xs={12}>
          {(flights.length > 0 || selectedFlight !== null || loading) && (
            <FlightsTable
              data={flights}
              selectedFlight={selectedFlight}
              handleSelectFlight={handleSelectFlight}
              loading={loading}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Flights;
