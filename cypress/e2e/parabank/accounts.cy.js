const { generateCustomerData } = require("../../support/fakerUtils");

describe('Parabank Accounts Test', () => {
    let data, jsonData;
    before(() => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.fixture('credentials').then((fData) => {
            jsonData = fData;
        });
        data = generateCustomerData();
    })
    it.only('Parabank Account Registration', () => {
        cy.registerParabank(data)
        //cy.screenshotfullPage('accountRegisterSuccess_Parabank')
        //cy.get('#leftPanel a[href="logout.htm"]').click()
    });
    it('Parabank Account Login - Registration Page', () => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.get('#loginPanel input[name="username"]').type(data.username).should('have.value',data.username)
        cy.get('#loginPanel input[name="password"]').type(data.password).should('have.value',data.password)
        cy.get('#loginPanel input[type="submit"]').click()
        cy.get('#rightPanel h1[class="title"]').should('not.have.value',"Error!")
        cy.get('#rightPanel p[class="error"]').should('not.have.value',"The username and password could not be verified.")
        cy.screenshotfullPage('loginSuccessRegister_Parabank')
        cy.get('#leftPanel a[href="logout.htm"]').click()
    })
    it('Parabank Account Login - Index', () => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        cy.get('#loginPanel input[name="username"]').type(data.username).should('have.value',data.username)
        cy.get('#loginPanel input[name="password"]').type(data.password).should('have.value',data.password)
        cy.get('#loginPanel input[type="submit"]').click()
        cy.get('#rightPanel h1[class="title"]').should('not.have.value',"Error!")
        cy.get('#rightPanel p[class="error"]').should('not.have.value',"The username and password could not be verified.")
        cy.screenshotfullPage('loginSuccessIndex_Parabank')
        
    })
})