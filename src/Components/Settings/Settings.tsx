import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { IBase } from "../../types";
import { RootState } from "../../Redux";
import { setSettingsOpen } from "../../Redux/system";
import { setDeparture } from "../../Redux/settings";
import Averages from "./Averages";
import Times from "./Times";
import BaseAutocomplete from "../CreateEstimate/BaseAutocomplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(3),
      background: theme.palette.background.paper,
    },
    button: {
      height: "100%",
    },
  })
);

const useSettings = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return useSelector((state: RootState) => ({
    classes,
    open: state.system.isSettingsOpen,
    departure: state.settings.departure,
    handleClose: () => dispatch(setSettingsOpen(false)),
    handleBaseChange: (base: IBase | null) => dispatch(setDeparture(base)),
  }));
};

const Settings = () => {
  const {
    classes,
    open,
    departure,
    handleClose,
    handleBaseChange,
  } = useSettings();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Settings"
      aria-describedby="Specify the types and methods of calculations."
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <BaseAutocomplete
          label="Default Departure"
          value={departure}
          onChange={handleBaseChange}
        />

        <Averages classes={classes} />

        <Times classes={classes} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
