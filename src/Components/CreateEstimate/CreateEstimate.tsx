import React from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "../../Redux";
import { setDestination, setDeparture } from "../../Redux/createEstimate";
import AirportAutocomplete from "./AirportAutocomplete";
import useCalculateEstimate from "../../hooks/useCalculateEstimate";

const useCreateEstimate = () => {
  const calculateEstimate = useCalculateEstimate();
  return useSelector((state: RootState) => ({
    isCalculating: state.system.isCalculating,
    destination: state.createEstimate.destination,
    departure: state.createEstimate.departure,
    handleExecute: () => calculateEstimate(),
  }));
};

const CreateEstimate = () => {
  const {
    isCalculating,
    destination,
    departure,
    handleExecute,
  } = useCreateEstimate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Create Estimate</Typography>
      </Grid>
      <Grid item xs={12}>
        <AirportAutocomplete
          label="Select Departure Airport"
          value={departure}
          setAirport={setDeparture}
        />
      </Grid>
      <Grid item xs={12}>
        <AirportAutocomplete
          label="Select Destination Airport"
          value={destination}
          setAirport={setDestination}
        />
      </Grid>
      <Grid container spacing={1} justify="flex-end" item xs={12}>
        <Grid item>
          <Button
            disabled={isCalculating}
            variant="contained"
            color="primary"
            onClick={handleExecute}
            startIcon={
              isCalculating ? <CircularProgress size={20} /> : <PlayArrowIcon />
            }
          >
            Calculate
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateEstimate;
