import { IAirport, IFlight } from "../interfaces";

interface ILocation {
  city?: any;
  country?: any;
  lat: number;
  lon: number;
  postalCode?: any;
  region?: any;
  street?: any;
  code?: any;
  isValid: boolean;
  name?: any;
  rgn?: any;
  locId: string;
  shortDisplay: string;
  cityCode: string;
}

interface IAirline {
  code: string;
  name: string;
  fare: number;
  isPreferred: boolean;
  hasNonStop: boolean;
}

interface IColumnBrand {
  airlineCode: string;
  brandId: number;
  brandNum: number;
  brandName: string;
  extraColumns: number;
  description: string;
  fullDescription: string;
  hasImage: boolean;
  firstCheckedBag: string;
  secondCheckedBag: string;
  carryOnBag: string;
  personalItem: string;
  brandPerks: string[];
  brandRestrictions: string[];
  upgradeOffer: boolean;
  upgradeOfferHeader: string;
  upgradeOfferRestrictions: string[];
  upgradeOfferBenefits: string[];
}

interface IFlightBrand {
  airlineCode: string;
  brandId: number;
  brandNum: number;
  brandName: string;
  extraColumns: number;
  description: string;
  fullDescription: string;
  hasImage: boolean;
  firstCheckedBag: string;
  secondCheckedBag: string;
  carryOnBag: string;
  personalItem: string;
  brandPerks: string[];
  brandRestrictions: string[];
  upgradeOffer: boolean;
  upgradeOfferHeader: string;
  upgradeOfferRestrictions: string[];
  upgradeOfferBenefits: string[];
}

interface ISeat {
  route: string;
  cabin: string;
  cabinCode: string;
  config: string;
  num: number;
  type: string;
  pitchRate: string;
  seatWidth: string;
  width: number;
  widthRate: string;
  pitch: number;
  seatPitch: string;
}

interface IAvailability {
  bic: string;
  count: number;
  cabin: string;
}

interface IImage {
  url: string;
  cabin: string;
  route: string;
}

interface ISegment {
  segNum: number;
  fullSegNum: number;
  sectorNum: number;
  airlineCode: string;
  airlineName: string;
  allianceCode: string;
  flightNumber: number;
  fromCode: string;
  fromName: string;
  fromLocId?: any;
  toCode: string;
  toName: string;
  toLocId?: any;
  departs: string;
  arrives: string;
  dayChange: number;
  opAirlineCode: string;
  opAirlineName: string;
  miles: number;
  duration: number;
  aircraftTypeCode: string;
  aircraftTypeName: string;
  aircraftTypeCategory: string;
  fromTerminal: string;
  toTerminal: string;
  onTimePercent: number;
  numStops: number;
  planeChange: boolean;
  isConnection: boolean;
  isDelphiConnection: boolean;
  connectionType?: any;
  stopPoints: any[];
  seats: ISeat[];
  availability: IAvailability[];
  seatText: string;
  cabinSeatString: string;
  cabinText: string;
  seatBookingLevel: string;
  brandNum: number;
  brandId: number;
  images: IImage[];
}

interface ISegment2 {
  duration: number;
  flight: string;
  status: string;
  text: string;
}

interface IAmenity {
  code: number;
  segments: ISegment2[];
}

interface ISeatsBySegment {
  route: string;
  cabin: string;
  cabinCode: string;
  config: string;
  num: number;
  type: string;
  pitchRate: string;
  seatWidth: string;
  width: number;
  widthRate: string;
  pitch: number;
  seatPitch: string;
}

interface IMedium {
  url: string;
  cabin: string;
  route: string;
}

interface IFare {
  baseFare: number;
  tax: number;
  totalFare: number;
  totalItinerary: number;
  downgradeRequired: boolean;
  notOfferedReason?: any;
  soldOut: boolean;
  specialRatePopup?: any;
  specialRateText?: any;
  bic: string;
  fbc: string;
  brandColumn: number;
  brandIndex: number;
  shelf: number;
  grade: string;
  amenities: IAmenity[];
  split: string;
  source: string;
  itineraryFlights: string[];
  outOfPolicy: boolean;
  policyBreakDetails?: any;
  rateType?: any;
  refundable: boolean;
  changeFee: string;
  wifi: number;
  ife: number;
  liveTV: number;
  power: number;
  seatAssignments: number;
  seatType: number;
  seatWidth: string;
  seatPitch: string;
  boardingPriority: string;
  seatsBySegment: ISeatsBySegment[];
  media: IMedium[];
  cabinClassCode: string;
}

interface IFlightResponse {
  airportOnly: boolean;
  airlineCode: string;
  airlineName: string;
  flightGrade: string;
  duration: number;
  numStops: number;
  segments: ISegment[];
  fares: IFare[];
  isPreferred: boolean;
}

interface IAirportOption {
  locId: string;
  locIdName: string;
  airports: IAirport[];
}

interface IResponse {
  fareDisplayType: string;
  brandDisplayType: string;
  showShelves: boolean;
  allFlightsFilteredOut: boolean;
  searchId: number;
  statsId: number;
  locations: ILocation[];
  airlines: IAirline[];
  columnBrands: IColumnBrand[];
  flightBrands: IFlightBrand[];
  flights: IFlightResponse[];
  itineraries?: any;
  selectedFlights?: any;
  stopOptions: string[];
  airportOptions: IAirportOption[];
  unwantedAirports?: any;
  policyApplied: number;
  haveCustomerEmail: boolean;
}

// TODO: Accept array of flights
export const queryFlights = async (
  from: IAirport,
  to: IAirport,
  date: Date,
  timeStart: number,
  timeEnd: number
): Promise<IFlight[]> => {
  const response = await fetch(
    process.env.REACT_APP_API_URL +
      `/flights?queryparams=${formatFlightQueryParameters(
        from,
        to,
        date,
        timeStart,
        timeEnd
      )}`
  );
  const json: IResponse = await response.json();

  console.log(json);

  const list: IFlight[] = [];

  json.flights.forEach(
    ({ airlineName, flightGrade, duration, numStops, fares }) =>
      fares.forEach(({ totalFare, seatsBySegment, itineraryFlights }: IFare) =>
        list.push({
          id: itineraryFlights[0],
          airline: airlineName,
          grade: flightGrade,
          duration,
          stops: numStops,
          fare: totalFare,
          cabin: seatsBySegment
            .reduce((acc, cur) => `${acc}/${cur.cabin}`, "")
            .substring(1)
        })
      )
  );

  return list;
};

export const formatFlightQueryParameters = (
  from: IAirport,
  to: IAirport,
  date: Date,
  timeStart: number,
  timeEnd: number
) => {
  const legs = formatFlightLegs(from, to, date);
  const timeFilters = formatTimeFilters(timeStart, timeEnd);
  return `{${legs},${timeFilters},"airlineView":"DL","legNum":1}`;
};

export const formatFlightLegs = (from: IAirport, to: IAirport, date: Date) =>
  `"legs":[{"date":"${date.toISOString().split("T")[0]}",` +
  `"fromLocId":"${from.locID}","toLocId":"${to.locID}"}]`;

export const formatTimeFilters = (timeStart: number, timeEnd: number) =>
  `"filters":{"timeFilters":[{"departFromTime":"${timeStart}00","departToTime":"${timeEnd}00"}]}`;

export default queryFlights;
