import { Dispatch } from "redux";
import { IAirport, Links } from "../types";
import { setFlightsBatch } from "../Redux/flights";
import {
  removeLoadingLink,
  addLoadingLink,
  addActiveLink,
} from "../Redux/system";
import { queryFlights } from "../API/queryFlights";

export const calculateFlights = async (
  dispatch: Dispatch<any>,
  departure: IAirport,
  destination: IAirport,
  time: number
) => {
  console.log("Calculating flight averages for " + time);
  dispatch(addActiveLink(Links.Flights));
  dispatch(addLoadingLink(Links.Flights));

  const date = new Date(Date.now());
  date.setDate(date.getDate() + time);
  const flights = await queryFlights(departure, destination, date, 0, 2400);

  dispatch(setFlightsBatch(time, flights));
  dispatch(removeLoadingLink(Links.Flights));
  console.log("Finished calculating flight averages for " + time);
};
