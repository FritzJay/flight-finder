import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateFlights } from "./flights";
import { calculateLodging } from "./lodging";
import { calculateVehicles } from "./vehicles";
import { RootState } from "../Redux";
import { setCalculating } from "../Redux/system";
import { IAverages, IBase } from "../types";
import { Dispatch } from "redux";

const useCalculateEstimate = () => {
  const dispatch = useDispatch();
  const { departure, destination, times, averages } = useSelector(
    (state: RootState) => ({
      departure: state.settings.departure,
      destination: state.createEstimate.destination,
      times: state.settings.times,
      averages: state.settings.averages,
    })
  );

  return useCallback(() => {
    if (destination === null || departure === null) return;

    calculateEstimate(dispatch, departure, destination, times, averages);
  }, [dispatch, departure, destination, times, averages]);
};

const calculateEstimate = async (
  dispatch: Dispatch<any>,
  departure: IBase,
  destination: IBase,
  times: number[],
  averages: IAverages
) => {
  console.log("calculating estimate");
  dispatch(setCalculating(true));
  try {
    if (averages.flights === true)
      await calculateFlights(dispatch, departure, destination, times);

    if (averages.lodging === true)
      await calculateLodging(dispatch, departure, destination, times);

    if (averages.vehicles === true)
      await calculateVehicles(dispatch, departure, destination, times);
  } finally {
    dispatch(setCalculating(false));
    console.log("finished calculating estimate");
  }
};

export default useCalculateEstimate;
