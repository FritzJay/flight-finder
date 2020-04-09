import { ISettingsState, IBase } from "../types";

/* Types */

export const SET_AVERAGES_FLIGHTS = "SET_AVERAGES_FLIGHTS";
export const SET_AVERAGES_LODGING = "SET_AVERAGES_LODGING";
export const SET_AVERAGES_VEHICLES = "SET_AVERAGES_VEHICLES";
export const ADD_TIME = "ADD_TIME";
export const REMOVE_TIME = "REMOVE_TIME";
export const SET_DEPARTURE = "SET_DEPARTURE";

interface SetAveragesFlightsAction {
  type: typeof SET_AVERAGES_FLIGHTS;
  payload: boolean;
}

interface SetAveragesLodgingAction {
  type: typeof SET_AVERAGES_LODGING;
  payload: boolean;
}

interface SetAveragesVehiclesAction {
  type: typeof SET_AVERAGES_VEHICLES;
  payload: boolean;
}

interface AddTimeAction {
  type: typeof ADD_TIME;
  payload: number;
}

interface RemoveTimeAction {
  type: typeof REMOVE_TIME;
  payload: number;
}

interface SetDepartureAction {
  type: typeof SET_DEPARTURE;
  payload: IBase | null;
}

export type SettingsActionType =
  | SetAveragesFlightsAction
  | SetAveragesLodgingAction
  | SetAveragesVehiclesAction
  | AddTimeAction
  | RemoveTimeAction
  | SetDepartureAction;

/* Actions */

export const setAveragesFlights = (flight: boolean) => ({
  type: SET_AVERAGES_FLIGHTS,
  payload: flight,
});

export const setAveragesLodging = (lodging: boolean) => ({
  type: SET_AVERAGES_LODGING,
  payload: lodging,
});

export const setAveragesVehicles = (vehicles: boolean) => ({
  type: SET_AVERAGES_VEHICLES,
  payload: vehicles,
});

export const addTime = (time: number) => ({
  type: ADD_TIME,
  payload: time,
});

export const removeTime = (time: number) => ({
  type: REMOVE_TIME,
  payload: time,
});

export const setDeparture = (base: IBase | null) => ({
  type: SET_DEPARTURE,
  payload: base,
});

/* Reducer */

export const initialSettingsState: ISettingsState = {
  departure: null,
  averages: {
    flights: true,
    lodging: true,
    vehicles: true,
  },
  times: [0, 7, 14],
};

export const settingsReducer = (
  state = initialSettingsState,
  action: SettingsActionType
) => {
  switch (action.type) {
    case SET_AVERAGES_FLIGHTS:
      return {
        ...state,
        averages: {
          ...state.averages,
          flights: action.payload,
        },
      };
    case SET_AVERAGES_LODGING:
      return {
        ...state,
        averages: {
          ...state.averages,
          lodging: action.payload,
        },
      };
    case SET_AVERAGES_VEHICLES:
      return {
        ...state,
        averages: {
          ...state.averages,
          vehicles: action.payload,
        },
      };
    case ADD_TIME:
      return {
        ...state,
        times: state.times.includes(action.payload)
          ? state.times
          : state.times.concat([action.payload]),
      };
    case REMOVE_TIME:
      return {
        ...state,
        times: state.times.filter((t) => t !== action.payload),
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
