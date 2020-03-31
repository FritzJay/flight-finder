import React from "react";
import "./App.css";

import AirportSearchInput from "./Components/AirportSearchInput/AirportSearchInput";
import { IAirport } from "./interfaces";

const App = () => {
  const [fromAirport, setFromAirport]: [
    IAirport | undefined,
    any
  ] = React.useState();
  return (
    <div className="App">
      <p>{fromAirport?.code}</p>
      <AirportSearchInput setSelected={setFromAirport} />
    </div>
  );
};

export default App;
