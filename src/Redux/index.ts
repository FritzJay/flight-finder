import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import persistState from "redux-localstorage";
import { systemReducer } from "./system";
import { settingsReducer } from "./settings";
import { flightsReducer } from "./flights";

const rootReducer = combineReducers({
  system: systemReducer,
  settings: settingsReducer,
  flights: flightsReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(persistState() as any)
);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
