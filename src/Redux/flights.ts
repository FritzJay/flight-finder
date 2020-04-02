import { IFlightsState, IAirport, IFlight } from "../interfaces";

/* Types */

export const SET_FROM = "SET_FROM";
export const SET_TO = "SET_TO";
export const SET_DATE = "SET_DATE";
export const SET_TIME_RANGE = "SET_TIME_RANGE";
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

interface SetTimeRangeAction {
  type: typeof SET_TIME_RANGE;
  payload: number[];
}

interface SetSelectedFlightAction {
  type: typeof SET_SELECTED_FLIGHT;
  payload: IFlight;
}

export type FlightsActionType =
  | SetFromAction
  | SetToAction
  | SetDateAction
  | SetTimeRangeAction
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

export const setTimeRange = (timeRange: number[]) => ({
  type: SET_TIME_RANGE,
  payload: timeRange
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
  timeRange: [0, 23],
  selectedFlight: null
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
    default:
      return state;
  }
};
