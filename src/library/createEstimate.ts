import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux";
import { calculateFlights } from "./flights";
import { calculateLodging } from "./lodging";
import { calculateVehicles } from "./vehicles";

export const createEstimate = async () => {
  const dispatch = useDispatch();
  const { departure, destination, averages, times } = useSelector(
    ({ createEstimate, settings }: RootState) => ({
      departure: createEstimate.departure,
      destination: createEstimate.destination,
      averages: settings.averages,
      times: settings.times,
    })
  );

  if (departure === null || destination === null)
    throw new Error("Invalid departure or destination airports.");

  times.forEach(async (t) => {
    if (averages.flights === true)
      await calculateFlights(dispatch, t, departure, destination);
    if (averages.lodging === true) await calculateLodging(dispatch, t);
    if (averages.vehicles === true) await calculateVehicles(dispatch, t);
  });
};
