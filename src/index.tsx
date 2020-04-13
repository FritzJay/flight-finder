import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./Redux";
import { queryBases } from "./API/queryBases";
import { setDeparture } from "./Redux/settings";

// Set default base
if (store.getState().settings.departure === null) {
  queryBases().then((bases) => {
    const spokaneBase =
      bases.find(
        (b) => b.name === process.env.REACT_APP_DEFAULT_DEPARTURE_BASE_NAME
      ) || null;
    store.dispatch(setDeparture(spokaneBase) as any);
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
