import { IAirport } from "../types";
import { queryFlights } from "../API/queryFlights";

export const calculateFlights = (
  time: number,
  departure: IAirport,
  destination: IAirport
) => {
  const date = new Date(Date.now());
  date.setDate(date.getDate() + time);
  return queryFlights(departure, destination, date, 0, 2400);
};
