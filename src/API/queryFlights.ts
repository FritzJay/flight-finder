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

interface IPossibleFlight {
  departure: IAirport;
  arrival: IAirport;
}

interface IAirport {
  id: number;
  name: string;
  code: string;
  locID: string;
  city: string | null;
  notes: string | null;
  distance: string | null;
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
  }&date="${date.toLocaleDateString().replace(/\//g, "-")}`;

export default queryFlights;
