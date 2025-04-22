describe('GET Request - HTTPBin', () => {
    let url = "https://httpbin.org/get"
    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Returns a Response code of 200', () => {
        cy.api({
            method: 'GET',
            url: url
        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.headers.server).to.eql("gunicorn/19.9.0")
            expect(response.body.headers.Host).to.eql("httpbin.org")
        })
    })
})