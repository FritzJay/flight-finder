import { IFlightsState, IFlight, IStep } from "../types";

/* Types */

export const SET_FLIGHTS = "SET_FLIGHTS";
export const ADD_STEP = "ADD_STEP";

interface SetFlightsAction {
  type: typeof SET_FLIGHTS;
  payload: IFlight[];
}

interface AddStepAction {
  type: typeof ADD_STEP;
  payload: IStep;
}

export type FlightsActionType = SetFlightsAction | AddStepAction;

/* Actions */

export const setFlights = (flights: IFlight[]) => ({
  type: SET_FLIGHTS,
  payload: flights,
});

export const addStep = (step: IStep) => ({
  type: ADD_STEP,
  payload: step,
});

/* Reducer */

export const initialFlightsState: IFlightsState = {
  flights: [],
  steps: [],
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
    case ADD_STEP:
      return {
        ...state,
        steps: state.steps.concat([action.payload]),
      };
    default:
      return state;
  }
};
