const { before, after } = require("mocha")

const expectedStructure = {
    id: "number",
    email: "string",
    username: "string",
    password: "string",
    firstName: "string",
    lastName: "string",
    accountType: "string",
    createdAt: "string",
    updatedAt: "string"
}

const testingCredentials = {
    email: "testing@testing123.com",
    username: "titingkayad2",
    password: "kinaya2",
    firstName: "yeshua",
    lastName: "bayaaw",
    accountType: "USER"
}

const debugCredentials = {
    email: "test@testing12345.com",
    username: "titingkayad",
    password: "kinaya",
    firstName: "thefirst",
    lastName: "lasttwo",
    accountType: "USER"
}

let updatedBody = {
    email: "test@testing12345.com",
    username: "titingkayad",
    password: "kinaya",
    firstName: "firstone",
    lastName: "twentytwo",
    accountType: "USER"
}

const checkStructure = (obj, structure) => {
    Object.keys(structure).forEach(key => {
        expect(obj).to.have.property(key);
        expect(typeof obj[key]).to.eq(structure[key])
    })
}

const findUserIDbyEmail = (obj, email) => {
    for (let key in obj) {
        if (obj[key].email === email) {
            return obj[key].id;
        }
    }
    return null; 
}

let baseURL = 'http://localhost:4000/api/user'
let username = testingCredentials.username
let password = testingCredentials.password
let userID = null
let fakeID = '52034'
let response = null

describe('UserAPI Test Case #1 - Get All User - Assert that all registered user`s information can be obtained', () => {
    before(() => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:4000/api/register',
            body: testingCredentials,
            failOnStatusCode: false
        })
        cy.api({
            method: 'POST',
            url: 'http://localhost:4000/api/register',
            body: debugCredentials,
            failOnStatusCode: false
        })
        cy.api({
            method: 'GET',
            url: baseURL + '/',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            response = res
            userID = findUserIDbyEmail(response.body, debugCredentials.email)
        })
    })
    it('Verify that the Response Code is 200 if users are found', () => {
        expect(response.status).to.eql(200);
        expect(response.statusText).to.eql('OK');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")

    });
    it('Verify that the Response Body contains the expected content', () => {
        expect(response.body).to.be.an('array');
        response.body.slice(0, 5).forEach(item => {
            checkStructure(item, expectedStructure)
        })
    });
})

describe('UserAPI Test Case #2 - Get All User - Assert that the proper response is produced when no users are found in the database', () => {
    it('Verify that the Response Code is 404 if no users are found', () => {
        cy.api({
            method: 'GET',
            url: "https://cd91f18d-ffc2-4963-a095-099387df4cf4.mock.pstmn.io/api/user/",
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404);
        })
    });
    it('Verify that the Response Body is in JSON', () => {
        cy.api({
            method: 'GET',
            url: "https://cd91f18d-ffc2-4963-a095-099387df4cf4.mock.pstmn.io/api/user/",
            failOnStatusCode: false
        }).then((res) => {
            expect(res.headers['content-type']).to.eql("application/json; charset=utf-8")
        })
    });
    it('Verify that the Response Body contains the correct message', () => {
        cy.api({
            method: 'GET',
            url: "https://cd91f18d-ffc2-4963-a095-099387df4cf4.mock.pstmn.io/api/user/",
            failOnStatusCode: false
        }).then((res) => {
            expect(res.body.error).to.eql('No users found')
        })
    });
})

describe('UserAPI Test Case #3 - Get All User - Assert that the proper response is provided when an incorrect request method is made', () => {
    it('Verify that the PUT Request on this path is rejected', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404)
            expect(res.statusText).to.eql('Not Found');
            expect(res.headers['content-type']).to.eql("text/html; charset=utf-8")

            const parser = new DOMParser();
            const doc = parser.parseFromString(res.body, 'text/html');
            const message = doc.querySelector('pre').textContent;
            expect(message).to.eq('Cannot PUT /api/user/');

        })
    });
    it('Verify that the PATCH Request on this path is rejected', () => {
        cy.api({
            method: 'PATCH',
            url: baseURL + '/',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404)
            expect(res.statusText).to.eql('Not Found');
            expect(res.headers['content-type']).to.eql("text/html; charset=utf-8")

            const parser = new DOMParser();
            const doc = parser.parseFromString(res.body, 'text/html');
            const message = doc.querySelector('pre').textContent;
            expect(message).to.eq('Cannot PATCH /api/user/');

        })
    });
    it('Verify that the DELETE Request on this path is rejected', () => {
        cy.api({
            method: 'DELETE',
            url: baseURL + '/',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eql(404)
            expect(res.statusText).to.eql('Not Found');
            expect(res.headers['content-type']).to.eql("text/html; charset=utf-8")

            const parser = new DOMParser();
            const doc = parser.parseFromString(res.body, 'text/html');
            const message = doc.querySelector('pre').textContent;
            expect(message).to.eq('Cannot DELETE /api/user/');

        })
    });
})

describe('UserAPI Test Case #4 - Get One User - Assert that the poroper response is produced when details for a single user is requested', () => {
    before(() => {
        cy.api({
            method: 'GET',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 200 if users are found', () => {
        expect(response.status).to.eql(200);
        expect(response.statusText).to.eql('OK');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that only a single user is returned in the request', () => {
        expect(response.body).not.to.be.an('array');
        expect(Object.keys(response.body).length).to.eql(9)
    });
    it('Verify that the Response Body contains the expected content', () => {
        checkStructure(response.body, expectedStructure)
    });
})

describe('UserAPI Test Case #5 - Get One User - Assert that the proper response is produced when a non-numerical datatype is provided in the Request URL', () => {
    before(() => {
        cy.api({
            method: 'GET',
            url: baseURL + '/' + 'testing',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 400 if the provided userID is invalid', () => {
        expect(response.status).to.eql(400);
        expect(response.statusText).to.eql('Bad Request');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the correct message', () => {
        expect(response.body.error).to.eql('Invalid user ID')
    });
})

describe('UserAPI Test Case #6 - Get One User - Assert that the proper response is produced when a non-existent ID is provided', () => {
    before(() => {
        cy.api({
            method: 'GET',
            url: baseURL + '/' + fakeID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 404 if the provided userID is invalid', () => {
        expect(response.status).to.eql(404);
        expect(response.statusText).to.eql('Not Found');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the correct message', () => {
        expect(response.body.error).to.eql('User not found')
    });
})

describe('UserAPI Test Case #7 - Update a User - Assert that a user details can be updated', () => {
    before(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: updatedBody
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 200 if user details is updated successfully', () => {
        expect(response.status).to.eql(200);
        expect(response.statusText).to.eql('OK');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the expected content', () => {
        checkStructure(response.body, expectedStructure)
        expect(response.body.firstName).to.eql(updatedBody.firstName)
        expect(response.body.lastName).to.eql(updatedBody.lastName)
    });
    after(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: debugCredentials
        })
    });
})

describe('UserAPI Test Case #8 - Update a User - Assert that a user details remains the same when no response message is sent', () => {
    before(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 400 if the server fails to process the request', () => {
        expect(response.status).to.eql(400);
        expect(response.statusText).to.eql('Bad Request');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the user details have not yet changed', () => {
        cy.api({
            method: 'GET',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.body).not.to.be.an('array');
            expect(Object.keys(res.body).length).to.eql(9)
        })
    });
})

describe('UserAPI Test Case #9 - Update a User - Assert that a user details cannot be updated when a non-numerical datatype is provided in the Request URL', () => {
    before(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + 'testing',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 400 if the provided UserID is invalid', () => {
        expect(response.status).to.eql(400);
        expect(response.statusText).to.eql('Bad Request');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the correct message', () => {
        expect(response.body.error).to.eql('Invalid user ID')
    });
})

describe('UserAPI Test Case #10 - Update a User - Assert that the proper response is produced when a non-existent ID is provided', () => {
    before(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + fakeID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: updatedBody
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 404 if the provided UserID is invalid', () => {
        expect(response.status).to.eql(404);
        expect(response.statusText).to.eql('Not Found');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the correct message', () => {
        expect(response.body.error).to.eql('User not found')
    });
})

describe('UserAPI Test Case #11 - Assert that the proper response is produced when a request is made with key-value pairs that are blanked out', () => {
    it('Verify the Response is a 400: Bad Request if the Email Address is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the username is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the password is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the firstname is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the lastname is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the Account Type is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: ""
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    after(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.statusText).to.eql('OK');
        })
    });
})

describe('UserAPI Test Case #12 - Assert that the proper response is produced when a request is made with missing key-value pairs', () => {
    it('Verify the Response is a 400: Bad Request if the Email Address is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the username is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the password is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the firstname is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the lastname is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the Account Type is not provided', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    after(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.statusText).to.eql('OK');
        })
    });
})

describe('UserAPI Test Case #13 - Assert that the proper response is produced when a request is made with invalid details', () => {
    it('Verify the Response is a 400: Bad Request if the Email Address is not in the correct format', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "123456",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the firstname is not in the correct format', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "$%$#@$%$^",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the lastname is not in the correct format', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "%@%@$%@$%#$",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    it('Verify the Response is a 400: Bad Request if the Account Type is not in the correct format', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "y4245dgf"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
    after(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                email: "test@testing12345.com",
                username: "titingkayad",
                password: "kinaya",
                firstName: "thefirst",
                lastName: "lasttwo",
                accountType: "USER"
            }
        }).then((res) => {
            expect(res.status).to.eql(200);
            expect(res.statusText).to.eql('OK');
        })
    });
})

describe('UserAPI Test Case #14 - Update a User - Assert that a user cannot be updated if a non-accepted key-pair value is sent', () => {
    let body = {
        email: "test@testing12345.com",
        username: "titingkayad",
        password: "kinaya",
        state: "unauthorized",
        firstName: "thefirst",
        lastName: "lasttwo",
        accountType: "USER"
    }
    it('Verify that the Response Code is 400: Bad Request if the message is not in the correct format', () => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: body
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
})

describe('UserAPI Test Case #15 - Patch a User - Assert that a user details can be patched', () => {
    before(() => {
        cy.api({
            method: 'PATCH',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                firstName: "firstfirst",
                lastName: "twotwo"
            }
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 200 if user details is patched successfully', () => {
        expect(response.status).to.eql(200);
        expect(response.statusText).to.eql('OK');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the correct format', () => {
        checkStructure(response.body, expectedStructure)
        expect(response.body.firstName).to.eql('firstfirst')
        expect(response.body.lastName).to.eql('twotwo')
    });
    after(() => {
        cy.api({
            method: 'PUT',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: debugCredentials
        })
    });
})
describe('UserAPI Test Case #16 - Patch a User - Assert that a user details cannot be patched when a non-numerical datatype is provided in the Request URL', () => {
    before(() => {
        cy.api({
            method: 'PATCH',
            url: baseURL + '/' + 'testing',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                firstName: "firstfirst",
                lastName: "twotwo"
            }
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 400 if the provided userID is invalid', () => {
        expect(response.status).to.eql(400);
        expect(response.statusText).to.eql('Bad Request');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the correct message', () => {
        expect(response.body.error).to.eql('Invalid user ID')
    });
})

describe('UserAPI Test Case #17 - Patch a User - Assert that the proper response is produced when a non-existent ID is provided', () => {
    before(() => {
        cy.api({
            method: 'PATCH',
            url: baseURL + '/' + fakeID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                firstName: "firstfirst",
                lastName: "twotwo"
            }
        }).then((res) => {
            response = res
        })
    })
    it('Verify that the Response Code is 404 if the provided userID is invalid', () => {
        expect(response.status).to.eql(404);
        expect(response.statusText).to.eql('Not Found');
    });
    it('Verify that the Response Body is in JSON', () => {
        expect(response.headers['content-type']).to.eql("application/json; charset=utf-8")
    });
    it('Verify that the Response Body contains the correct message', () => {
        expect(response.body.error).to.eql('User not found')
    });
})

describe('UserAPI Test Case #18 - Patch a User - Assert that a user cannot be patched if a non-accepted key-pair value is sent', () => {
    it('Verify that the Response Code is 400: Bad Request if the message is not in the correct format', () => {
        cy.api({
            method: 'PATCH',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
            body: {
                state: "unauthorized"
            }
        }).then((res) => {
            expect(res.status).to.eql(400);
            expect(res.statusText).to.eql('Bad Request');
        })
    });
})

describe('UserAPI Test Case #19 - Delete a User - Assert that a user can be deleted', () => {
    it('Send a DELETE Request and Verify that the Response Code is 204 if the user is deleted properly', () => {
        cy.api({
            method: 'DELETE',
            url: baseURL + '/' + userID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eql(204)
            expect(res.statusText).to.eql("No Content")
        })
    });
})

describe('UserAPI Test Case #20 - Delete a User - Assert that a proper response is given if the user is non-existing', () => {
    it('Send a DELETE Request and Verify that the Response Code is 404 if the user is not found', () => {
        cy.api({
            method: 'DELETE',
            url: baseURL + '/' + fakeID,
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eql(404)
            expect(res.statusText).to.eql("Not Found")
        })
    });
})

describe('UserAPI Test Case #21 - Delete a User - Assert that the delete function will fail when a non-numerical datatype is provided in the Request URL', () => {
    it('Send a DELETE Request and Verify that the Response Code is 404 if the user is not found', () => {
        cy.api({
            method: 'DELETE',
            url: baseURL + '/' + 'testing',
            auth: {
                username: username,
                password: password
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eql(400)
            expect(res.statusText).to.eql("Bad Request")
        })
    });
})