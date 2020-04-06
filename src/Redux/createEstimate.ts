import { IAirport, ICreateEstimateState } from "../types";

/* Types */

export const SET_DESTINATION = "SET_DESTINATION";
export const SET_DEPARTURE = "SET_DEPARTURE";

interface SetDestination {
  type: typeof SET_DESTINATION;
  payload: IAirport | null;
}

interface SetDeparture {
  type: typeof SET_DEPARTURE;
  payload: IAirport | null;
}

export type CreateEstimateActionTypes = SetDestination | SetDeparture;

/* Actions */

export const setDestination = (airport: IAirport | null) => ({
  type: SET_DESTINATION,
  payload: airport,
});

export const setDeparture = (airport: IAirport | null) => ({
  type: SET_DEPARTURE,
  payload: airport,
});

/* Reducer */

export const initialCreateEstimateState: ICreateEstimateState = {
  destination: null,
  departure: null,
};

export const createEstimateReducer = (
  state = initialCreateEstimateState,
  action: CreateEstimateActionTypes
) => {
  switch (action.type) {
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload,
      };
    case SET_DEPARTURE:
      return {
        ...state,
        departure: action.payload,
      };
    default:
      return state;
  }
};
