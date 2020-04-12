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
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import { RootState } from "../../Redux";
import { IUpdate } from "../../types";
import { getSecondsBetweenDates } from "../../utility";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  progress: {
    width: "100%",
    marginBottom: theme.spacing(2),
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
  const { loading, classes } = useUpdates();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table aria-label="updates table" size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress
                    className={clsx(
                      classes.progress,
                      loading ? null : classes.hidden
                    )}
                    variant="query"
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updates.map(({ description, date }) => (
                <TableRow key={date + description}>
                  <TableCell colSpan={3}>{description}</TableCell>
                  <TableCell align="right">{`${getSecondsBetweenDates(
                    new Date(date),
                    new Date(Date.now())
                  )} seconds ago`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default Updates;
