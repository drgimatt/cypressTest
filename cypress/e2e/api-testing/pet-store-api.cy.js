let baseURL
describe('Swagger Petstore - GET Store Inventory', () => {
    
    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/store"
    })

    it('Returns a Response Code of 200', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/inventory'
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

    it('Returns a body in JSON Format', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/inventory'
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
        })
    });

    it('Returns a Response Code of 405 if request is not GET', () => {
        cy.api({
            method : 'POST',
            url : baseURL + '/inventory',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(405);
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

})

describe('Swagger Petstore - POST Store Order', () => {
    
    let order = {
        "id": 5,
        "petId": 4,
        "quantity": 6,
        "shipDate": "2025-04-22T03:15:19.384Z",
        "status": "placed",
        "complete": true
    }

    let faultyOrder = {
        "id": 'A%^@$%',
        "petId": 4856587766,
        "quantity": 6,
        "shipDate": "03:15:19.384Z",
        "status": "panget",
        "complete": true
    }

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/store"
    })

    it('Returns a Response Code of 200 for Valid Order', () => {

        cy.api({
            method : 'POST',
            url : baseURL + '/order',
            body: order
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
            expect(res.headers['content-type']).to.eql("application/json")
        })
    });

    it('Returns a body in JSON Format with 6 key-value pairs', () => {
        cy.api({
            method : 'POST',
            url : baseURL + '/order',
            body: order
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(Object.keys(res.body).length).to.eql(6)
        })
    });

    it('Returns a Response Code of 400 if order is not valid', () => {
        cy.api({
            method : 'POST',
            url : baseURL + '/order' + '/%',
            body : faultyOrder,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

})

describe('Swagger Petstore - GET Store Order', () => {

    let order = {
        "id": 10,
        "petId": 5,
        "quantity": 6,
        "shipDate": "2025-01-12T03:15:19.384+0000",
        "status": "delivered",
        "complete": true
    }

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/store"
        cy.api({
            method : 'POST',
            url : baseURL + '/order',
            body: order
        })
    })

    it('Returns a Response Code of 400 for Invalid Order ID', () => {

        cy.api({
            method : 'GET',
            url : baseURL + '/order/' + 'A%^@$%',
            //body : faultyOrder,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(400);
        })
    });
    
    it('Returns a Response Code of 404 for Non-existent Order ID', () => {

        cy.api({
            method : 'GET',
            url : baseURL + '/order/' + 16433545645,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404);
        })
    });

})

describe('Swagger Petstore - DELETE Store Order', () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/store"
    })

    it('Returns a Response Code of 400 for Invalid Order ID', () => {

        cy.api({
            method : 'DELETE',
            url : baseURL + '/order/' + 'A%^@$%',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(400);
        })
    });
    
    it('Returns a Response Code of 404 for Non-existent Order ID', () => {

        cy.api({
            method : 'DELETE',
            url : baseURL + '/order/' + 16433545645,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404);
        })
    });


})

describe('Swagger Petstore - POST User as List', () => {
    let json = [
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        },          
    ]

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
    })
    
    it('Returns a Response Code of 200 and returns a content type of JSON', () => {
        cy.api({
            method : 'POST',
            url : baseURL + '/createWithList',
            body : json
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.body.message).to.eql('ok')
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

    it('Returns a Response Code of 405 if request is not POST', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/createWithList',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(405);
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });
})

describe('Swagger Petstore - POST User as Array', () => {
    let json = [
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        }          
    ]

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
    })
    
    it('Returns a Response Code of 200 and returns a content type of JSON', () => {
        cy.api({
            method : 'POST',
            url : baseURL + '/createWithList',
            body : json
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.body.message).to.eql('ok')
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

    it('Returns a Response Code of 405 if request is not POST', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/createWithList',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(405);
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });
})

describe('Swagger Petstore - POST User with Base URL', () => {
    let json = 
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        }          


    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
    })
    
    it('Returns a Response Code of 200 and returns a content type of JSON', () => {
        cy.api({
            method : 'POST',
            url : baseURL+ '/',
            failOnStatusCode: false,
            body : json
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

    it('Returns a Response Code of 405 if request is not POST', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/createWithList',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(405);
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });
})

describe('Swagger Petstore - GET User by Username', () => {
    let json = [
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        }       
    ]

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
        cy.api({
            method : 'POST',
            url : baseURL + '/createWithList',
            body : json
        })
    })
    
    it('Returns a Response Code of 200 and returns a content type of JSON', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/' + json[0].username,
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.body.username).to.eql(json[0].username)
            expect(res.body.email).to.eql(json[0].email)
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

    it('Returns a Response Code of 404 if username is not found', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/' + 'chickenjockey',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
            expect(res.body.message).to.eql('User not found')
            expect(res.body.type).to.eql('error')
        })
    });

    it('Returns a Response Code of 400 if invalid username is supplied', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/' + '%',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(400);
        })
    });
})

describe('Swagger Petstore - Update user by PUT', () => {
    let json = [
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        }       
    ]

    let updatedJson = {

            "firstName": "max",
            "lastName": "verstappen",
    }       
    

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
        cy.api({
            method : 'POST',
            url : baseURL + '/createWithList',
            body : json
        })
    })
    
    it('Returns a Response Code of 200 and returns a content type of JSON', () => {
        cy.api({
            method : 'PUT',
            url : baseURL + '/' + json[0].username,
            body: updatedJson,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.body.message).to.eql('0')
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

    it('Returns a Response Code of 404 if username is not found', () => {
        cy.api({
            method : 'PUT',
            url : baseURL + "//",
            body : {},
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404);
            expect(res.headers['content-type']).to.eql("application/xml")
            expect(res.headers.server).to.eql("Jetty(9.2.9.v20150224)")
        })
    });

    it('Returns a Response Code of 400 if invalid username is supplied', () => {
        cy.api({
            method : 'PUT',
            url : baseURL + '/' + '%',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(400);
        })
    });

})

describe('Swagger Petstore - Delete user by DELETE', () => {
    let json = [
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        }       
    ]     
    

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
        cy.api({
            method : 'POST',
            url : baseURL + '/createWithList',
            body : json
        })
    })

    it('Returns a Response Code of 200 if the user is successfully deleted', () => {
        cy.api({
            method : 'DELETE',
            url : baseURL + '/' + json[0].username,
            body : {},
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.body.message).to.eql(json[0].username)
        })
    });

    it('Returns a Response Code of 404 if the user is not found', () => {
        cy.api({
            method : 'DELETE',
            url : baseURL + '//',
            body : {},
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404);
            expect(res.headers['content-type']).to.eql("application/xml")
        })
    });

    it('Returns a Response Code of 400 if invalid username is supplied', () => {
        cy.api({
            method : 'DELETE',
            url : baseURL + '/' + '%',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(400);
        })
    });

})

describe('Swagger Petstore - User Login', () => {
    let json = [
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        }       
    ]     

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
        cy.api({
            method : 'POST',
            url : baseURL + '/createWithList',
            body : json
        })
    })
    
    it('Returns a Response Code of 200 if the user is successfully logged-in', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/login?username=' + json[0].username + '&password=' + json[0].password,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.headers['content-type']).to.eql("application/json")
            expect(res.body.message).to.contain('logged in user session')
            expect(res.headers['x-rate-limit']).to.eql('5000')
        })
    });

    it('Returns a Response Code of 400 if the credentials are not valid', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/login%',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(400);
        })
    });
})

describe('Swagger Petstore - User Logout', () => {  
    let json = [
        {
            "id": 0,
            "username": "livemax",
            "firstName": "live",
            "lastName": "max",
            "email": "max@livemax.com",
            "password": "Passw0rd",
            "phone": "5555555",
            "userStatus": 0
        }       
    ]     

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
        baseURL = Cypress.env('API_BASE_URL') + "/user"
        cy.api({
            method : 'POST',
            url : baseURL + '/createWithList',
            body : json
        })
    })
    
    it('Returns a Response Code of 200 if the user is able to log out', () => {
        cy.api({
            method : 'GET',
            url : baseURL + '/logout',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(200);
        })
    });

    it('Returns a Response Code of 405 if request is not GET', () => {
        cy.api({
            method : 'POST',
            url : baseURL + '/logout',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(405);
        })
    });
})