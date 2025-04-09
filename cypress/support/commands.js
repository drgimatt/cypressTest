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

Cypress.Commands.add('login', (username, password) => { 
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

Cypress.Commands.add('screenshotViewport', (name = 'screenshot') => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cy.screenshot(`${name}-${timestamp}`, { capture: 'fullPage' });
})