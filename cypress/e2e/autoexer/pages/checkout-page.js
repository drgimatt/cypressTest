class checkoutPage {
    
    elements = {
        addressDetailsHeader: () => cy.get(':nth-child(2) > .heading'),
        NameDelivery: () => cy.get('#address_delivery > .address_firstname'),
        companyNameDelivery: () => cy.get('#address_delivery > :nth-child(3)'),
        addressDelivery: () => cy.get('#address_delivery > :nth-child(4)'),
        cityDelivery: () => cy.get('#address_delivery > .address_city'),
        countryDelivery: () => cy.get('#address_delivery > .address_country_name'),
        phoneNumDelivery: () => cy.get('#address_delivery > .address_phone'),

        nameBilling: () => cy.get('#address_invoice > .address_firstname'),
        companyNameBilling: () => cy.get('#address_invoice > :nth-child(3)'),
        addressBilling: () => cy.get('#address_invoice > :nth-child(4)'),
        cityBilling: () => cy.get('#address_invoice > .address_city'),
        countryBilling: () => cy.get('#address_invoice > .address_country_name'),
        phoneNumBilling: () => cy.get('#address_invoice > .address_phone'),

        table_row: () => cy.get('#cart_info table tbody tr'),
        table_data: () => cy.get('#cart_info table tbody tr td'),

        placeOrderButton: () => cy.get(':nth-child(7) > .btn'),

        cardName: () => cy.get('[data-qa="name-on-card"]'),
        cardNum: () => cy.get('[data-qa="card-number"]'),
        cardCVC: () => cy.get('[data-qa="cvc"]'),
        cardMonth: () => cy.get('[data-qa="expiry-month"]'),
        cardYear: () => cy.get('[data-qa="expiry-year"]'),

        payButton: () => cy.get('[data-qa="pay-button"]'),

        title: () => cy.get('[data-qa="order-placed"] > b'),
        subtitle: () => cy.get('.col-sm-9 > p'),

        continueButton: () => cy.get('[data-qa="continue-button"]')


    }

    checkoutCart(data = null) {



        this.elements.addressDetailsHeader().should('have.text','Address Details')
        this.elements.NameDelivery().should('have.text','Mr. ' + data.firstName + ' ' + data.lastName)
        this.elements.companyNameDelivery().should('have.text',data.company)
        this.elements.addressDelivery().should('have.text',data.address)
        this.elements.cityDelivery().should('have.text',data.city + ' ' + data.state + '\n\t\t\t\t\t\t\t\t' + data.zipCode)
        this.elements.countryDelivery().should('have.text',data.country)
        this.elements.phoneNumDelivery().should('have.text',data.phoneNum)
    
        this.elements.nameBilling().should('have.text','Mr. ' + data.firstName + ' ' + data.lastName)
        this.elements.companyNameBilling().should('have.text',data.company)
        this.elements.addressBilling().should('have.text',data.address)
        this.elements.cityBilling().should('have.text',data.city + ' ' + data.state + '\n\t\t\t\t\t\t\t\t' + data.zipCode)
        this.elements.countryBilling().should('have.text',data.country)
        this.elements.phoneNumBilling().should('have.text',data.phoneNum)
    
        this.elements.table_row().should('have.length','4')
        this.elements.table_data().should('contain','Blue Top')
        this.elements.table_data().should('contain','Summer White Top')
        this.elements.table_data().should('contain','Madame Top For Women')
        this.elements.table_data().should('contain','Blue Top')

        cy.get('#product-1 > .cart_total > .cart_total_price').should('have.text','Rs. 500')
        cy.get('#product-6 > .cart_total > .cart_total_price').should('have.text','Rs. 400')
        cy.get('#product-7 > .cart_total > .cart_total_price').should('have.text','Rs. 1000')
        cy.get(':nth-child(4) > .cart_total_price').should('have.text','Rs. 1900')
        
        this.elements.placeOrderButton().click()

        this.elements.cardName().type(data.firstName + ' ' + data.lastName).should('have.value',data.firstName + ' ' + data.lastName)
        this.elements.cardNum().type(data.creditNum).should('have.value',data.creditNum)
        this.elements.cardCVC().type(data.creditCvc).should('have.value',data.creditCvc)
        this.elements.cardMonth().type('04').should('have.value','04')
        this.elements.cardYear().type('2030').should('have.value','2030')
        this.elements.payButton().click()
    }
    
    isPaymentSuccess() {
        cy.url().should('contain','https://automationexercise.com/payment_done/')
        this.elements.title().should('have.text','Order Placed!')
        this.elements.subtitle().should('contain','Congratulations!').and('contain','confirmed!')
        cy.screenshotfullPage("checkoutSuccess")
        this.elements.continueButton().click()
    }

}

module.exports = new (checkoutPage)