describe('Test Case 14 - Place Order: Register while Checkout', () => {
    let url = 'https://automationexercise.com/'
    let data
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser(true,true,true)
    })
    it('Verify that Homepage is accessible', () => {
        cy.visit(url)
        cy.get('.shop-menu > .nav > :nth-child(1) > a').should('be.visible').and('have.css','color','rgb(255, 165, 0)')
        cy.get('.features_items > .title').should('be.visible').and('have.text','Features Items').and('have.css','color','rgb(254, 152, 15)')
    })
    it('Verify that products can be added and cart is viewable', () => {
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
    })
    it('Verify if account can be created', () => {
        cy.get('.col-sm-6 > .btn').click()
        cy.get('.modal-body > :nth-child(2) > a > u').should('have.text','Register / Login').click()

        cy.get('[data-qa="signup-name"]').type(data.firstName + ' ' + data.lastName).should('have.value',data.firstName + ' ' + data.lastName)
        cy.get('[data-qa="signup-email"]').type(data.emailAddr).should('have.value',data.emailAddr)
        cy.get('[data-qa="signup-button"]').click()

        cy.get('#id_gender1').click()
        cy.get('[data-qa="name"]').should('have.value',data.firstName + ' ' + data.lastName)
        cy.get('[data-qa="email"]').should('have.value',data.emailAddr)
        cy.get('[data-qa="password"]').type(data.password).should('have.value',data.password)
        cy.get('[data-qa="days"]').select(data.dob_day).should('have.value', data.dob_day);
        cy.get('[data-qa="months"]').select(data.dob_month).should('have.value', data.dob_month);
        cy.get('[data-qa="years"]').select(data.dob_year).should('have.value', data.dob_year);
        cy.get('input[id=newsletter]').should('not.be.checked').and('have.value','1')
        cy.get('input[id=optin]').check()
        cy.get('input[id=optin]').should('be.checked').and('have.value','1')
        cy.get('[data-qa="first_name"]').type(data.firstName).should('have.value',data.firstName)
        cy.get('[data-qa="last_name"]').type(data.lastName).should('have.value',data.lastName)
        cy.get('[data-qa="company"]').type(data.company).should('have.value',data.company)
        cy.get('[data-qa="address"]').type(data.address).should('have.value',data.address)
        cy.get('[data-qa="address2"]')
        cy.get('[data-qa="country"]').select(data.country).should('have.value',data.country)
        cy.get('[data-qa="state"]').type(data.state).should('have.value',data.state)
        cy.get('[data-qa="city"]').type(data.city).should('have.value',data.city)
        cy.get('[data-qa="zipcode"]').type(data.zipCode).should('have.value',data.zipCode)
        cy.get('[data-qa="mobile_number"]').type(data.phoneNum).should('have.value',data.phoneNum)
        cy.get('[data-qa="create-account"]').click()

        cy.get('b').should('have.text','Account Created!')
        cy.get('.col-sm-9 > :nth-child(2)').should('contain','Congratulations!')
        cy.get('.col-sm-9 > :nth-child(3)').should('contain','advantage')
        cy.get('[data-qa="continue-button"]').click()

        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').and('have.text',' Logout')
        cy.get(':nth-child(10) > a').should('have.text',' Logged in as '+ data.firstName + ' ' + data.lastName)
        cy.get('b').should('have.text',data.firstName + ' ' + data.lastName)
    })
    it('Verify if checkout details are accurate', () => {
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

    })  
    it('Verify if user can checkout items', () => {
        cy.get(':nth-child(7) > .btn').click()

        cy.get('[data-qa="name-on-card"]').type(data.firstName + ' ' + data.lastName).should('have.value',data.firstName + ' ' + data.lastName)
        cy.get('[data-qa="card-number"]').type(data.creditNum).should('have.value',data.creditNum)
        cy.get('[data-qa="cvc"]').type(data.creditCvc).should('have.value',data.creditCvc)
        cy.get('[data-qa="expiry-month"]').type('04').should('have.value','04')
        cy.get('[data-qa="expiry-year"]').type('2030').should('have.value','2030')
        cy.get('[data-qa="pay-button"]').click()

        cy.get('[data-qa="order-placed"] > b').should('have.text','Order Placed!')
        cy.get('.col-sm-9 > p').should('contain','Congratulations!').and('contain','confirmed!')
        cy.get('[data-qa="continue-button"]').click()
    })
    it('Verify that account can be deleted', () => {
        cy.get('.shop-menu > .nav > :nth-child(5) > a').should('be.visible').and('have.text',' Delete Account')
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()

        cy.get('.col-sm-9 > :nth-child(2)').should('contain','permanently deleted!')
        cy.get('.col-sm-9 > :nth-child(3)').should('contain','create new account')

        cy.get('[data-qa="continue-button"]').click()

        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').and('have.text',' Signup / Login')
        
    })           
}) 

describe('Test Case 15 - Place Order: Register before Checkout', () => {
    let url = 'https://automationexercise.com/'
    let data
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser(true,true,true)
    })
    it('', () => {
      
    });
})

describe('Test Case 16 - Place Order: Login before Checkout', () => {
    let url = 'https://automationexercise.com/'
    let data
    before(() => {
        cy.fixture('autoexecdetails.json').then((fdata) => {
            data = fdata;
        })
        cy.resetBrowser(true,true,true)
    })
    it('', () => {
      
    });
  })