import { IFlightsState, IAirport, IFlight } from "../interfaces";

/* Types */

export const SET_FROM = "SET_FROM";
export const SET_TO = "SET_TO";
export const SET_DATE = "SET_DATE";
export const SET_IS_ROUND_TRIP = "SET_IS_ROUND_TRIP";
export const SET_TIME_RANGE = "SET_TIME_RANGE";
export const SET_FLIGHTS = "SET_FLIGHTS";
export const SET_SELECTED_FLIGHT = "SET_SELECTED_FLIGHT";

interface SetFromAction {
  type: typeof SET_FROM;
  payload: IAirport;
}

interface SetToAction {
  type: typeof SET_TO;
  payload: IAirport;
}

interface SetDateAction {
  type: typeof SET_DATE;
  payload: Date;
}

interface SetIsRoundTripAction {
  type: typeof SET_IS_ROUND_TRIP;
  payload: boolean;
}

interface SetTimeRangeAction {
  type: typeof SET_TIME_RANGE;
  payload: number[];
}

interface SetFlights {
  type: typeof SET_FLIGHTS;
  payload: IFlight[];
}

interface SetSelectedFlightAction {
  type: typeof SET_SELECTED_FLIGHT;
  payload: IFlight;
}

export type FlightsActionType =
  | SetFromAction
  | SetToAction
  | SetDateAction
  | SetIsRoundTripAction
  | SetTimeRangeAction
  | SetFlights
  | SetSelectedFlightAction;

/* Actions */

export const setFrom = (airport: IAirport | null) => ({
  type: SET_FROM,
  payload: airport
});

export const setTo = (airport: IAirport | null) => ({
  type: SET_TO,
  payload: airport
});

export const setDate = (date: Date | null) => ({
  type: SET_DATE,
  payload: date
});

export const setIsRoundTrip = (isRoundTrip: boolean) => ({
  type: SET_IS_ROUND_TRIP,
  payload: isRoundTrip
});

export const setTimeRange = (timeRange: number[]) => ({
  type: SET_TIME_RANGE,
  payload: timeRange
});

export const setFlights = (flights: IFlight[]) => ({
  type: SET_FLIGHTS,
  payload: flights
});

export const setSelectedFlight = (flight: IFlight | null) => ({
  type: SET_SELECTED_FLIGHT,
  payload: flight
});

/* Reducer */

export const initialFlightsState: IFlightsState = {
  from: null,
  to: null,
  date: new Date(Date.now()),
  isRoundTrip: false,
  timeRange: [0, 2400],
  selectedFlight: null,
  flights: []
};

export const flightsReducer = (
  state = initialFlightsState,
  action: FlightsActionType
) => {
  switch (action.type) {
    case SET_FROM:
      return {
        ...state,
        from: action.payload
      };
    case SET_TO:
      return {
        ...state,
        to: action.payload
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload
      };
    case SET_IS_ROUND_TRIP:
      return {
        ...state,
        isRoundTrip: action.payload
      };
    case SET_TIME_RANGE:
      return {
        ...state,
        timeRange: action.payload
      };
    case SET_SELECTED_FLIGHT:
      return {
        ...state,
        selectedFlight: action.payload
      };
    case SET_FLIGHTS:
      return {
        ...state,
        flights: action.payload
      };
    default:
      return state;
  }
};
