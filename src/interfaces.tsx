export interface IAirport {
  name: string;
  code: string;
  city: string;
  locID: string;
}

export interface IFlight {
  airline: string;
  grade: string;
  duration: number;
  stops: number;
  fare: number;
  cabin: string;
}
