# Cypress Testing Repository
## Description

This repository contains a sample test automation project that accesses the [**SauceDemo**](https://www.saucedemo.com/) webpage using **Cypress** for testing. It includes tests for **Login** features with the ability to run in **headless** and **headed** modes.

## Features

- Check if user is able to login with correct credentials
- Check if user is not able to login with incorrect credentials
- Check if user is able to add items to cart
- Check if user is able to checkout with items on cart

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
4. In the newly opened browser window, select "login.cy.js" 

## Author

[@drgimatt](https://github.com/drgimatt)

## License

This project is unlicensed.
