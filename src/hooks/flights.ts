import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { IBase, Links } from "../types";
import { RootState } from "../Redux";
import {
  removeLoadingLink,
  addLoadingLink,
  addActiveLink,
} from "../Redux/system";
import { addFlightsUpdate, setFlightsBatch } from "../Redux/flights";
import { queryFlights } from "../API/queryFlights";
import { getFutureDate } from "../utility";

export const useCalculateFlights = () => {
  const dispatch = useDispatch();
  const { departure, destination, times } = useSelector((state: RootState) => ({
    times: state.settings.times,
    departure: state.settings.departure,
    destination: state.createEstimate.destination,
  }));

  return () => {
    if (departure === null || destination === null) return;

    return calculateFlights(dispatch, departure, destination, times);
  };
};

export const calculateFlights = async (
  dispatch: Dispatch<any>,
  departure: IBase,
  destination: IBase,
  times: number[]
) => {
  console.log("Calculating flight averages for " + times);
  dispatch(addActiveLink(Links.Flights));
  dispatch(addLoadingLink(Links.Flights));

  for (const time of times) {
    const date = getFutureDate(time);
    const dateString = date.toLocaleDateString("us");

    dispatch(
      addFlightsUpdate({
        description: `Gathering flight information for ${dateString}.`,
      })
    );

    const flights = await queryFlights(departure, destination, date);
    dispatch(setFlightsBatch(time, flights));

    dispatch(
      addFlightsUpdate({
        description: `Found ${flights.length} potential flights on ${dateString}.`,
      })
    );
  }

  dispatch(removeLoadingLink(Links.Flights));
  console.log("Finished calculating flight averages for " + times);
};
