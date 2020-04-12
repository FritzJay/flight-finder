# Flight Finder

See it in action [here](https://FritzJay.github.io/flight-finder).
Note: The API is hosted on heroku, for free, so it may take some time to make requests.

## Architecture

Flight Finder consists of a [Node](https://nodejs.org/en/) server that serves a [React](https://reactjs.org/) app, written in [typescript](https://www.typescriptlang.org/), and a [Node](https://nodejs.org/en/) api server that routes requests through Certify's api.

![Description of the application's architecture](diagrams/architecture.png?raw=true "Application Architecture")

1. The user makes a web request to the React app server
2. The React app server sends the React app as html, css and javascript
3. The user interacts with the browser and triggers JSON requests to the API server
4. The API server routes the JSON requests to Certify's API server
5. Certify's API server responds with JSON
6. The API server routes the JSON response back to the user

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
- yarn.lock/yarn-error.log
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

## Source Code Structure

### /src

The root of the source code

- App.tsx
  - The "main page" of the app. It contains the top nav bar, header, bread crumbs, footer, next and back buttons, and controls which sections are rendered.
- index.tsx
  - The entry point to the application.
- react-app-env.d.ts
  - Defines types used by [create-react-app](https://github.com/facebook/create-react-app). This is generated by create-react-app and should be left alone.
- setupTests.ts
  - Used by [jest](https://jestjs.io/) to run tests. Use the command `yarn test` to see it in action.
- types.tsx
  - Provides interfaces used throughout the app. Thank god for TypeScript.
- utility.ts
  - Contains utility functions that are used by everything.

### /src/API

Contains functions that interact with the API.

- API.test.ts
  - Tests for utility functions.
- queryAirports.ts/queryBases.ts/queryFlights.ts
  - Provides a function to query our API server for a list of airlines/bases/flights.

### /src/Components

Holds React components. Each sub-directory represents a "page" of the app.

- /CreateEstimate
  - AirportAutoComplete.tsx/BaseAutocomplete.tsx
    - Provides the autocompletes.
  - CreateEstimate.tsx
    - The main page. The user will use this to kick off the whole process.
- /Flights
  - The flights page. It displays a bunch of flight information so the user understands how the estimate is calculated.
- /NavbarList
  - The navbar component on the left side of the screen.
- /Settings
  - Averages.tsx/Settings.tsx/Times.tsx
    - The modal that the user uses to change different app settings. This includes things like what time periods the averages are calculated at.

### /src/hooks

React uses things called [hooks](https://reactjs.org/docs/hooks-intro.html). Hooks provide a way of writing business logic that are detached from UI components. These functions are written in such a way as to avoid unnecessary rendering of html elements and to maintain/update state in a reliable way.

- flights.ts/lodging.ts/vehicles.ts
  - All things flights/lodging/vehicles related.

### /src/Redux

[Redux](https://redux.js.org/) manages state for the app in the form of a "store". /src/Redux provides abstractions for updating and retrieving state throughout the app.

- index.ts
  - Contains the root reducer (a Redux thing) and a type that describes the shape of the state used throughout the app.
- flights.ts/information.ts/system.ts
  - Provides abstractions for managing the state of the app.

## Packages

Node projects are notorious for including a ton of axillary packages. You can see for yourself by opening /node_modules. These are all the packages that this application, and the packages this app uses depend on. It's a lot. You can see a list of the dependencies this project directly depends on in /package.json.

In this section, I'll go through the dependencies I've added and briefly describe each one in an attempt to demystify them.

- [@material-ui/(core/icons/lab/pickers)](https://material-ui.com/)
  - Material-UI is React UI framework that provides basic UI components. This includes things like layout grids, tables, buttons, sliders and more. Material-UI also makes it easy to integrate themes. For example instead of manually assigning colors for all your buttons and text, you can use specify "primary" and "secondary" colors for elements to use and have Material-UI select the correct colors depending on the theme. I use Material-UI components on every custom component in this app.
- [@date-io/date-fns & date-fns](https://github.com/dmtrKovalenko/date-io)
  - These are here because of a quark in Material-UI. For some reason, you need to provide date/time related utility functions to Material-UI's DatePicker component.
- [@testing-library/(jest-dom/react/user-event)](https://testing-library.com/)
  - create-react-app provides an awesome testing framework that requires these packages.
- [gh-pages](https://pages.github.com/)
  - This package allows me to deploy the app to github pages. github hosts single page apps for free. <3
- [react/react-dom](https://reactjs.org/)
  - These packages are added by create-react-app. react and react-dom are what makes this a React app.
- [react-scripts](https://github.com/facebook/create-react-app)
  - Used by create-react-app to start, build, test and do a bunch of other nice things like customize the app beyond the scope of create-react-app.
- [redux](https://redux.js.org/)
  - As mentioned before, redux is a state management package. It provides abstractions that allow you to save and update state in a way that works very well with React.
- [redux-devtools-extension](https://github.com/reduxjs/redux-devtools)
  - This is an amazing tool that allows [this browser extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) to access the redux store during development.
- [redux-localstorage](https://github.com/elgerlambert/redux-localstorage)
  - After setting it up, this package automatically saves the redux store to local storage as well as loads the saved data when the page is opened.
- [typeface-roboto](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto)
  - Provides the robot font.
- [typescript](https://www.typescriptlang.org/)
  - Provides the compiler which allows us to write this app in TypeScript, instead of plain ol JavaScript.
- devDependencies
  - package.json also contains a section for dependencies that are only used during development and won't be served to the user. Currently, the only dev dependencies being used are types. Types are used be TypeScript to type check code. Check out the TypeScript link for more info.
