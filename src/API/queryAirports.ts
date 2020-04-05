import { IAirport } from "../types";

interface IResponse {
  AirRank: number;
  CarRank: number;
  Display: string;
  HotelRank: number;
  KeyType: string;
  LocID: string;
  Word: string;
  isCode: boolean;
  isFirst: boolean;
  nearbyAirports: [
    {
      code: string;
      name: string;
      isRail: boolean;
    }
  ];
}

export const queryAirports = async (filter: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/airports?queryparams={"searchString":"${filter}"}`
  );
  const cities: IResponse[] = await response.json();

  const list: IAirport[] = [];

  cities.forEach(({ Display, nearbyAirports, LocID }) => {
    nearbyAirports?.forEach(({ code, name }) =>
      list.push({
        code,
        name,
        locID: LocID,
        city: Display,
      })
    );
  });

  return [...list];
};
