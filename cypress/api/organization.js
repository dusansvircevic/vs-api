module.exports = {
    get({token = ""}){
        return cy.request({
            method: 'GET',
            url: Cypress.env('apiUrl') + '/organizations-data', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },        
        }).then((response) => {
            expect(response.status).to.equal(200)
            return response.body
        })
    },
    post({
        orgName = "Test organization", 
        token = "",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: Cypress.env('apiUrl') + '/organizations', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },        
            body: {
              "name": orgName,
            }
        }).then((response)=>{
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? console.log(`${testMessage} - Pass`, "success")
                : console.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.equal(statusCode)
            return response.body
        }) 
    },
    put({
        orgId = "", 
        orgName = "Edited organization", 
        token = "",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: Cypress.env('apiUrl') + `/organizations/${orgId}`, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },        
            body: {
              "name": orgName,
            }
        }).then((response)=>{
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? console.log(`${testMessage} - Pass`, "success")
                : console.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.equal(statusCode)
            return response.body
        }) 
    },
    delete({
        orgId = "", 
        token = "",
        statusCode = 201,
        testMessage = "",
        password = "Test1234"
    }) {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: Cypress.env('apiUrl') + `/organizations/${orgId}`, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },        
            body: {
              "passwordOrEmail": password,
            }
        }).then((response)=>{
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? console.log(`${testMessage} - Pass`, "success")
                : console.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.equal(statusCode)
        }) 
    }

}

