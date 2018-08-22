
## Getting Started

### Installation

**You’ll need to have Node >= 4 on your machine**.

**We strongly recommend to use Node >= 6 and npm >= 3 for faster installation speed and better disk usage.** You can use [nvm](https://github.com/creationix/nvm#usage) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for the build tools that rely on it locally, such as Webpack and Babel.

Install NodeJS:

[https://nodejs.org](https://nodejs.org)


## Install dependencies

`npm install`

## Connecting to backend API
For connecting with backend service you need to set API Hosts in `.env` configuration file.
You can copy file format from `.env.example` file:
`cp .env.example .env`

## Starting the Server
Run npm start to launch the development server. The browser will open automatically with the created app’s URL.

`npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will see the build errors and lint warnings in the console.


## Build app
`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Supported Browsers
- Microsoft Edge
- Microsoft IE 11 (last supported version)
- Chrome (newest version)
- Firefox (newest version)
