const { generateCustomerData } = require("../../support/fakerUtils");

describe('Parabank Accounts Test Flow', () => {
    let data;
    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        cy.generateData()
        data = generateCustomerData();
        Cypress.config('baseUrl', Cypress.env('paraBankBaseUrl'))
    })
    it('Parabank Account Registration', () => {
        cy.visit('/register.htm')
        cy.registerParabank(data)
        cy.screenshotfullPage('accountRegisterSuccess_Parabank')
        cy.get('#leftPanel a[href="logout.htm"]').click()
    });
    it('Parabank Account Login - Registration Page', () => {
        cy.loginParabank('/register.htm',data)
        cy.screenshotfullPage('loginSuccessRegister_Parabank')
        cy.get('#leftPanel a[href="logout.htm"]').click()
    })
    it('Parabank Account Login - Index', () => {
        cy.loginParabank('/index.htm',data)
        cy.screenshotfullPage('loginSuccessIndex_Parabank')
    })
})