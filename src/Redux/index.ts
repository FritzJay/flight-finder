import { combineReducers, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import persistState from "redux-localstorage";
import { systemReducer } from "./system";
import { settingsReducer } from "./settings";
import { informationReducer } from "./information";
import { flightsReducer } from "./flights";

const rootReducer = combineReducers({
  system: systemReducer,
  settings: settingsReducer,
  information: informationReducer,
  flights: flightsReducer
});

const enhancer: any = compose(composeWithDevTools(), persistState());

export const store = createStore(rootReducer, undefined, enhancer);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
