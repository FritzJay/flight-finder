import { IBase } from "../types";

export interface IFlightsResponse {
  flightDate: string;
  flightsInformation: IFlightInformation[];
}

interface IFlightInformation {
  flightPath: string;
  flights: IAvailableFlight[];
  averagePrice: number;
}

interface IAvailableFlight {
  id: number;
  price: number;
}

export const queryFlights = async (
  from: IBase,
  to: IBase,
  date: Date
): Promise<IFlightsResponse> => {
  const response = await fetch(
    process.env.REACT_APP_API_URL +
      `/flightsFromBaseToBase?${formatFlightQueryParameters(from, to, date)}`
  );
  return await response.json();
};

export const formatFlightQueryParameters = (
  from: IBase,
  to: IBase,
  date: Date
) =>
  `departureBaseId=${from.id}&arrivalBaseId=${
    to.id
  }&date=${date.toISOString()}`;

export default queryFlights;
