const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
    ...baseConfig,
    e2e: {
        ...baseConfig.e2e,
        baseUrl: "https://google.com/",
    },
    env: {
        projectName: "Cypress Test Automation Training - Prod",
        environment: "prod - preview",
    }
});