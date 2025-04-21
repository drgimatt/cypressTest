class cartPage {

    elements = {
        table_row : () => cy.get('#cart_info table tbody tr'),
        table_data: () => cy.get('#cart_info table tbody tr td'),
        checkout_button: () => cy.get('.col-sm-6 > .btn')
    }

    verifyCart() {
        cy.visit('https://automationexercise.com/view_cart')
        this.elements.table_row().should('have.length','3')
        this.elements.table_data().should('contain','Blue Top')
        this.elements.table_data().should('contain','Summer White Top')
        this.elements.table_data().should('contain','Madame Top For Women')
    }

}

module.exports = new cartPage()
require('cypress-xpath')