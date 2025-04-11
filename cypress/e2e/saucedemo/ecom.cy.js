describe('SauceDemo E-Commerce Test Flow', () => {
  before(() => {
    cy.resetBrowser(true,true,true)
    })
  it('Verify Login Function', () => {
    cy.loginSecretDemo('standard_user','secret_sauce')
    cy.get('.app_logo').should('be.visible')
    cy.contains('Swag Labs')
    cy.get('[data-test="title"]').contains('Products');
    cy.url().should('include','https://www.saucedemo.com/inventory.html')
  })
  it('Add an item to cart', () => {
    cy.addToCart()
    cy.screenshotfullPage('addCartSuccess_SauceDemo')
  });
  it('Checkout with an item on cart', () => {
    cy.checkout('Miguel','Escandor','1920')
    cy.screenshotfullPage('checkoutSuccess_SauceDemo')
  });
})
