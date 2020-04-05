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
import Averages from "./Averages";
import Times from "./Times";
import { RootState } from "../../Redux";
import { setSettingsOpen } from "../../Redux/system";

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
    handleClose: () => dispatch(setSettingsOpen(false)),
  }));
};

const Settings = () => {
  const { classes, open, handleClose } = useSettings();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Settings"
      aria-describedby="Specify the types and methods of calculations."
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
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
