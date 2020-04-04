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
  selectedFlight: IFlight | null;
  flights: IFlight[];
}

export interface ILodgingPage {}

export interface ICarRentalsPage {}
