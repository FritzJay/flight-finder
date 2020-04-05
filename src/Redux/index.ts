import { combineReducers, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import persistState from "redux-localstorage";
import { systemReducer } from "./system";
import { flightsReducer } from "./flights";
import { informationReducer } from "./information";

const rootReducer = combineReducers({
  system: systemReducer,
  flights: flightsReducer,
  information: informationReducer
});


export const store = createStore(rootReducer, undefined, composeWithDevTools(persistState() as any));

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
