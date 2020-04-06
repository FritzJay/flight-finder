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

export interface IStep {
  description: string;
}

/* Redux */

export interface ISystemState {
  selectedLink: number;
  activeLinks: Links[];
  loadingLinks: Links[];
  isDrawerOpen: boolean;
  isSettingsOpen: boolean;
  isCalculating: boolean;
}

export interface IAverages {
  flights: boolean;
  lodging: boolean;
  vehicles: boolean;
}

export interface ISettingsState {
  averages: IAverages;
  times: number[];
}

export interface ICreateEstimateState {
  destination: IAirport | null;
  departure: IAirport | null;
}

export interface IFlightsState {
  steps: IStep[];
  flights: IFlight[];
}
