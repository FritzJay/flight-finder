import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "../../Redux";
import { setCalculating } from "../../Redux/system";
import AirportAutocomplete from "./AirportAutocomplete";
import { setDestination, setDeparture } from "../../Redux/createEstimate";

const useCreateEstimate = () => {
  const dispatch = useDispatch();
  return useSelector((state: RootState) => ({
    isCalculating: state.system.isCalculating,
    destination: state.createEstimate.destination,
    departure: state.createEstimate.departure,
    handleExecute: () => dispatch(setCalculating(true)),
    handleCancel: () => dispatch(setCalculating(false)),
  }));
};

const CreateEstimate = () => {
  const {
    isCalculating,
    destination,
    departure,
    handleExecute,
    handleCancel,
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
          <Button onClick={handleCancel}>Cancel</Button>
        </Grid>
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
