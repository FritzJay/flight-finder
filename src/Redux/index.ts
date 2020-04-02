import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { systemReducer } from "./system";
import { flightsReducer } from "./flights";

const rootReducer = combineReducers({
  system: systemReducer,
  flights: flightsReducer
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
