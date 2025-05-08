# Cypress Testing Repository
## Description

This repository contains a sample test automation project that accesses numerous webpages and endpoints using **Cypress** for testing. The test suite included is as follows:

* [Pet Store API](https://petstore.swagger.io/)
* [Automation Exercise](https://automationexercise.com/) 
* [Parabank](https://parabank.parasoft.com/parabank/index.htm) - Created with a POM format
* [QA-Practice](https://qa-practice.netlify.app)
* [SauceDemo](https://www.saucedemo.com/)
* [HTTPBin](https://httpbin.org/)
* Localhost Server

Each of the websites are tested based on functionalities that are both easily accessible and catching the user's attention, as well as underlying functionalities responsible for the operation of the website itself.

## Features

- **Pet Store API** : Tests the ability of the API to respond to requests regarding the pet store's ability to process orders and its ability to process account information for users.

- **Automation Exercise** : Follows the testing procedures listed for Test Cases 14, 15, and 16, which switches around when the user is registered and/or logged into the system before checking out
  
- **Parabank** : Tests the ability of the website to register and login clients

- **QA-Practice** : A Practice test to understand the way to invoke radio buttons and checkboxes for Cypress

- **SauceDemo** : Like the Automation Exercise, this also tests the ability of the user to purchase items from the website. It uses the normal user credentials.

- **HTTPBin** : A Practice test that uses the cypress-plugin-api to make a simple GET request and expects a response code of 200

- **Localhost Server** : A Practice test that uses numerous request that simulates a normal user creation and deletion process while including authorization headers as part of the request.

## Getting Started

### Step 1 - Create a Project Folder

* Create a project folder on your desktop (or in preferred location), with a name "cypress_projects".

* For Windows - Go to your Desktop, right-click, and select New Folder. Name it cypress_projects.

* Mac/Linux: Open your terminal and run the following command to create a folder:

``` mkdir ~/Desktop/cypress_projects ```

### Step 2 - Clone the Repository

``` cd ~/Desktop/cypress_projects git clone https://github.com/drgimatt/cypressTest.git ```

### Step 3 - Install Dependencies

``` cd cypressTest npm install ```

## Running the Tests

* The test code file for the Login functionality can be run either in headless (CLI only) or headed mode (With Browser Interface).

### Headless Mode

* To run the test in headless mode:

``` npm run test-suite ```

### Headed Mode

* In headed mode, the browser runs with a visible UI. This mode is useful for debugging and visual verification of test actions. To run the test in headless mode:

1. Open Cypress
   
``` npx cypress open ``` or ``` npm run test ```

2. In the Cypress Interface, click "E2E Testing"
3. Select your preferred browser and click "Start E2E Testing"
4. In the newly opened browser window, select the spec file you want to test

## Execution Status

[![Cypress Serial Execution](https://github.com/drgimatt/cypressTest/actions/workflows/cypress.yml/badge.svg)](https://github.com/drgimatt/cypressTest/actions/workflows/cypress.yml)
[![Cypress Parallel Execution](https://github.com/drgimatt/cypressTest/actions/workflows/cypress-parallel.yml/badge.svg)](https://github.com/drgimatt/cypressTest/actions/workflows/cypress-parallel.yml)

## Author

[@drgimatt](https://github.com/drgimatt)

## License

This project is unlicensed.
