class homePage {

    elements = {

        product: (index) => cy.get(`.features_items > :nth-child(${index}) > .product-image-wrapper > .single-products > .productinfo > .btn`),
        popupAddProduct : () => cy.get('.modal-footer > .btn'),
        cartTab : () => cy.get('.shop-menu > .nav > :nth-child(3) > a'),
        userState : () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        deleteUserTab : () => cy.get('.shop-menu > .nav > :nth-child(5) > a'),
        paragraph1 : () => cy.get('.col-sm-9 > :nth-child(2)'),
        paragraph2: () => cy.get('.col-sm-9 > :nth-child(3)'),
        continueButton: () => cy.get('[data-qa="continue-button"]')
    }

    addToCart() {
        for (let i = 1; i <= 3; i++){
            let productIndex
            if (i === 1) {
                productIndex = 3;
            } else if (i === 2) {
                productIndex = 8;
            } else if (i === 3) {
                productIndex = 9;
            }
            this.elements.product(productIndex).click()
            this.elements.popupAddProduct().click()
        }
    }

    logout() {
        this.elements.userState().should('be.visible').and('have.text',' Logout')
        this.elements.userState().click()
        cy.screenshotfullPage("logoutSuccess")
    }

    deleteUser() {
        this.elements.deleteUserTab().should('be.visible').and('have.text',' Delete Account')
        this.elements.deleteUserTab().click()
    
        this.elements.paragraph1().should('contain','permanently deleted!')
    
        cy.screenshotfullPage("deleteSuccess")
    
        this.elements.paragraph2().should('contain','create new account')
    
        this.elements.continueButton().should('contain','Continue').click()
    
        this.elements.userState().should('be.visible').and('have.text',' Signup / Login')
    }


}

module.exports = new homePage()
require('cypress-xpath')