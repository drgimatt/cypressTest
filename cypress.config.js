const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  projectId: "eqpax6",
  experimentalStudio: true,
  env: {
    PROJECT_NAME: 'Cypress Test Automation Training',
    API_KEY: 'special-key',
    ENVIRONMENT: 'QA',
    API_BASE_URL: 'https://petstore.swagger.io/v2',
    sauceDemoBaseUrl: 'https://www.saucedemo.com/',
    dataTablesBaseUrl: 'https://datatables.net/',
    paraBankBaseUrl: 'https://parabank.parasoft.com/parabank',
  },
  //viewportWidth: 1920,
  //viewportHeight: 1080,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    //reportFilename: "[status]_[datetime]-[name]-report",
    reportFilename: "code-coverage",
    reportDir: "cypress/downloads/reports",
    //timestamp: "longDate",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
      return config
    }, testIsolation: false,
    trashAssetsBeforeRuns: true,
    excludeSpecPattern: [
      '**/affordaeats/*.cy.js',
      '**/experiment/localhost/*.cy.js'
    ],
  },
});
