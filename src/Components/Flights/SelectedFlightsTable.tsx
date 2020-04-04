import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
  Button
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import {
  getComparator,
  stableSort,
  IHeadCell,
  useStyles,
  Order
} from "./TableUtility";
import { IFlight } from "../../interfaces";
import { formatTotal } from "../../utility";

const headCells: IHeadCell[] = [
  { id: "airline", numeric: false, label: "Airline" },
  { id: "cabin", numeric: false, label: "Cabin" },
  { id: "grade", numeric: false, label: "Grade" },
  { id: "duration", numeric: false, label: "Duration" },
  { id: "stops", numeric: true, label: "Stops" },
  { id: "fare", numeric: true, label: "Fare" }
];

const columns = headCells.length + 1;

const SelectedFlightsTable = ({
  flights,
  handleUnselectFlight
}: {
  flights: IFlight[];
  handleUnselectFlight: (flight: IFlight) => void;
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IFlight>("fare");

  const handleRequestSort = (property: keyof IFlight) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Typography variant="h6" style={{ margin: "1rem 1rem 1rem 2rem" }}>
        Selected Flights
      </Typography>

      <Table size="small" aria-label="selected flights">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" align="center">
              Remove
            </TableCell>
            {headCells.map(({ id, label, numeric }) => (
              <TableCell
                key={id}
                align={numeric ? "right" : "left"}
                sortDirection={orderBy === id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : "asc"}
                  onClick={() => handleRequestSort(id)}
                >
                  {label}
                  {orderBy === id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {flights.length === 0 && (
            <TableRow tabIndex={-1}>
              <TableCell colSpan={columns}>
                Search for, and select flights from the list below.
              </TableCell>
            </TableRow>
          )}

          {stableSort(flights, getComparator(order, orderBy)).map(
            (flight: IFlight) => (
              <TableRow hover={false} tabIndex={-1} key={flight.id}>
                <TableCell padding="checkbox">
                  <Button onClick={() => handleUnselectFlight(flight)}>
                    <Delete />
                  </Button>
                </TableCell>
                <TableCell>{flight.airline}</TableCell>
                <TableCell align="left">{flight.cabin}</TableCell>
                <TableCell align="left">{flight.grade}</TableCell>
                <TableCell align="left">{`${Math.floor(
                  flight.duration / 60
                )}h ${flight.duration % 60}m`}</TableCell>
                <TableCell align="right">{flight.stops}</TableCell>
                <TableCell align="right">
                  {flight.fare.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2
                  })}
                </TableCell>
              </TableRow>
            )
          )}
          <TableRow>
            <TableCell colSpan={columns - 2} />
            <TableCell align="right">Total:</TableCell>
            <TableCell align="right">
              {formatTotal(
                flights.reduce((total, { fare }) => total + fare, 0)
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectedFlightsTable;
