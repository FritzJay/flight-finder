import { IFlightsState, IFlight } from "../types";

/* Types */

export const SET_FLIGHTS = "SET_FLIGHTS";

interface SetFlights {
  type: typeof SET_FLIGHTS;
  payload: IFlight[];
}

export type FlightsActionType = SetFlights;

/* Actions */

export const setFlights = (flights: IFlight[]) => ({
  type: SET_FLIGHTS,
  payload: flights,
});

/* Reducer */

export const initialFlightsState: IFlightsState = {
  flights: [],
};

export const flightsReducer = (
  state = initialFlightsState,
  action: FlightsActionType
) => {
  switch (action.type) {
    case SET_FLIGHTS:
      return {
        ...state,
        flights: action.payload,
      };
    default:
      return state;
  }
};
