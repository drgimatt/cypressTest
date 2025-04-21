import homePage from "./pages/home-page"
import cartsPage from "./pages/carts-page"
import signupPage from "./pages/signup-page"
import loginPage from "./pages/login-page"
import checkoutPage from "./pages/checkout-page"


describe('Test Case 14 - Place Order: Register while Checkout', () => {
    let data, name
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Verify that Homepage is accessible', () => {
        cy.visit('https://automationexercise.com/')
        cy.screenshotfullPage('homeSuccess')
    })
    it('Verify that products can be added and cart is viewable', () => {
        homePage.addToCart()
        cartsPage.verifyCart()

    })
    it('Verify if an account can be created', () => {
        cy.get('.col-sm-6 > .btn').click()
        cy.get('.modal-body > :nth-child(2) > a > u').should('have.text','Register / Login').click()
        name = data.firstName + " " + data.lastName
        loginPage.signupUser(name, data.emailAddr)
        signupPage.signUpUser(data)
        signupPage.verifyUserIsSignedUp()
        loginPage.verifyLoginUser(data.firstName, data.lastName)

    })
    it('Verify if user can checkout items', () => {
        cartsPage.verifyCart()
        cartsPage.elements.checkout_button().click()
        checkoutPage.checkoutCart(data)
        checkoutPage.isPaymentSuccess()

    })
    it('Verify that account can be deleted', () => {
        homePage.deleteUser()
    })           
}) 

describe('Test Case 15 - Place Order: Register before Checkout', () => {
    let data, name
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Verify that Homepage is accessible', () => {
        cy.visit('https://automationexercise.com/')
        cy.screenshotfullPage('homeSuccess')
    })
    it('Verify if an account can be created', () => {
        name = data.firstName + " " + data.lastName
        loginPage.signupUser(name, data.emailAddr)
        signupPage.signUpUser(data)
        signupPage.verifyUserIsSignedUp()
        loginPage.verifyLoginUser(data.firstName, data.lastName)

    })
    it('Verify that products can be added and cart is viewable', () => {
        homePage.addToCart()
        cartsPage.verifyCart()

    })
    it('Verify if user can checkout items', () => {
        cartsPage.verifyCart()
        cartsPage.elements.checkout_button().click()
        checkoutPage.checkoutCart(data)
        checkoutPage.isPaymentSuccess()

    })
    it('Verify that account can be deleted', () => {
        homePage.deleteUser()
    })    

    
})

describe('Test Case 16 - Place Order: Login before Checkout', () => {
    let data, name
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Verify that Homepage is accessible', () => {
        cy.visit('https://automationexercise.com/')
        cy.screenshotfullPage('homeSuccess')
    })
    it('Verify if an account can be created', () => {
        name = data.firstName + " " + data.lastName
        loginPage.signupUser(name, data.emailAddr)
        signupPage.signUpUser(data)
        signupPage.verifyUserIsSignedUp()
        loginPage.verifyLoginUser(data.firstName, data.lastName)

    })
    it('Verify that account is logged off', () => {
        homePage.logout()
    })
    it('Verify that account can login', () => {
        loginPage.loginUser(data.emailAddr, data.password)
    })
    it('Verify that products can be added and cart is viewable', () => {
        homePage.addToCart()
        cartsPage.verifyCart()

    })
    it('Verify if user can checkout items', () => {
        cartsPage.verifyCart()
        cartsPage.elements.checkout_button().click()
        checkoutPage.checkoutCart(data)
        checkoutPage.isPaymentSuccess()

    })
    it('Verify that account can be deleted', () => {
        homePage.deleteUser()

    }) 
  })