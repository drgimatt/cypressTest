class loginPage {

    elements = {
        signup_name: () => cy.get('[data-qa="signup-name"]'),
        signup_email: () => cy.get('[data-qa="signup-email"]'),
        signup_button: () => cy.get('[data-qa="signup-button"]'),

        login_email: () => cy.get('[data-qa="login-email"]'),
        login_password: () => cy.get('[data-qa="login-password"]'),
        login_button: () => cy.get('[data-qa="login-button"]'),

        userStateTab: () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        currentUserInfo: () => cy.get(':nth-child(10) > a'),
        userName: () => cy.get('b')
    }

    loginUser(email, password) {
        cy.visit('https://automationexercise.com/login')
        this.elements.login_email().type(email).should('have.value',email)
        this.elements.login_password().type(password).should('have.value',password)
        this.elements.login_button().should('contain','Login').click()
    }

    signupUser(name, email) {
        cy.visit('https://automationexercise.com/login')
        this.elements.signup_name().type(name).should('have.value',name)
        this.elements.signup_email().type(email).should('have.value',email)
        this.elements.signup_button().should('contain','Signup').click()
    }

    verifyLoginUser(firstname, lastname) {
        this.elements.userStateTab().should('be.visible').and('have.text',' Logout')
        this.elements.currentUserInfo().should('have.text',' Logged in as '+ firstname + ' ' + lastname)
        this.elements.userName().should('have.text',firstname + ' ' + lastname)
    }
}

module.exports = new (loginPage)