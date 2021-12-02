import userApi from "../api/user"
import organizationApi from "../api/organization"
import boardApi from "../api/board"

describe('API Testing - Boards Regression', () => {
    let userToken
    before(() => {
        userApi.login({}).then((token) => {
            userToken = token
        })
    })

    let organizationId
    it('create organization', () => {
        organizationApi.post({token : userToken, testMessage : 'napravljena organizacija'})
        .then((orgazniationObject) => {
            organizationId = orgazniationObject.id
        })
    })

    let boardId
    let boardCode
    it('create scrum board fail - unauthorized user', () => {
        boardApi.post({
            token : '', 
            orgId : organizationId, 
            boardType: 'scrum_board',
            statusCode : 401, 
            testMessage : 'Nije napravljen scrum board'})
        .then((boardObject) => {
            boardId = boardObject.id
            boardCode = boardObject.code
        })
    })

    it('create scrum board fail - no board type', () => {
        boardApi.post({
            token : userToken, 
            orgId : organizationId, 
            boardType: '', 
            statusCode : 400,
            testMessage : 'Nije napravljen scrum board'})
        .then((boardObject) => {
            boardId = boardObject.id
            boardCode = boardObject.code
        })
    })

    it('create scrum board fail - no board type', () => {
        boardApi.post({
            token : userToken, 
            orgId : '', 
            boardType: 'scrum_board', 
            statusCode : 400,
            testMessage : 'Nije napravljen scrum board'})
        .then((boardObject) => {
            boardId = boardObject.id
            boardCode = boardObject.code
        })
    })

    it('delete scrum board fail - no board ID', () => {
        boardApi.delete({
            token : userToken,
            statusCode : 405, 
            brdId : ''}) 
    })

    after('Delete all organizations', () => {
        organizationApi.get({token : userToken})
        .then((allOrgs) => {
            allOrgs.forEach(element => {
                organizationApi.delete({token : userToken, orgId : element.id})
            })
        })
    })

})