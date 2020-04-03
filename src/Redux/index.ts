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

const enhancer: any = compose(composeWithDevTools(), persistState());

export const store = createStore(rootReducer, undefined, enhancer);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
