import { IFlightsState, IFlight, IUpdate } from "../types";

/* Types */

export const SET_FLIGHTS_BATCH = "SET_FLIGHTS_BATCH";
export const ADD_FLIGHTS_UPDATE = "ADD_FLIGHTS_UPDATE";

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

export type FlightsActionType = SetFlightsBatchAction | AddFlightsUpdateAction;

/* Actions */

export const setFlightsBatch = (time: number, flights: IFlight[]) => ({
  type: SET_FLIGHTS_BATCH,
  payload: {
    time: time.toString(),
    flights,
  },
});

export const addFlightsUpdate = (update: IUpdate) => ({
  type: ADD_FLIGHTS_UPDATE,
  payload: update,
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
    default:
      return state;
  }
};
