import { IAirport, ICreateEstimateState } from "../types";

/* Types */

export const SET_DESTINATION = "SET_DESTINATION";

interface SetDestination {
  type: typeof SET_DESTINATION;
  payload: IAirport | null;
}

export type CreateEstimateActionTypes = SetDestination;

/* Actions */

export const setDestination = (airport: IAirport | null) => ({
  type: SET_DESTINATION,
  payload: airport,
});

/* Reducer */

export const initialCreateEstimateState: ICreateEstimateState = {
  destination: null,
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
    default:
      return state;
  }
};
