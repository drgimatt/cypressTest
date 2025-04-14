// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { generateCustomerData } from "./fakerUtils";

Cypress.Commands.add('resetBrowser', (options = { cookies: true, local: true, session: true }) => {
    const { cookies, local, session } = options;
  
    if (cookies) {
      cy.clearAllCookies();
      cy.log('Cleared all cookies');
    }
    if (local) {
      cy.clearAllLocalStorage();
      cy.log('Cleared all local storage');
    }
    if (session) {
      cy.clearAllSessionStorage();
      cy.log('Cleared all session storage');
    }
  });

Cypress.Commands.add('loginSecretDemo', (username, password) => { 
    cy.visit('https://www.saucedemo.com/'); // Runs before every test
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
 })

Cypress.Commands.add('addToCart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').should('be.visible')
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain','1')
})

Cypress.Commands.add('checkout', (firstName,lastName,postalCode) => {
    cy.get('[data-test="shopping-cart-link"]')
    .click()
    cy.get('[data-test="cart-list"]')
    .contains('Sauce Labs Fleece Jacket')
    cy.get('[data-test="checkout"]')
    .contains('Checkout')
    .click()
    cy.get('[data-test="firstName"]')
    .should('be.visible')
    .type(firstName)
    cy.get('[data-test="lastName"]')
    .should('be.visible')
    .type(lastName)
    cy.get('[data-test="postalCode"]')
    .should('be.visible')
    .type(postalCode)
    cy.get('[data-test="continue"]')
    .should('be.visible')
    .click()
    cy.get('[data-test="finish"]')
    .should('be.visible')
    .click()
    cy.get('[data-test="shopping-cart-badge"]')
    .should('not.exist')

})

Cypress.Commands.add('registerParabank', (data = null) => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    cy.get('input[id="customer.firstName"]')
        .type(data.firstName).should('have.value',data.firstName)
    cy.get('input[id="customer.lastName"]')
        .type(data.lastName).should('have.value',data.lastName)
    cy.get('input[id="customer.address.street"]')
        .type(data.address).should('have.value',data.address)
    cy.get('input[id="customer.address.city"]')
        .type(data.city).should('have.value',data.city)            
    cy.get('input[id="customer.address.state"]')
        .type(data.state).should('have.value',data.state)
    cy.get('input[id="customer.address.zipCode"]')
        .type(data.zipCode).should('have.value',data.zipCode)
    cy.get('input[id="customer.phoneNumber"]')
        .type(data.phoneNum).should('have.value',data.phoneNum)
    cy.get('input[id="customer.ssn"]')
        .type(data.ssn).should('have.value',data.ssn)
    cy.get('input[id="customer.username"]')
        .type(data.username).should('have.value',data.username)
    cy.get('input[id="customer.password"]')
        .type(data.password).should('have.value',data.password)
    cy.get('input[id="repeatedPassword"]')
        .type(data.password).should('have.value',data.password)
    cy.get('#customerForm input[type="submit"]').click()
    cy.get('#rightPanel h1[class="title"]').should('contain.text', 'Welcome ' + data.username)
})

Cypress.Commands.add('loginParabank', (url = "", data = null) => {
    cy.visit(url);
    cy.get('#loginPanel input[name="username"]').type(data.username).should('have.value',data.username)
    cy.get('#loginPanel input[name="password"]').type(data.password).should('have.value',data.password)
    cy.get('#loginPanel input[type="submit"]').click()
    cy.get('#rightPanel h1[class="title"]').should('not.have.value',"Error!")
    cy.get('#rightPanel p[class="error"]').should('not.have.value',"The username and password could not be verified.")
})

Cypress.Commands.add('generateData', () => {
    cy.readFile('cypress/fixtures/credentials.json').then((data) => {
    let testData = generateCustomerData();
    data["1"] = testData;
    cy.writeFile('cypress/fixtures/credentials.json', data);
    });
});

Cypress.Commands.add('screenshotfullPage', (name = 'screenshot') => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cy.screenshot(`${name}-${timestamp}`, { capture: 'fullPage' });
})

Cypress.Commands.add('saveCart', () => {
    cy.window().then((win) => {
      const cart = win.localStorage.getItem('cart-contents') || '[]';
      Cypress.env('savedCart', cart);
    });
  });

Cypress.Commands.add('restoreCart', () => {
    const cart = Cypress.env('savedCart') || '[]';
    cy.window().then((win) => {
        win.localStorage.setItem('cart-contents', cart);
    });
});

Cypress.Commands.add('registerAutoExer',(data = null) => {

    cy.get('[data-qa="signup-name"]').type(data.firstName + ' ' + data.lastName).should('have.value',data.firstName + ' ' + data.lastName)
    cy.get('[data-qa="signup-email"]').type(data.emailAddr).should('have.value',data.emailAddr)
    cy.get('[data-qa="signup-button"]').should('contain','Signup').click()

    cy.get('#id_gender1').click()
    cy.get('[data-qa="name"]').should('have.value',data.firstName + ' ' + data.lastName)
    cy.get('[data-qa="email"]').should('have.value',data.emailAddr)
    cy.get('[data-qa="password"]').type(data.password).should('have.value',data.password)
    cy.get('select[data-qa="days"] option:selected').should('have.text', 'Day');
    cy.get('[data-qa="days"]').select(data.dob_day).should('have.value', data.dob_day);
    cy.get('select[data-qa="months"] option:selected').should('have.text', 'Month');
    cy.get('[data-qa="months"]').select(data.dob_month).should('have.value', data.dob_month);
    cy.get('select[data-qa="years"] option:selected').should('have.text', 'Year');
    cy.get('[data-qa="years"]').select(data.dob_year).should('have.value', data.dob_year);
    cy.get('input[id=newsletter]').should('not.be.checked').and('have.value','1')
    cy.get('input[id=optin]').check()
    cy.get('input[id=optin]').should('be.checked').and('have.value','1')
    cy.get('[data-qa="first_name"]').type(data.firstName).should('have.value',data.firstName)
    cy.get('[data-qa="last_name"]').type(data.lastName).should('have.value',data.lastName)
    cy.get('[data-qa="company"]').type(data.company).should('have.value',data.company)
    cy.get('[data-qa="address"]').type(data.address).should('have.value',data.address)
    cy.get('[data-qa="address2"]').should('be.visible')
    cy.get('select[data-qa="country"] option:selected').should('have.text', 'India');
    cy.get('[data-qa="country"]').select(data.country).should('have.value',data.country)
    cy.get('[data-qa="state"]').type(data.state).should('have.value',data.state)
    cy.get('[data-qa="city"]').type(data.city).should('have.value',data.city)
    cy.get('[data-qa="zipcode"]').type(data.zipCode).should('have.value',data.zipCode)
    cy.get('[data-qa="mobile_number"]').type(data.phoneNum).should('have.value',data.phoneNum)
    cy.get('[data-qa="create-account"]').should('contain','Create Account').click()

    cy.get('b').should('have.text','Account Created!')
    cy.get('.col-sm-9 > :nth-child(2)').should('contain','Congratulations!')
    cy.get('.col-sm-9 > :nth-child(3)').should('contain','advantage')
    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()

    cy.screenshotfullPage("registrationSuccess")

    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').and('have.text',' Logout')
    cy.get(':nth-child(10) > a').should('have.text',' Logged in as '+ data.firstName + ' ' + data.lastName)
    cy.get('b').should('have.text',data.firstName + ' ' + data.lastName)
})

Cypress.Commands.add('loginAutoExer', (data = null) => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').and('have.text',' Signup / Login').click()
    
    cy.get('[data-qa="login-email"]').type(data.emailAddr).should('have.value',data.emailAddr)
    cy.get('[data-qa="login-password"]').type(data.password).should('have.value',data.password)
    cy.get('[data-qa="login-button"]').should('contain','Login').click()

    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').and('have.text',' Logout')
    cy.get(':nth-child(10) > a').should('have.text',' Logged in as '+ data.firstName + ' ' + data.lastName)
    cy.screenshotfullPage("loginSuccess")
    
})

Cypress.Commands.add('logoutAutoExer', () => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').and('have.text',' Logout')
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.screenshotfullPage("logoutSuccess")
})

Cypress.Commands.add('deleteAccountAutoExer', () => {
    cy.get('.shop-menu > .nav > :nth-child(5) > a').should('be.visible').and('have.text',' Delete Account')
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

    cy.get('.col-sm-9 > :nth-child(2)').should('contain','permanently deleted!')

    cy.screenshotfullPage("deleteSuccess")

    cy.get('.col-sm-9 > :nth-child(3)').should('contain','create new account')

    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()

    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').and('have.text',' Signup / Login')
})

Cypress.Commands.add('addCartAutoExer', () => {
    cy.url().should('eq','https://automationexercise.com/')
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('.modal-footer > .btn').click();
    cy.get('.features_items > :nth-child(8) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('.modal-footer > .btn').click();
    cy.get('.features_items > :nth-child(9) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('.modal-footer > .btn').click();
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();

    cy.get('#cart_info table tbody tr').should('have.length','3')
    cy.get('#cart_info table tbody tr td').should('contain','Blue Top')
    cy.get('#cart_info table tbody tr td').should('contain','Summer White Top')
    cy.get('#cart_info table tbody tr td').should('contain','Madame Top For Women')

    cy.screenshotfullPage("addCartSuccess")
})

Cypress.Commands.add('checkoutAutoExer', (data = null) => {
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('#cart_info table tbody tr').should('have.length','3')
    cy.get('.col-sm-6 > .btn').click()

    cy.get(':nth-child(2) > .heading').should('have.text','Address Details')
    cy.get('#address_delivery > .address_firstname').should('have.text','Mr. ' + data.firstName + ' ' + data.lastName)
    cy.get('#address_delivery > :nth-child(3)').should('have.text',data.company)
    cy.get('#address_delivery > :nth-child(4)').should('have.text',data.address)
    cy.get('#address_delivery > .address_city').should('have.text',data.city + ' ' + data.state + '\n\t\t\t\t\t\t\t\t' + data.zipCode)
    cy.get('#address_delivery > .address_country_name').should('have.text',data.country)
    cy.get('#address_delivery > .address_phone').should('have.text',data.phoneNum)

    cy.get('#address_invoice > .address_firstname').should('have.text','Mr. ' + data.firstName + ' ' + data.lastName)
    cy.get('#address_invoice > :nth-child(3)').should('have.text',data.company)
    cy.get('#address_invoice > :nth-child(4)').should('have.text',data.address)
    cy.get('#address_invoice > .address_city').should('have.text',data.city + ' ' + data.state + '\n\t\t\t\t\t\t\t\t' + data.zipCode)
    cy.get('#address_invoice > .address_country_name').should('have.text',data.country)
    cy.get('#address_invoice > .address_phone').should('have.text',data.phoneNum)

    cy.get('#cart_info table tbody tr').should('have.length','4')
    cy.get('#cart_info table tbody tr td').should('contain','Blue Top')
    cy.get('#cart_info table tbody tr td').should('contain','Summer White Top')
    cy.get('#cart_info table tbody tr td').should('contain','Madame Top For Women')
    cy.get('#cart_info table tbody tr td').should('contain','Blue Top')
    cy.get('#product-1 > .cart_total > .cart_total_price').should('have.text','Rs. 500')
    cy.get('#product-6 > .cart_total > .cart_total_price').should('have.text','Rs. 400')
    cy.get('#product-7 > .cart_total > .cart_total_price').should('have.text','Rs. 1000')
    cy.get(':nth-child(4) > .cart_total_price').should('have.text','Rs. 1900')
    
    cy.get(':nth-child(7) > .btn').click()

    cy.get('[data-qa="name-on-card"]').type(data.firstName + ' ' + data.lastName).should('have.value',data.firstName + ' ' + data.lastName)
    cy.get('[data-qa="card-number"]').type(data.creditNum).should('have.value',data.creditNum)
    cy.get('[data-qa="cvc"]').type(data.creditCvc).should('have.value',data.creditCvc)
    cy.get('[data-qa="expiry-month"]').type('04').should('have.value','04')
    cy.get('[data-qa="expiry-year"]').type('2030').should('have.value','2030')
    
    cy.get('#payment-form').then($form => {
        $form.one('submit', e => e.preventDefault());
      }); 

    cy.get('[data-qa="pay-button"]').click();

    cy.get('#success_message > .alert-success')
    .should('contain', 'Your order has been placed successfully!')
    .and('be.visible')

    cy.get('[data-qa="pay-button"]').click();

    cy.url().should('contain','https://automationexercise.com/payment_done/')
    cy.get('[data-qa="order-placed"] > b').should('have.text','Order Placed!')
    cy.get('.col-sm-9 > p').should('contain','Congratulations!').and('contain','confirmed!')

    cy.screenshotfullPage("checkoutSuccess")

    cy.get('[data-qa="continue-button"]').click()
})