import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  Slider,
  Typography,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IAirport, IFlight } from "../../interfaces";
import AirportSearchInput from "./AirportSearchInput";
import AvailableFlightsTable from "./AvailableFlightsTable";
import SelectedFlightsTable from "./SelectedFlightsTable";
import queryFlights from "../../API/queryFlights";
import { RootState } from "../../Redux";
import {
  setTo,
  setFrom,
  setDate,
  setIsRoundTrip,
  setTimeRange,
  unselectFlight,
  selectFlight,
  setFlights
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
    isRoundTrip: state.flights.isRoundTrip,
    timeRange: state.flights.timeRange,
    selectedFlights: state.flights.selectedFlights,
    flights: state.flights.flights,
    handleToChange: (airport: IAirport | null) => dispatch(setTo(airport)),
    handleFromChange: (airport: IAirport | null) => dispatch(setFrom(airport)),
    handleDateChange: (date: Date | null) => dispatch(setDate(date)),
    handleIsRoundTripChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setIsRoundTrip(event.target.checked)),
    handleTimeRangeChange: (timeRange: number[]) =>
      dispatch(setTimeRange(timeRange)),
    handleSelectFlight: (flight: IFlight, isSelected: boolean) =>
      isSelected
        ? dispatch(unselectFlight(flight))
        : dispatch(selectFlight(flight)),
    setFlights: (flights: IFlight[]) => dispatch(setFlights(flights))
  }));
};

const Flights = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    from,
    to,
    date,
    isRoundTrip,
    timeRange,
    selectedFlights,
    flights,
    handleToChange,
    handleFromChange,
    handleDateChange,
    handleIsRoundTripChange,
    handleTimeRangeChange,
    handleSelectFlight,
    setFlights
  } = useFlights();

  const query = React.useCallback(async () => {
    if (from === null || to === null || date === null) return;

    setLoading(true);
    setFlights(await queryFlights(from, to, date, timeRange[0], timeRange[1]));
    setLoading(false);
  }, [from, to, date, timeRange, setFlights]);

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
          <Grid item xs={12} sm={6}>
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
            container
            xs={12}
            sm={6}
            justify="flex-start"
            alignContent="center"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRoundTrip}
                  onChange={handleIsRoundTripChange}
                  name="isRoundTrip"
                  color="primary"
                />
              }
              label="Round Trip"
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
              <Typography variant="body2" align="center">
                {formatTime(timeRange[0])}
              </Typography>
            </Grid>

            <Grid item xs={2} style={{ textAlign: "center" }}>
              <AccessTimeIcon fontSize="small" />
            </Grid>

            <Grid item xs={2}>
              <Typography variant="body2" align="center">
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
          {
            <SelectedFlightsTable
              flights={selectedFlights}
              handleUnselectFlight={(flight: IFlight) =>
                handleSelectFlight(flight, true)
              }
            />
          }
        </Grid>

        <Grid item xs={12}>
          {(flights.length > 0 || loading) && (
            <AvailableFlightsTable
              data={flights}
              selectedFlights={selectedFlights}
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
