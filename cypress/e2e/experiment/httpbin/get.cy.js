describe('GET Request - HTTPBin', () => {
    let url = "https://httpbin.org/get"
    before(() => {
        cy.resetBrowser({ cookies: true, local: true, session: true });
    })
    it('Recieves a Response code of 200', () => {
        cy.api(url)
        cy.request({
            url: url
        }).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.headers.server).to.eql("gunicorn/19.9.0")
        })
    })
})