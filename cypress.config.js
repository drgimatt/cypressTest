const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  projectId: "eqpax6",
  experimentalStudio: true,
  // viewportWidth: 1920,
  // viewportHeight: 1080,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    //reportFilename: "[status]_[datetime]-[name]-report",
    reportFilename: "code-coverage",
    reportDir:"cypress/downloads/reports",
    //timestamp: "longDate",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {  
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    }, testIsolation: false,
    trashAssetsBeforeRuns: true
  },
});
