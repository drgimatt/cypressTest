// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { generateCustomerData } from "./fakerUtils";

Cypress.Commands.add('resetBrowser', (cookies = true, local = true, session = true ) => {
    if (cookies) {
        cy.clearAllCookies()
    }
    if (local) {
        cy.clearAllLocalStorage()
    }
    if (session) {
        cy.clearAllSessionStorage()
    }
})

Cypress.Commands.add('loginSecretDemo', (username, password) => { 
    cy.visit('https://www.saucedemo.com/'); // Runs before every test
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
 })

Cypress.Commands.add('addToCart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').should('be.visible')
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain','1')
})

Cypress.Commands.add('checkout', (firstName,lastName,postalCode) => {
    cy.get('[data-test="shopping-cart-link"]')
    .click()
    cy.get('[data-test="cart-list"]')
    .contains('Sauce Labs Fleece Jacket')
    cy.get('[data-test="checkout"]')
    .contains('Checkout')
    .click()
    cy.get('[data-test="firstName"]')
    .should('be.visible')
    .type(firstName)
    cy.get('[data-test="lastName"]')
    .should('be.visible')
    .type(lastName)
    cy.get('[data-test="postalCode"]')
    .should('be.visible')
    .type(postalCode)
    cy.get('[data-test="continue"]')
    .should('be.visible')
    .click()
    cy.get('[data-test="finish"]')
    .should('be.visible')
    .click()
    cy.get('[data-test="shopping-cart-badge"]')
    .should('not.exist')

})

Cypress.Commands.add('registerParabank', (data = null) => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    cy.get('input[id="customer.firstName"]')
        .type(data.firstName).should('have.value',data.firstName)
    cy.get('input[id="customer.lastName"]')
        .type(data.lastName).should('have.value',data.lastName)
    cy.get('input[id="customer.address.street"]')
        .type(data.address).should('have.value',data.address)
    cy.get('input[id="customer.address.city"]')
        .type(data.city).should('have.value',data.city)            
    cy.get('input[id="customer.address.state"]')
        .type(data.state).should('have.value',data.state)
    cy.get('input[id="customer.address.zipCode"]')
        .type(data.zipCode).should('have.value',data.zipCode)
    cy.get('input[id="customer.phoneNumber"]')
        .type(data.phoneNum).should('have.value',data.phoneNum)
    cy.get('input[id="customer.ssn"]')
        .type(data.ssn).should('have.value',data.ssn)
    cy.get('input[id="customer.username"]')
        .type(data.username).should('have.value',data.username)
    cy.get('input[id="customer.password"]')
        .type(data.password).should('have.value',data.password)
    cy.get('input[id="repeatedPassword"]')
        .type(data.password).should('have.value',data.password)
    cy.get('#customerForm input[type="submit"]').click()
    cy.get('#rightPanel h1[class="title"]').should('contain.text', 'Welcome ' + data.username)
})

Cypress.Commands.add('loginParabank', (url = "", data = null) => {
    cy.visit(url);
    cy.get('#loginPanel input[name="username"]').type(data.username).should('have.value',data.username)
    cy.get('#loginPanel input[name="password"]').type(data.password).should('have.value',data.password)
    cy.get('#loginPanel input[type="submit"]').click()
    cy.get('#rightPanel h1[class="title"]').should('not.have.value',"Error!")
    cy.get('#rightPanel p[class="error"]').should('not.have.value',"The username and password could not be verified.")
})

Cypress.Commands.add('generateData', () => {
    cy.readFile('cypress/fixtures/credentials.json').then((data) => {
    let testData = generateCustomerData();
    data["1"] = testData;
    cy.writeFile('cypress/fixtures/credentials.json', data);
    });
});
    

Cypress.Commands.add('screenshotfullPage', (name = 'screenshot') => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cy.screenshot(`${name}-${timestamp}`, { capture: 'fullPage' });
})