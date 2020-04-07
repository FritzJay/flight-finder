import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "../../Redux";
import { setDestination, setDeparture } from "../../Redux/createEstimate";
import AirportAutocomplete from "./AirportAutocomplete";
import useCalculateEstimate from "../../hooks/useCalculateEstimate";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const useCreateEstimate = () => {
  const classes = useStyles();
  const calculateEstimate = useCalculateEstimate();
  return useSelector((state: RootState) => ({
    classes,
    isCalculating: state.system.isCalculating,
    destination: state.createEstimate.destination,
    departure: state.createEstimate.departure,
    handleExecute: () => calculateEstimate(),
  }));
};

const CreateEstimate = () => {
  const {
    classes,
    isCalculating,
    destination,
    departure,
    handleExecute,
  } = useCreateEstimate();

  return (
    <Grid item xs={12} spacing={3}>
      <Paper className={classes.paper}>
        <Grid container item xs={12} spacing={3}>
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
                  isCalculating ? (
                    <CircularProgress size={20} />
                  ) : (
                    <PlayArrowIcon />
                  )
                }
              >
                Calculate
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CreateEstimate;
