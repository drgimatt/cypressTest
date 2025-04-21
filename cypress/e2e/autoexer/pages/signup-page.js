class signupPage {

    elements = {
        genderField : () => cy.get('#id_gender1'),
        nameField : () => cy.get('[data-qa="name"]'),
        emailField : () => cy.get('[data-qa="email"]'),
        passwordField : () => cy.get('[data-qa="password"]'),
        daysSelector : () => cy.get('[data-qa="days"]'),
        daysOption: () => cy.get('select[data-qa="days"] option:selected'),
        monthsSelector : () => cy.get('[data-qa="months"]'),
        monthsOption : () => cy.get('select[data-qa="months"] option:selected'),
        yearsSelector : () => cy.get('[data-qa="years"]'),
        yearsOption : () => cy.get('select[data-qa="years"] option:selected'),
        optInNews : () => cy.get('input[id=newsletter]'),
        optInOffers : () => cy.get('input[id=optin]'),
        firstNameAddressField : () => cy.get('[data-qa="first_name"]'),
        lastNameAddressField : () => cy.get('[data-qa="last_name"]'),
        company : () => cy.get('[data-qa="company"]'),
        address1Field : () => cy.get('[data-qa="address"]'),
        address2Field : () => cy.get('[data-qa="address2"]'),
        countryField : () => cy.get('[data-qa="country"]'),
        countryOption: () => cy.get('select[data-qa="country"] option:selected'),
        stateField : () => cy.get('[data-qa="state"]'),
        cityField : () => cy.get('[data-qa="city"]'),
        zipField : () => cy.get('[data-qa="zipcode"]'),
        mobileNumField : () => cy.get('[data-qa="mobile_number"]'),
        createAccountButton : () => cy.get('[data-qa="create-account"]'),
        title : () => cy.get('b'),
        subMessage1 : () => cy.get('.col-sm-9 > :nth-child(2)'),
        subMessage2 : () => cy.get('.col-sm-9 > :nth-child(3)'),
        continueButton : () => cy.get('[data-qa="continue-button"]')
    }

    signUpUser(data = null) {
        this.elements.genderField().click()
        this.elements.nameField().should('have.value',data.firstName + ' ' + data.lastName)
        this.elements.emailField().should('have.value',data.emailAddr)
        this.elements.passwordField().type(data.password).should('have.value',data.password)
        this.elements.daysOption().should('have.text', 'Day');
        this.elements.daysSelector().select(data.dob_day).should('have.value', data.dob_day);
        this.elements.monthsOption().should('have.text', 'Month');
        this.elements.monthsSelector().select(data.dob_month).should('have.value', data.dob_month);
        this.elements.yearsOption().should('have.text', 'Year');
        this.elements.yearsSelector().select(data.dob_year).should('have.value', data.dob_year);
        this.elements.optInNews().should('not.be.checked').and('have.value','1')
        this.elements.optInOffers().check()
        this.elements.optInOffers().should('be.checked').and('have.value','1')
        this.elements.firstNameAddressField().type(data.firstName).should('have.value',data.firstName)
        this.elements.lastNameAddressField().type(data.lastName).should('have.value',data.lastName)
        this.elements.company().type(data.company).should('have.value',data.company)
        this.elements.address1Field().type(data.address).should('have.value',data.address)
        this.elements.address2Field().should('be.visible')
        this.elements.countryOption().should('have.text', 'India');
        this.elements.countryField().select(data.country).should('have.value',data.country)
        this.elements.stateField().type(data.state).should('have.value',data.state)
        this.elements.cityField().type(data.city).should('have.value',data.city)
        this.elements.zipField().type(data.zipCode).should('have.value',data.zipCode)
        this.elements.mobileNumField().type(data.phoneNum).should('have.value',data.phoneNum)
        this.elements.createAccountButton().should('contain','Create Account').click()
    }

    verifyUserIsSignedUp() {
        cy.get('b').should('have.text','Account Created!')
        cy.get('.col-sm-9 > :nth-child(2)').should('contain','Congratulations!')
        cy.get('.col-sm-9 > :nth-child(3)').should('contain','advantage')
        cy.get('[data-qa="continue-button"]').should('contain','Continue').click()
        cy.screenshotfullPage("registrationSuccess")
    }

}

module.exports = new signupPage()
require('cypress-xpath')