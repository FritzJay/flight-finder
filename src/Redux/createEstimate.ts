import { IBase, ICreateEstimateState } from "../types";

/* Types */

export const SET_DESTINATION = "SET_DESTINATION";
export const SET_EMAIL = "SET_EMAIL";

interface SetDestinationAction {
  type: typeof SET_DESTINATION;
  payload: IBase | null;
}

interface SetEmailAction {
  type: typeof SET_EMAIL;
  payload: string | null;
}

export type CreateEstimateActionTypes = SetDestinationAction | SetEmailAction;

/* Actions */

export const setDestination = (destination: IBase | null) => ({
  type: SET_DESTINATION,
  payload: destination,
});

export const setEmail = (email: string | null) => ({
  type: SET_EMAIL,
  payload: email,
});

/* Reducer */

export const initialCreateEstimateState: ICreateEstimateState = {
  destination: null,
  email: null,
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
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};
