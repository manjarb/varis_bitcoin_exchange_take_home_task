# Take Home Assignment Project for Senior Front end engineering

Steps of creating this App
- Find a free public api that could return Bitcoin exchange rates, so in the end i decided to go with https://exchangerate.host/
- Select `MUI` library to use as a basic `UI` components <br />
  - The Reason of choosing `MUI` is that it provided all the components that we need for this project out of the box, so it could help reduce the time that we need for the design and `css` part then we can focus on the logical part itself.
- Design the UI according to the data that we got from the above API
- Create new project using `Create React App` reason is since this is just a demo project without and special requirement on any SSR for prod build, so `Create React App` provided easiest way to kick start the project
- Prepared all `hooks` method that we will use to distribute the data for our app.
- Create all folder structure to layout basic structure for the project.
- Create Page level component
- Create Child component inside each page.
- Adding all needed features into our application.
- Create Unit test to make sure it could be scaled.

- Also for the historical data page, i decided to go with the basic line chart to display historical price since it is aligned with the other website in the network, so that means users already comfortable with that.

** since i ran out of time before i can finish all unit tests, so i decided to made 2 test files to be an example of how could we handle this.
You can check from here
```
home-page.spec.tsx
use-bitcoin-exchange-rate.spec.ts
```
- Deploy the app to `vercel`, so here is the url then <br />
[https://varis-bitcoin-exchange-take-home-task.vercel.app/](https://varis-bitcoin-exchange-take-home-task.vercel.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
