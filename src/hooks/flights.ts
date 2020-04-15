import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { IBase, Links } from "../types";
import { RootState } from "../Redux";
import {
  removeLoadingLink,
  addLoadingLink,
  addActiveLink,
  setCalculating,
} from "../Redux/system";
import {
  addFlightsUpdate,
  setFlightsBatch,
  clearFlightsUpdates,
} from "../Redux/flights";
import { queryFlights } from "../API/queryFlights";
import { getFutureDate } from "../utility";

export const useCalculateFlights = () => {
  const dispatch = useDispatch();
  const { departure, destination, times } = useSelector((state: RootState) => ({
    times: state.settings.times,
    departure: state.settings.departure,
    destination: state.createEstimate.destination,
  }));

  return async () => {
    if (departure === null || destination === null) return;

    dispatch(clearFlightsUpdates());
    dispatch(setCalculating(true));
    try {
      await calculateFlights(dispatch, departure, destination, times);
    } finally {
      dispatch(setCalculating(false));
    }
  };
};

export const calculateFlights = async (
  dispatch: Dispatch<any>,
  departure: IBase,
  destination: IBase,
  times: number[]
) => {
  dispatch(addActiveLink(Links.Flights));
  dispatch(addLoadingLink(Links.Flights));

  try {
    for (const time of times) {
      const date = getFutureDate(time);
      const dateString = date.toLocaleDateString("us");

      dispatch(
        addFlightsUpdate(
          `Gathering flight information for ${dateString}.`,
          new Date(Date.now())
        )
      );

      const flights = await queryFlights(departure, destination, date);
      const numberOfAvailableFlights = flights.flightsInformation.reduce(
        (total, next) => total + next.flights.length,
        0
      );
      dispatch(setFlightsBatch(flights));

      dispatch(
        addFlightsUpdate(
          `Found ${numberOfAvailableFlights} potential flight${
            numberOfAvailableFlights > 1 || numberOfAvailableFlights === 0
              ? "s"
              : ""
          } on ${dateString}.`,
          new Date(Date.now())
        )
      );
    }
  } finally {
    dispatch(removeLoadingLink(Links.Flights));
  }
};
