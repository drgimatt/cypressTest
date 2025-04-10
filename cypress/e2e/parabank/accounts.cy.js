describe('Parabank Accounts Test', () => {
    let data;
    before(() => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.fixture('credentials').then((fData) => {
            data = fData;
        });
    })
    it('Parabank Account Registration', () => {
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
        cy.screenshotfullPage('accountRegisterSuccess_Parabank')
        cy.get('#leftPanel a[href="logout.htm"]').click()
    });
    it('Parabank Account Login - Registration Page', () => {
        cy.visit('https://parabank.parasoft.com/parabank/register.htm');
        cy.get('#loginPanel input[name="username"]').type(data.username).should('have.value',data.username)
        cy.get('#loginPanel input[name="password"]').type(data.password).should('have.value',data.password)
        cy.get('#loginPanel input[type="submit"]').click()
        cy.get('#rightPanel h1[class="title"]').should('not.have.value',"Error!")
        cy.get('#rightPanel p[class="error"]').should('not.have.value',"The username and password could not be verified.")
        cy.screenshotfullPage('loginSuccessRegister_Parabank')
        cy.get('#leftPanel a[href="logout.htm"]').click()
    })
    it('Parabank Account Login - Index', () => {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        cy.get('#loginPanel input[name="username"]').type(data.username).should('have.value',data.username)
        cy.get('#loginPanel input[name="password"]').type(data.password).should('have.value',data.password)
        cy.get('#loginPanel input[type="submit"]').click()
        cy.get('#rightPanel h1[class="title"]').should('not.have.value',"Error!")
        cy.get('#rightPanel p[class="error"]').should('not.have.value',"The username and password could not be verified.")
        cy.screenshotfullPage('loginSuccessIndex_Parabank')
        
    })
})