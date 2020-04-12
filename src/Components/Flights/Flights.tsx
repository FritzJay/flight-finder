import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RootState } from "../../Redux";

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
  const [tab, setTab] = React.useState(0);
  return useSelector(({ flights }: RootState) => ({
    classes,
    batches: flights.batches,
    tab,

    handleTabChange: (_: any, value: number) => setTab(value),
  }));
};
const Flights = () => {
  const { classes, tab, handleTabChange, batches } = useFlights();

  return (
    <React.Fragment>
      {Object.keys(batches).map((time) => {
        const flights = batches[time];

        return (
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4">{time} days</Typography>
                </Grid>
                <Grid item xs={12} className={classes.flights}>
                  <List aria-label="flights">
                    <ListSubheader color="primary">Test</ListSubheader>
                    {flights.map((flight) => (
                      <ListItem>
                        <ListItemText>{flight}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })}

      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Grid container item xs={12} spacing={3}>
            <Typography variant="h4">Flights</Typography>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Flights;
