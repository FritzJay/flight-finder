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
  Theme,
  CircularProgress,
  makeStyles,
  createStyles
} from "@material-ui/core";
import { IFlight } from "../../interfaces";

/* Sorting */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

/* Table Header */
interface IHeadCell {
  id: keyof IFlight;
  label: string;
  numeric: boolean;
}

const headCells: IHeadCell[] = [
  { id: "airline", numeric: false, label: "Airline" },
  { id: "cabin", numeric: false, label: "Cabin" },
  { id: "grade", numeric: false, label: "Grade" },
  { id: "duration", numeric: false, label: "Duration" },
  { id: "stops", numeric: true, label: "Stops" },
  { id: "fare", numeric: true, label: "Fare" }
];

const columns = headCells.length;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    },
    selected: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
  })
);

const FlightsTable = ({
  data,
  loading
}: {
  data: IFlight[];
  loading: boolean;
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IFlight>("fare");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string | null>(null);

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
      <Typography variant="h6" style={{ margin: "2rem" }}>
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
              .map(
                ({
                  id,
                  airline,
                  grade,
                  duration,
                  stops,
                  fare,
                  cabin
                }: IFlight) => (
                  <TableRow
                    hover={selected !== id}
                    className={selected === id ? classes.selected : ""}
                    onClick={() =>
                      selected === id ? setSelected(null) : setSelected(id)
                    }
                    tabIndex={-1}
                    key={id}
                  >
                    <TableCell>{airline}</TableCell>
                    <TableCell align="left">{cabin}</TableCell>
                    <TableCell align="left">{grade}</TableCell>
                    <TableCell align="left">{`${Math.floor(
                      duration / 60
                    )}h ${duration % 60}m`}</TableCell>
                    <TableCell align="right">{stops}</TableCell>
                    <TableCell align="right">
                      {fare.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2
                      })}
                    </TableCell>
                  </TableRow>
                )
              )
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

export default FlightsTable;
