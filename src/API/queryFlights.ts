import { IBase } from "../types";

interface IResponse {
  flightPath: string;
  flights: [
    {
      id: number;
      price: number;
    }
  ];
}

export const queryFlights = async (
  from: IBase,
  to: IBase,
  date: Date
): Promise<IResponse[]> => {
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
