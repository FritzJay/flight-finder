import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { systemReducer } from "./system";
import { flightsReducer } from "./flights";
import { informationReducer } from "./information";

const rootReducer = combineReducers({
  system: systemReducer,
  flights: flightsReducer,
  information: informationReducer
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
