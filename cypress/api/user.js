module.exports = {
    login({
        email = "cypress@test.com", 
        password = "Test1234",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: Cypress.env('apiUrl') + '/login ', 
            body: {
              "email": email,
              "password": password
            }
        }).then((resp)=>{
            typeof resp.status !== "undefined" &&
                resp.status === statusCode
                ? console.log(`${testMessage} - Pass`, "success")
                : console.log(`${testMessage} - Fail - ${JSON.stringify(resp)}`, "error");
            expect(resp.status).to.equal(statusCode)
            return resp.body.token
        }) 
    }
}

