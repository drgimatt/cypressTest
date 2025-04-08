/// <reference types="Cypress" />


describe('E-Commerce Test Flow/Workflow', () => {
  before(() => {
    cy.clearAllSessionStorage()
    })
  it('Verify Login Function', () => {
    cy.login('standard_user','secret_sauce')
    cy.get('.app_logo').should('be.visible')
    cy.contains('Swag Labs')
    cy.get('[data-test="title"]').contains('Products');
    cy.url().should('include','https://www.saucedemo.com/inventory.html')
  })
  it('Add an item to cart', () => {
    cy.addToCart()
  });
  it('Checkout with an item on cart', () => {
    cy.checkout('Miguel','Escandor','1920')
  });
})
