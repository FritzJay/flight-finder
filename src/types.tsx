export enum Links {
  CreateEstimate,
  Flights,
  Lodging,
  Vehicles,
}

export interface IBase {
  id: number;
  name: string;
  airport: string;
  airportCode: string;
  distance: number | null;
  notes: string | null;
}

export interface IAirport {
  name: string;
  code: string;
  city: string;
  locID: string;
}

export interface IFlightsBatches {
  [time: string]: IFlight[];
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

export interface IUpdate {
  date: string;
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
  departure: IBase | null;
  averages: IAverages;
  times: number[];
}

export interface ICreateEstimateState {
  destination: IBase | null;
  email: string | null;
}

export interface IFlightsState {
  updates: IUpdate[];
  batches: IFlightsBatches;
}
