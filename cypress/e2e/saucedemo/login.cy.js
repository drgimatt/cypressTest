describe('SauceDemo Login Test Flow', () => {
  beforeEach(() => {
    cy.resetBrowser({ cookies: true, local: true, session: true });
    Cypress.config('baseUrl', Cypress.env('sauceDemoBaseUrl'))
  });
  it('Is able to login', () => {
    cy.loginSecretDemo('standard_user','secret_sauce')
    cy.get('.app_logo').should('be.visible')
    cy.contains('Swag Labs')
    cy.get('[data-test="title"]').contains('Products');
    cy.url().should('include','/inventory.html')
    cy.screenshotfullPage('loginSuccess_SauceDemo')
  })
  it('Is not able to login', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type("locked_out_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain','Epic sadface: Sorry, this user has been locked out.')
    cy.screenshotfullPage('loginFailure_SauceDemo')
  })
})