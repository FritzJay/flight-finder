import React, { useState } from "react";
import {
  TableContainer,
  TablePagination,
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
  CircularProgress
} from "@material-ui/core";
import {
  getComparator,
  stableSort,
  IHeadCell,
  useStyles,
  Order
} from "./TableUtility";
import { IFlight } from "../../interfaces";

const headCells: IHeadCell[] = [
  { id: "airline", numeric: false, label: "Airline" },
  { id: "cabin", numeric: false, label: "Cabin" },
  { id: "grade", numeric: false, label: "Grade" },
  { id: "duration", numeric: false, label: "Duration" },
  { id: "stops", numeric: true, label: "Stops" },
  { id: "fare", numeric: true, label: "Fare" }
];

const columns = headCells.length;

const AvailableFlightsTable = ({
  data,
  loading,
  selectedFlights,
  handleSelectFlight
}: {
  data: IFlight[];
  loading: boolean;
  selectedFlights: IFlight[];
  handleSelectFlight: (flight: IFlight, isSelected: boolean) => void;
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IFlight>("fare");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property: keyof IFlight) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Typography variant="h6" style={{ margin: "1rem 1rem 1rem 2rem" }}>
        Available Flights
      </Typography>

      <Table size="small" aria-label="available flights">
        <TableHead>
          <TableRow>
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
          {data.length === 0 && !loading && (
            <TableRow tabIndex={-1}>
              <TableCell colSpan={columns}>
                There are no flights available at this time.
              </TableCell>
            </TableRow>
          )}

          {loading ? (
            <TableRow>
              <TableCell colSpan={columns} style={{ textAlign: "center" }}>
                <CircularProgress size={36} />
              </TableCell>
            </TableRow>
          ) : (
            stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((flight: IFlight) => {
                const isSelected = selectedFlights.some(
                  f => f.id === flight.id
                );

                return (
                  <TableRow
                    hover={!isSelected}
                    className={isSelected ? classes.selected : ""}
                    onClick={() => handleSelectFlight(flight, isSelected)}
                    tabIndex={-1}
                    key={flight.id}
                  >
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
                );
              })
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={columns}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default AvailableFlightsTable;
