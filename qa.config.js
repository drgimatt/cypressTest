const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
    ...baseConfig,
    e2e: {
        ...baseConfig.e2e,
        baseUrl: "https://datatables.net/",
    },
    env: {
        projectName: "Cypress Test Automation Training - QA",
        environment: "qa",
    }
});