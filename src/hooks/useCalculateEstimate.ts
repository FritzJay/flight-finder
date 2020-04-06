import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateFlights } from "./flights";
import { calculateLodging } from "./lodging";
import { calculateVehicles } from "./vehicles";
import { RootState } from "../Redux";
import { setFlights } from "../Redux/flights";
import {
  addLoadingLink,
  removeLoadingLink,
  setCalculating,
  addActiveLink,
} from "../Redux/system";
import { Links, IAirport, IAverages } from "../types";
import { Dispatch } from "redux";

const useCalculateEstimate = () => {
  const dispatch = useDispatch();
  const { departure, destination, times, averages } = useSelector(
    (state: RootState) => ({
      departure: state.createEstimate.departure,
      destination: state.createEstimate.destination,
      times: state.settings.times,
      averages: state.settings.averages,
    })
  );

  return useCallback(() => {
    if (departure === null || destination === null)
      throw new Error("Invalid departure or destination airport.");

    calculateEstimate(dispatch, departure, destination, times, averages);
  }, [dispatch, departure, destination, times, averages]);
};

const calculateEstimate = async (
  dispatch: Dispatch<any>,
  departure: IAirport,
  destination: IAirport,
  times: number[],
  averages: IAverages
) => {
  console.log("calculating estimate");
  dispatch(setCalculating(true) as any);

  for (const t of times) {
    if (
      averages.flights === true &&
      departure !== null &&
      destination !== null
    ) {
      console.log("Calculating flight averages for " + t);
      dispatch(addActiveLink(Links.Flights));
      dispatch(addLoadingLink(Links.Flights));
      const flights = await calculateFlights(t, departure, destination);
      dispatch(setFlights(flights));
      dispatch(removeLoadingLink(Links.Flights));
      console.log("Finished calculating flight averages for " + t);
    }

    if (averages.lodging === true) await calculateLodging(dispatch, t);

    if (averages.vehicles === true) await calculateVehicles(dispatch, t);
  }

  dispatch(setCalculating(false) as any);
  console.log("finished calculating estimate");
};

export default useCalculateEstimate;
