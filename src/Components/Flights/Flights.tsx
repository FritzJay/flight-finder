import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RootState } from "../../Redux";
import Updates from "../Updates/Updates";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  flights: {
    position: "relative",
    overflow: "auto",
    maxHeight: "300px",
  },
}));

const useFlights = () => {
  const classes = useStyles();
  return useSelector(({ flights }: RootState) => ({
    classes,
    updates: flights.updates,
    batches: flights.batches,
  }));
};

const Flights = () => {
  const { classes, updates, batches } = useFlights();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">Flights</Typography>
            </Grid>
            <Updates updates={updates} />
          </Grid>
        </Paper>
      </Grid>

      {Object.keys(batches).map((time) => {
        const batch = batches[time];
        console.log(batch);

        return (
          <Grid key={time} item xs={12}>
            <Paper className={classes.paper}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6"></Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Flights;
