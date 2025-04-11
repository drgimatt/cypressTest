const { generateCustomerData } = require("../../support/fakerUtils");

describe('Parabank Accounts Test Flow', () => {
    let data;
    before(() => {
        cy.resetBrowser(true,true,true)
        cy.generateData()
        data = generateCustomerData();
    })
    it('Parabank Account Registration', () => {
        cy.registerParabank(data)
        cy.screenshotfullPage('accountRegisterSuccess_Parabank')
        cy.get('#leftPanel a[href="logout.htm"]').click()
    });
    it('Parabank Account Login - Registration Page', () => {
        cy.loginParabank('https://parabank.parasoft.com/parabank/register.htm',data)
        cy.screenshotfullPage('loginSuccessRegister_Parabank')
        cy.get('#leftPanel a[href="logout.htm"]').click()
    })
    it('Parabank Account Login - Index', () => {
        cy.loginParabank('https://parabank.parasoft.com/parabank/index.htm',data)
        cy.screenshotfullPage('loginSuccessIndex_Parabank')
    })
})