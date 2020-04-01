import {
  formatFlightQueryParameters,
  formatFlightLegs,
  formatTimeFilters
} from "./queryFlights";
import { IAirport } from "../interfaces";

const from: IAirport = {
  name: "From Airport",
  code: "ABC",
  city: "Los Angeles",
  locID: "AABC"
};

const to: IAirport = {
  name: "To Airport",
  code: "CBA",
  city: "Las Vegas",
  locID: "ACBA"
};

const date = new Date(2020, 3, 1, 0, 0, 0, 0);

const timeStart = new Date(2020, 3, 1, 10, 30, 10);

const timeEnd = new Date(2020, 3, 1, 12, 5, 30);

describe("formatFlightQueryParameters", () => {
  it("works with time filters", () => {
    expect(
      formatFlightQueryParameters(from, to, date, timeStart, timeEnd)
    ).toBe(
      '{"legs":[{"date":"2020-04-01","fromLocId":"AABC","toLocId":"ACBA"}],"filters":{"timeFilters":[{"departFromTime":"1000","departToTime":"1200"}],"airlineView":"DL","legNum":1}'
    );
  });

  it("works without time filters", () => {
    expect(formatFlightQueryParameters(from, to, date, null, null)).toBe(
      '{"legs":[{"date":"2020-04-01","fromLocId":"AABC","toLocId":"ACBA"}],"airlineView":"DL","legNum":1}'
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
      '"filters":{"timeFilters":[{"departFromTime":"1000","departToTime":"1200"}]'
    );
  });
});
