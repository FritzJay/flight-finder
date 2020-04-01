export interface IAirport {
  name: string;
  code: string;
  city: string;
  locID: string;
}

interface IFare {
  baseFare: number;
  tax: number;
  totalFare: number;
  refundable: boolean;
  wifi: number;
}

export interface IFlight {
  airline: string;
  grade: string;
  duration: number;
  stops: number;
  fares: IFare[];
}
