import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { RootState } from "../../Redux";
import { IUpdate } from "../../types";
import { getTimeStringSinceDate } from "../../utility";

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    width: "100%",
  },
  hidden: {
    visibility: "hidden",
  },
}));

const useUpdates = () => {
  const classes = useStyles();
  return useSelector((state: RootState) => ({
    classes,
    loading: state.system.isCalculating,
  }));
};

const Updates = ({ updates }: { updates: IUpdate[] }) => {
  const { classes, loading } = useUpdates();
  const secondsAgo = updates.map((update) =>
    getTimeStringSinceDate(new Date(update.date))
  );

  return (
    <React.Fragment>
      <LinearProgress
        className={clsx(classes.progress, loading ? null : classes.hidden)}
        variant="query"
      />

      <TableContainer>
        <Table aria-label="updates table" size="small">
          <TableBody>
            {updates.map(({ description, date }, i) => (
              <TableRow key={date + description}>
                <TableCell colSpan={3}>{description}</TableCell>
                <TableCell align="right">{secondsAgo[i]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Updates;
