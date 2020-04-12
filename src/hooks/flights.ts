import { Dispatch } from "redux";
import { IBase, Links } from "../types";
import {
  removeLoadingLink,
  addLoadingLink,
  addActiveLink,
} from "../Redux/system";
import { queryFlightAverages } from "../API/queryFlights";

export const calculateFlights = async (
  dispatch: Dispatch<any>,
  departure: IBase,
  destination: IBase,
  times: number[]
) => {
  console.log("Calculating flight averages for " + times);
  dispatch(addActiveLink(Links.Flights));
  dispatch(addLoadingLink(Links.Flights));

  const averages = await queryFlightAverages(departure, destination, times);

  dispatch(removeLoadingLink(Links.Flights));
  console.log("Finished calculating flight averages for " + times);
};
