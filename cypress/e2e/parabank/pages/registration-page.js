class registrationPage {

    elements = {
        firstNameInput : () => cy.get('input[id="customer.firstName"]'),
        lastNameInput : () => cy.get('input[id="customer.lastName"]'),
        addressInput : () => cy.get('input[id="customer.address.street"]'),
        cityInput : () => cy.get('input[id="customer.address.city"]'),
        stateInput : () => cy.get('input[id="customer.address.state"]'),
        zipCodeInput : () => cy.get('input[id="customer.address.zipCode"]'),
        phoneNumberInput : () => cy.get('input[id="customer.phoneNumber"]'),
        ssnInput : () => cy.get('input[id="customer.ssn"]'),
        usernameInput : () => cy.get('input[id="customer.username"]'),
        passwordInput : () => cy.get('input[id="customer.password"]'),
        confirmPasswordInput : () => cy.get('input[id="repeatedPassword"]'),
        registerButton : () => cy.get('input[value="Register"]'),
        loginButton : () => cy.get('#customerForm input[type="submit"]'),
        welcomeMessage : () => cy.get('h1.title'),
        errorTitle : () => cy.get('#rightPanel h1[class="title"]'),
        errorMessage : () => cy.get('#rightPanel h1[class="error"]')
    }

    submitSignUpForm() {
        this.elements.registerButton().click()
    }

    verifySignUpSuccess(username) {
        this.elements.welcomeMessage().should('contain.text', `Welcome ${username}`);
      }

    performLoginProcess(username, password) {
        this.elements.usernameInput().type(username).should('have.value', username)
        this.elements.passwordInput().type(password).should('have.value', password)
        this.elements.loginButton().click()
        this.elements.errorTitle().should('not.have.value',"Error!")
        this.elements.errorMessage().should('not.have.value',"The username and password could not be verified.")
    }

}

module.exports = new registrationPage()
require('cypress-xpath')