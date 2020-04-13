import { useSelector } from "react-redux";
import { RootState } from "../Redux";
import { useCalculateFlights } from "./flights";

const useCalculateEstimate = () => {
  const { averages } = useSelector((state: RootState) => ({
    averages: state.settings.averages,
  }));
  const calculateFlights = useCalculateFlights();

  return async () => {
    if (averages.flights === true) calculateFlights();

    if (averages.lodging === true) console.log("TODO: Calculate lodging");

    if (averages.vehicles === true) console.log("TODO: Calculate vehicles");
  };
};

export default useCalculateEstimate;
