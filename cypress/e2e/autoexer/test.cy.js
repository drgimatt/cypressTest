describe('Test Case 14 - Place Order: Register while Checkout', () => {
    let data
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Verify that Homepage is accessible', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible').and('have.css','color','rgb(255, 165, 0)')
        cy.get('.features_items > .title').should('be.visible').and('have.text','Features Items').and('have.css','color','rgb(254, 152, 15)')
    })
    it('Verify that products can be added and cart is viewable', () => {
        cy.addCartAutoExer()

    })
    it('Verify if an account can be created', () => {
        cy.get('.col-sm-6 > .btn').click()
        cy.get('.modal-body > :nth-child(2) > a > u').should('have.text','Register / Login').click()
        cy.registerAutoExer(data)

    })
    it('Verify if user can checkout items', () => {
        cy.checkoutAutoExer(data)

    })
    it('Verify that account can be deleted', () => {
        cy.deleteAccountAutoExer()

    })           
}) 

describe('Test Case 15 - Place Order: Register before Checkout', () => {
    let data
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Verify that Homepage is accessible', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible').and('have.css','color','rgb(255, 165, 0)')
        cy.get('.features_items > .title').should('be.visible').and('have.text','Features Items').and('have.css','color','rgb(254, 152, 15)')
    })
    it('Verify if an account can be created', () => {
        cy.get('.shop-menu > .nav > :nth-child(4)').should('have.text', ' Signup / Login').click()
        cy.registerAutoExer(data)

    })
    it('Verify that products can be added and cart is viewable', () => {
        cy.addCartAutoExer()

    })
    it('Verify if user can checkout items', () => {
        cy.checkoutAutoExer(data)

    })
    it('Verify that account can be deleted', () => {
        cy.deleteAccountAutoExer()

    }) 

    
})

describe('Test Case 16 - Place Order: Login before Checkout', () => {
    let data
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Verify that Homepage is accessible', () => {
        cy.visit('https://automationexercise.com/')
        cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible').and('have.css','color','rgb(255, 165, 0)')
        cy.get('.features_items > .title').should('be.visible').and('have.text','Features Items').and('have.css','color','rgb(254, 152, 15)')
    })
    it('Verify if an account can be created', () => {
        cy.get('.shop-menu > .nav > :nth-child(4)').should('have.text', ' Signup / Login').click()
        cy.registerAutoExer(data)

    })
    it('Verify that account is logged off', () => {
        cy.logoutAutoExer()
    })
    it('Verify that account can login', () => {
        cy.loginAutoExer(data)
    })
    it('Verify that products can be added and cart is viewable', () => {
        cy.addCartAutoExer()

    })
    it('Verify if user can checkout items', () => {
        cy.checkoutAutoExer(data)

    })
    it('Verify that account can be deleted', () => {
        cy.deleteAccountAutoExer()

    }) 
  })