import React from "react";
import {
  Chip,
  TableContainer,
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableRow,
  Typography,
  Link
} from "@material-ui/core";
import { AirplanemodeActive } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux";
import { setStep } from "../../Redux/system";

interface IChip {
  label: string;
  icon: any;
}

interface IRow {
  label: string;
  items: IChip[];
  total: number | undefined;
  step: number;
}

const useConfirmation = (): {
  rows: IRow[];
  setStep: (step: number) => void;
} => {
  const dispatch = useDispatch();
  return useSelector((state: RootState) => ({
    rows: [
      {
        label: "Flights",
        items:
          state.flights.selectedFlight !== null
            ? [
                {
                  label: `${state.flights.selectedFlight.airline}`,
                  icon: <AirplanemodeActive />
                }
              ]
            : [],
        total: state.flights.selectedFlight?.fare,
        step: 1
      },
      { label: "Lodging", items: [], total: undefined, step: 2 },
      { label: "Vehicles", items: [], total: undefined, step: 3 }
    ],
    setStep: (step: number) => dispatch(setStep(step))
  }));
};

const formatTotal = (total: number | undefined) =>
  total?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }) || "N/A";

const Confirmation = () => {
  const { rows, setStep } = useConfirmation();

  return (
    <TableContainer>
      <Typography variant="h6" style={{ margin: "1rem 1rem 1rem 2rem" }}>
        Totals
      </Typography>

      <Table>
        <TableBody>
          {rows.map(({ label, items, total, step }) => (
            <TableRow>
              <TableCell padding="checkbox">
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => setStep(step)}
                >
                  {label}
                </Link>
              </TableCell>
              <TableCell>
                {items.map(item => (
                  <Chip
                    label={item.label}
                    icon={item.icon}
                    clickable
                    color="primary"
                  />
                ))}
              </TableCell>
              <TableCell padding="checkbox" align="right">
                {formatTotal(total)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right" padding="checkbox">
              {rows
                .reduce((grandTotal, { total }) => grandTotal + (total || 0), 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2
                })}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Confirmation;
