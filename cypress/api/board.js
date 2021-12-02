module.exports = {
    get({token = "", orgId = ""}){
        return cy.request({
            method: 'GET',
            url: Cypress.env('apiUrl') + `/organizations/${orgId}/boards-data`, 
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
        confId = null, 
        boardName = "Test board",
        statusCode = 201,
        token = "",
        orgId = "",
        teamMembersBoardId = null,
        boardType = "",
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: Cypress.env('apiUrl') + '/boards ', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: {
              configuration_board_id: confId,
              name: boardName,
              organization_id: orgId,
              team_members_board_id: teamMembersBoardId,
              type: boardType 
            }
        }) 
        .then((response)=>{
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? console.log(`${testMessage} - Pass`, "success")
                : console.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.equal(statusCode)
            return response.body
        })  
    },
    put({
        changedName = "Edited board",
        statusCode = 200,
        token = "",
        brdId = "",
        brdCode = "",
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: Cypress.env('apiUrl') + `/boards/${brdId}`, 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: {
                code: brdCode,
                description: null,
                name: changedName,
                task_unit: 'points'
            }
        }) 
        .then((response)=>{
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? console.log(`${testMessage} - Pass`, "success")
                : console.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.equal(statusCode)
            return response.body
        })  
    },
    delete({
        token = "",
        brdId = "",
        statusCode = 200,
        testMessage = "",
    }) {
        cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: Cypress.env('apiUrl') + `/boards/${brdId}`, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },        
        }).then((response)=>{
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? console.log(`${testMessage} - Pass`, "success")
                : console.log(`${testMessage} - Fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.equal(statusCode)
        }) 
    }

}

