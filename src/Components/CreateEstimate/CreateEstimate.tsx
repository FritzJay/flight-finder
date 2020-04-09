import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IBase } from "../../types";
import { RootState } from "../../Redux";
import { setDestination, setEmail } from "../../Redux/createEstimate";
import useCalculateEstimate from "../../hooks/useCalculateEstimate";
import BaseAutoComplete from "./BaseAutoComplete";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  textField: {
    width: "100%",
  },
}));

const useCreateEstimate = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const calculateEstimate = useCalculateEstimate();
  return useSelector((state: RootState) => ({
    classes,
    isCalculating: state.system.isCalculating,
    base: state.createEstimate.destination,
    handleBaseChange: (base: IBase | null) => dispatch(setDestination(base)),
    email: state.createEstimate.email,
    handleExecute: () => calculateEstimate(),
    handleEmailChange: (e: any) =>
      dispatch(setEmail(e.target.value === "" ? null : e.target.value)),
  }));
};

const CreateEstimate = () => {
  const {
    classes,
    isCalculating,
    base,
    email,
    handleBaseChange,
    handleExecute,
    handleEmailChange,
  } = useCreateEstimate();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Create Estimate</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <BaseAutoComplete
              label="Select Base"
              value={base}
              onChange={handleBaseChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              id="email"
              label="Email"
              variant="outlined"
              value={email || ""}
              onChange={handleEmailChange}
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
                Create Estimate
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CreateEstimate;
