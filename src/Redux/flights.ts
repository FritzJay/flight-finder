import { IFlightsState, IFlight, IUpdate } from "../types";
import { IFlightsResponse } from "../API/queryFlights";

/* Types */

export const SET_FLIGHTS_BATCH = "SET_FLIGHTS_BATCH";
export const ADD_FLIGHTS_UPDATE = "ADD_FLIGHTS_UPDATE";
export const CLEAR_FLIGHTS_UPDATES = "CLEAR_FLIGHTS_UPDATES";

interface SetFlightsBatchAction {
  type: typeof SET_FLIGHTS_BATCH;
  payload: {
    time: number;
    flights: IFlight[];
  };
}

interface AddFlightsUpdateAction {
  type: typeof ADD_FLIGHTS_UPDATE;
  payload: IUpdate;
}

interface ClearFlightsUpdatesAction {
  type: typeof CLEAR_FLIGHTS_UPDATES;
}

export type FlightsActionType =
  | SetFlightsBatchAction
  | AddFlightsUpdateAction
  | ClearFlightsUpdatesAction;

/* Actions */

export const setFlightsBatch = (flights: IFlightsResponse) => ({
  type: SET_FLIGHTS_BATCH,
  payload: flights,
});

export const addFlightsUpdate = (description: string, date: Date) => ({
  type: ADD_FLIGHTS_UPDATE,
  payload: {
    description,
    date,
  },
});

export const clearFlightsUpdates = () => ({
  type: CLEAR_FLIGHTS_UPDATES,
});

/* Reducer */

export const initialFlightsState: IFlightsState = {
  batches: {},
  updates: [],
};

export const flightsReducer = (
  state = initialFlightsState,
  action: FlightsActionType
) => {
  switch (action.type) {
    case SET_FLIGHTS_BATCH:
      return {
        ...state,
        batches: {
          ...state.batches,
          [action.payload.time]: action.payload.flights,
        },
      };
    case ADD_FLIGHTS_UPDATE:
      return {
        ...state,
        updates: state.updates.concat([action.payload]),
      };
    case CLEAR_FLIGHTS_UPDATES:
      return {
        ...state,
        updates: [],
      };
    default:
      return state;
  }
};
