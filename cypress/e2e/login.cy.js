describe('Login Spec', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/'); // Runs before every test
  });
  it('Is able to type', () => {
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.get('.app_logo').should('be.visible')
    cy.contains('Swag Labs')
    cy.get('[data-test="title"]').contains('Products');
    cy.url().should('include','inventory.html')
  })
  it('Is not able to login', () => {
    cy.get('[data-test="username"]').type("locked_out_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain','Epic sadface: Sorry, this user has been locked out.')
  })
})