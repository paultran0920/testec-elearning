# Testec Interview Homework Backend

## Application Architecture

## Purpose
The purpose of this Front End project is to create a simplest UI to manage the Users in this system

The fronten including the following parts:

1. Based on React.JS and Typescript for main SPA libraries
2. Based on React Hooks to create the components
3. Using React Context for state management
4. [MUI](https://mui.com/) for the basic components
5. [Formik] (https://formik.org/docs/overview) to manage data on Form

## Pre-start
Please create a new `.env` including the following parameters
```sh
REACT_APP_BE_ROOT="Full URL to the your BE"
REACT_APP_NODE_ENV="production"

```

## Run it
After doing needed configuration, you can start it by

1. Checkout this project to your machine
2. Run `npm install` from the Root folder to install needed npm packages
3. Run `npm build` to build this project then deploy it where you want. The final build resource can be found in folder `build`
4. Run `npm run start` to start the application from the source, the default web PORT should be 3000

## Project structure
```
- testec-elearning-fe
  + public
  + src
    + componets: all components will be here
    + context: React context structure
    + logs: A simple log service, we can send application error, application data, BI, ... to data center for analysis late if needed
    + models: Data models will be here
    + persistent: midlle layer to call the APIs
```

## DEMO


## Can do more if have enough time
1. Unit Test and Code coverage
2. Automation Test with Puppeteer, ...
3. Have better error handling
4. Integrate CI process with CircleCI
5. Build the docker image and have a better flow to deploy on AWS 
