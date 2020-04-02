import { ISystemState } from "../interfaces";

/* Types */

export const SET_STEP = "SET_STEP";

interface SetStepAction {
  type: typeof SET_STEP;
  payload: number;
}

export type SystemActionTypes = SetStepAction;

/* Actions */

export const setStep = (step: number) => ({
  type: SET_STEP,
  payload: step
});

/* Reducer */

const initialState: ISystemState = {
  step: 0
};

export const systemReducer = (
  state = initialState,
  action: SystemActionTypes
) => {
  switch (action.type) {
    case SET_STEP:
      return {
        ...state,
        step: action.payload
      };
    default:
      return state;
  }
};
