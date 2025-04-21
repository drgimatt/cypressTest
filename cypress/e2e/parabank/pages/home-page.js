class homePage {
    
    elements = {

        usernameInput : () => cy.get('form > :nth-child(2) > .input'),
        passwordInput : () => cy.get('form > :nth-child(4) > .input'),
        loginBtn : () => cy.get('#loginPanel input[type="submit"]'),
        welcomeMessage : () => cy.get('h1.title'),
        errorTitle : () => cy.get('#rightPanel h1[class="title"]'),
        errorMessage : () => cy.get('#rightPanel h1[class="error"]')

    }

    performLoginProcess(username, password) {
        this.elements.usernameInput().type(username).should('have.value', username)
        this.elements.passwordInput().type(password).should('have.value', password)
        this.elements.loginBtn().click()
    }

    verifyLoginSuccess(username) {
        this.elements.welcomeMessage().should('contain.text', `Welcome ${username}`);
    }

}

module.exports = new homePage()
require('cypress-xpath')