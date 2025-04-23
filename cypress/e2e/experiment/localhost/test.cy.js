import { faker } from "@faker-js/faker";
let baseURL = "http://localhost:3000/api/users"
let token = 'STATIC_TOKEN_123'

let json = {
    "name": faker.internet.username(),
    "email": faker.internet.email(),
    "password": faker.internet.password()
}

let testJson = {
    "name": "John Doe",
    "email": "qwe@example.com",
    "password": "password123"
}

let id = null

describe('POST Request - Register a User', () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 201 - Created', () => {
        cy.api({
            method: 'POST',
            url: baseURL + '/register',
            body : json,
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(201);
            expect(response.statusText).to.eql('Created');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("User registered")
            expect(response.body.user.name).to.eql(json.name)
            expect(response.body.user.email).to.eql(json.email)
            id = response.body.user.id
        })
    })
    it('Returns a Response code of 400 for Missing Fields', () => {
        cy.api({
            method: 'POST',
            url: baseURL + '/register',
            body : {
                name: "teranull",
                email: "null@null.com"
            },
            headers: {
                Authorization: 'Bearer ' + token
            },
            failOnStatusCode : false
        }).then((response) => {
            expect(response.status).to.eql(400);
            expect(response.statusText).to.eql('Bad Request');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("All fields required")
        })
    })
    it('Returns a Response code of 400 for existing email', () => {
        cy.api({
            method: 'POST',
            url: baseURL + '/register',
            body : json,
            headers: {
                Authorization: 'Bearer ' + token
            },
            failOnStatusCode : false
        }).then((response) => {
            expect(response.status).to.eql(400);
            expect(response.statusText).to.eql('Bad Request');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("Email already exists")
        })
    })
})

describe('POST Request - User Login', () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 200 - OK and Token should be returned', () => {
        cy.api({
            method: 'POST',
            url: baseURL + '/login',
            body : {
                "email" : json.email,
                "password" : json.password
            },
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.token).to.eql(token)
        })
    })
    it('Returns a Response code of 400 for Non-existing username', () => {
        cy.api({
            method: 'POST',
            url: baseURL + '/login',
            body : {
                name: "teranull",
                password: "null@null.com"
            },
            headers: {
                Authorization: 'Bearer ' + token
            },
            failOnStatusCode : false
        }).then((response) => {
            expect(response.status).to.eql(400);
            expect(response.statusText).to.eql('Bad Request');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("User not found")
        })
    })
    it('Returns a Response code of 401 for Wrong Password', () => {
        cy.api({
            method: 'POST',
            url: baseURL + '/login',
            body : {
                "email" : json.email,
                "password" : "isprikitik"
            },
            headers: {
                Authorization: 'Bearer ' + token
            },
            failOnStatusCode : false
        }).then((response) => {
            expect(response.status).to.eql(401);
            expect(response.statusText).to.eql('Unauthorized');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("Invalid password")
        })
    })    
})

describe('GET Request - Get All Users', () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 200 - OK and Body should contain User details', () => {
        cy.api({
            method: 'GET',
            url: baseURL + '/',
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body[0].name).to.eql(json.name)
            expect(response.body[0].email).to.eql(json.email)
            expect(response.body[0].id).to.eql(id)
        })
    })
})

describe('GET Request - Get Specific User by ID', () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 200 - OK and Body should contain User details', () => {
        cy.api({
            method: 'GET',
            url: baseURL + '/' + id,
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.name).to.eql(json.name)
            expect(response.body.email).to.eql(json.email)
            expect(response.body.id).to.eql(id)
        })
    })
    it('Returns a Response code of 404 - User not Found', () => {
        cy.api({
            method: 'GET',
            url: baseURL + '/' + 2,
            headers: {
                Authorization: 'Bearer ' + token
            },
            failOnStatusCode : false
        }).then((response) => {
            expect(response.status).to.eql(404);
            expect(response.statusText).to.eql('Not Found');
            expect(response.body.message).to.eql('User not found')
            expect(response.headers['content-type']).to.contain("application/json")
        })
    })
})

describe('PUT Request - Update a User', () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 200 - OK and User Details must be updated', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + id,
            body : {
                "name" : 'John Deer',
                "email" : json.email,
                "password" : json.password
            },
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("User updated")
            expect(response.body.user.name).to.eql('John Deer')
            expect(response.body.user.email).to.eql(json.email)
            expect(response.body.user.id).to.eql(id)
        })
        cy.api({
            method: 'GET',
            url: baseURL + '/' + id,
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.name).to.eql('John Deer')
            expect(response.body.email).to.eql(json.email)
            expect(response.body.id).to.eql(id)
        })
    })
    it('Returns a Response code of 400 for Missing Fields', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + id,
            body : {
                name: "teranull",
                email: "null@null.com"
            },
            headers: {
                Authorization: 'Bearer ' + token
            },
            failOnStatusCode : false
        }).then((response) => {
            expect(response.status).to.eql(400);
            expect(response.statusText).to.eql('Bad Request');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("All fields required")
        })
    })
    it('Returns a Response code of 404 for user not found', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + '5',
            body : {
                "name": faker.internet.username(),
                "email": faker.internet.email(),
                "password": faker.internet.password()
            },
            headers: {
                Authorization: 'Bearer ' + token
            },
            failOnStatusCode : false
        }).then((response) => {
            expect(response.status).to.eql(404);
            expect(response.statusText).to.eql('Not Found');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("User not found")
        })
    })    
})

describe('PATCH Request - Update a User', () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 200 - OK and User Details must be updated', () => {

        let name = faker.internet.username()

        cy.api({
            method: 'PATCH',
            url: baseURL + '/' + id,
            body : {
                "name" : name,
            },
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("User patched")
        })
        cy.api({
            method: 'GET',
            url: baseURL + '/' + id,
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.name).to.eql(name)
            expect(response.body.email).to.eql(json.email)
            expect(response.body.id).to.eql(id)
        })
    })
})

describe("DELETE Request - Delete a User", () => {

    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 200 - OK', () => {
        cy.api({
            method: 'DELETE',
            url: baseURL + '/' + id,
            body : json,
            headers: {
                Authorization: 'Bearer ' + token
            }

        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.statusText).to.eql('OK');
            expect(response.headers['content-type']).to.contain("application/json")
            expect(response.body.message).to.eql("User deleted")

        })
    })
})