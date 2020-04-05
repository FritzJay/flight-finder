import React from "react";
import {
  Grid,
  Typography,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import Averages from "./Averages";
import Times from "./Times";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
      background: theme.palette.background.paper,
    },
    button: {
      height: "100%",
    },
  })
);

const Settings = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Averages classes={classes} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Times classes={classes} />
      </Grid>
    </Grid>
  );
};

export default Settings;
