import {
  formatFlightQueryParameters,
  formatFlightLegs,
  formatTimeFilters,
} from "./queryFlights";
import { IAirport } from "../types";

const from: IAirport = {
  name: "From Airport",
  code: "ABC",
  city: "Los Angeles",
  locID: "AABC",
};

const to: IAirport = {
  name: "To Airport",
  code: "CBA",
  city: "Las Vegas",
  locID: "ACBA",
};

const date = new Date(2020, 3, 1, 0, 0, 0, 0);

const timeStart = 300;

const timeEnd = 1500;

describe("formatFlightQueryParameters", () => {
  it("works with time filters", () => {
    expect(
      formatFlightQueryParameters(from, to, date, timeStart, timeEnd)
    ).toBe(
      '{"legs":[{"date":"2020-04-01","fromLocId":"AABC","toLocId":"ACBA"}],"filters":{"timeFilters":[{"departFromTime":"300","departToTime":"1500"}]},"airlineView":"DL","legNum":1}'
    );
  });
});

describe("formatFlightsLegs", () => {
  it("works", () => {
    expect(formatFlightLegs(from, to, date)).toBe(
      '"legs":[{"date":"2020-04-01","fromLocId":"AABC","toLocId":"ACBA"}]'
    );
  });
});

describe("formatTimeFilters", () => {
  it("works", () => {
    expect(formatTimeFilters(timeStart, timeEnd)).toBe(
      '"filters":{"timeFilters":[{"departFromTime":"300","departToTime":"1500"}]}'
    );
  });
});
