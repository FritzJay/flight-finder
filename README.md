# Flight Finder

See it in action [here](https://FritzJay.github.io/flight-finder).
Note: The API is hosted on heroku, for free, so it may take some time to make requests.

---

## Architecture

Flight Finder consists of a [Node](https://nodejs.org/en/) server that serves a [React](https://reactjs.org/) app, written in [typescript](https://www.typescriptlang.org/), and a [Node](https://nodejs.org/en/) api server that routes requests through Certify's api.

![Description of the application's architecture](diagrams/architecture.png?raw=true "Application Architecture")

1. The user makes a web request to the React app server
2. The React app server sends the React app as html, css and javascript
3. The user interacts with the browser and triggers JSON requests to the API server
4. The API server routes the JSON requests to Certify's API server
5. Certify's API server responds with JSON
6. The API server routes the JSON response back to the user

---

## Directory Structure

### root

- .env.development/.env.production
  - Provides environment variables depending on how the application is executed. If the server is run in development mode, by using the command `yarn start` for example, .env.development will be used. Conversely, if the server is run in production mode, .env.production is used. Environment files are currently being used to point to the correct api server.
- .gitignore
  - Tells git which files are not tracked. For more information see [https://git-scm.com/docs/gitignore](https://git-scm.com/docs/gitignore).
- package.json
  - Provides naming, versioning, scripting, tracking dependencies and is required by [npm](https://www.npmjs.com/). Learn more about [package.json](https://docs.npmjs.com/files/package.json).
- README.md
  - The document you are currently reading.
- tsconfig.json
  - Configuring for the TypeScript compiler. Learn more at [https://www.typescriptlang.org/docs/handbook/tsconfig-json.html](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- yarn.lock
  - Keeps track of currently installed packages, as specified in package.json dependency list. Learn more about [Yarn](https://classic.yarnpkg.com/lang/en/) and [yarn.lock](https://classic.yarnpkg.com/en/docs/yarn-lock/).

### /diagrams

Holds images used in README.md

### /public

- favicon.ico
  - The [favicon](https://en.wikipedia.org/wiki/Favicon) displayed on browser tabs.
- index.html
  - [Webpack](https://webpack.js.org/) injects html, css and javascript at compile time before serving index.html to the user.
- manifest.json
  - Specifies metadata about the app. See [Mozilla's docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) to learn more.

---

## Source Code Structure

### /src

The root of the source code

- App.tsx
  - The "main page" of the app. It contains the top nav bar, header, bread crumbs, footer, next and back buttons, and controls which sections are rendered.
- index.tsx
  - The entry point to the application.
- interfaces.tsx
  - Provides types used throughout the app. Thank god for TypeScript.
- react-app-env.d.ts
  - Defines types used by [create-react-app](https://github.com/facebook/create-react-app). This is generated by create-react-app and should be left alone.
- setupTests.ts
  - Used by [jest](https://jestjs.io/) to run tests. Use the command `yarn test` to see it in action.

### /src/API

Contains functions that interact with the API.

- API.test.ts
  - Tests for utility functions.
- queryAirlines.ts
  - Provides a function to query our API server for a list of airlines.
- queryFlights.ts
  - Provides a function to query our API server for a list of flights.

### /src/Components

Holds React components. Each sub-directory represents a "page" of the app.

- /src/Components/Confirmation
  - Confirmation.tsx
    - The confirmation page.
- /src/Components/Flights
  - AirportSearchInput.tsx
    - The airport search autocomplete text box component.
  - Flights.tsx
    - The flights selection page.
  - FlightsTable.tsx
    - The component responsible for rendering the table that displays available flights.
- /src/Components/Information
  - Information.tsx
    - The information page.

### /src/Redux

[Redux](https://redux.js.org/) manages state for the app in the form of a "store". /src/Redux provides abstractions for updating and retrieving state throughout the app.

- index.ts
  - Contains the root reducer (a Redux thing) and a type that describes the shape of the state used throughout the app.
- flights.ts/information.ts/system.ts
  - Provides abstractions for managing the state of the app.
