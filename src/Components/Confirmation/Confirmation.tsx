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
  Link,
  Tooltip
} from "@material-ui/core";
import { AirplanemodeActive } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux";
import { setStep } from "../../Redux/system";
import { formatTotal } from "../../utility";

interface IChip {
  id: string;
  label: string;
  icon: any;
  tooltip: string;
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
  return useSelector((state: RootState) => {
    return {
      rows: [
        {
          label: "Flights",
          items: state.flights.selectedFlights.map(
            ({ fromAirportCode, toAirportCode, id, stops }) => ({
              label: `${fromAirportCode} → ${toAirportCode}`,
              icon: <AirplanemodeActive />,
              id: id,
              tooltip: `${stops} stop(s)`
            })
          ),
          total: state.flights.selectedFlights.reduce(
            (total, { fare }) => total + fare,
            0
          ),
          step: 2
        },
        { label: "Lodging", items: [], total: undefined, step: 3 },
        { label: "Vehicles", items: [], total: undefined, step: 4 }
      ],
      setStep: (step: number) => dispatch(setStep(step))
    };
  });
};

const Confirmation = () => {
  const { rows, setStep } = useConfirmation();

  return (
    <TableContainer>
      <Typography variant="h5" style={{ margin: "1rem 1rem 1rem 2rem" }}>
        Totals
      </Typography>

      <Table>
        <TableBody>
          {rows.map(({ label, items, total, step }) => (
            <TableRow key={label}>
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
                  <Tooltip title={item.tooltip}>
                    <Chip
                      key={item.id}
                      label={item.label}
                      icon={item.icon}
                      clickable
                      color="primary"
                    />
                  </Tooltip>
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
