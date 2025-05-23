describe('Cart Persistence Test', () => {
    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        Cypress.config('baseUrl', Cypress.env('sauceDemoBaseUrl'))
    })
    it('adds item to cart and saves cart contents', () => {
        cy.visit('/');
        cy.loginSecretDemo("standard_user", "secret_sauce");

        // Add item to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Save current cart state
        cy.saveCart();

        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
    });

    describe('Verify cart item persists after restoring cart and login', () => {
        beforeEach(() => {
            cy.visit('/');

            // Restore cart contents before auth
            cy.restoreCart();

            cy.loginSecretDemo("standard_user", "secret_sauce");
        });
        it('should show the item in the cart after login', () => {
            cy.get('[data-test="shopping-cart-badge"]')
                .should('be.visible')
                .and('have.css', 'background-color', 'rgb(226, 35, 26)')
                .and('have.text', '1');
        });
    });
});
