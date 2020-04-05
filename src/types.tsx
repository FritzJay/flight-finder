export enum Links {
  CreateEstimate,
  Flights,
  Lodging,
  Vehicles,
}

export interface IAirport {
  name: string;
  code: string;
  city: string;
  locID: string;
}

export interface IFlight {
  id: string;
  airline: string;
  grade: string;
  duration: number;
  stops: number;
  fare: number;
  cabin: string;
  fromAirportCode: string;
  toAirportCode: string;
}

/* Redux */

export interface ISystemState {
  selectedLink: number;
  activeLinks: Links[];
  loadingLinks: Links[];
  isDrawerOpen: boolean;
  isSettingsOpen: boolean;
}

export interface ISettingsState {
  averages: {
    flights: boolean;
    lodging: boolean;
    vehicles: boolean;
  };
  times: number[];
}

export interface IFlightsState {
  flights: IFlight[];
}
