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
  step: number;
}

export interface ISettingsState {
  averages: {
    flights: boolean;
    lodging: boolean;
    vehicles: boolean;
  };
  times: number[];
}

export interface IInformationState {
  fName: string | null;
  lName: string | null;
  so: string | null;
}

export interface IFlightsState {
  from: IAirport | null;
  to: IAirport | null;
  date: Date | null;
  isRoundTrip: boolean;
  timeRange: number[];
  selectedFlights: IFlight[];
  flights: IFlight[];
}

export interface ILodgingPage {}

export interface ICarRentalsPage {}
