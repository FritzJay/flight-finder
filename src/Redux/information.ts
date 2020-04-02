import { IInformationState } from "../interfaces";

/* Types */

export const SET_FIRST_NAME = "SET_FIRST_NAME";
export const SET_LAST_NAME = "SET_LAST_NAME";
export const SET_SO = "SET_SO";

interface SetFirstNameAction {
  type: typeof SET_FIRST_NAME;
  payload: string;
}

interface SetLastNameAction {
  type: typeof SET_LAST_NAME;
  payload: string;
}

interface SetSOAction {
  type: typeof SET_SO;
  payload: string;
}

export type InformationActionType =
  | SetFirstNameAction
  | SetLastNameAction
  | SetSOAction;

/* Actions */

export const setFirstName = (fName: string) => ({
  type: SET_FIRST_NAME,
  payload: fName
});

export const setLastName = (lName: string) => ({
  type: SET_LAST_NAME,
  payload: lName
});

export const setSO = (so: string) => ({
  type: SET_SO,
  payload: so
});

/* Reducer */

export const initialInformationState: IInformationState = {
  fName: null,
  lName: null,
  so: null
};

export const informationReducer = (
  state = initialInformationState,
  action: InformationActionType
) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return {
        ...state,
        fName: action.payload
      };
    case SET_LAST_NAME:
      return {
        ...state,
        lName: action.payload
      };
    case SET_SO:
      return {
        ...state,
        so: action.payload
      };
    default:
      return state;
  }
};
