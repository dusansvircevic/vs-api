import userApi from "../api/user"
import organizationApi from "../api/organization"
import boardApi from "../api/board"

describe('API Testing - Boards', () => {

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
            console.log(orgazniationObject.id)
            organizationId = orgazniationObject.id
        })
    })

    let boardId
    let boardCode
    it('create scrum board', () => {
        boardApi.post({token : userToken, orgId : organizationId, boardType: 'scrum_board', testMessage : 'Napravljen scrum board'})
        .then((boardObject) => {
            console.log(boardObject.id)
            boardId = boardObject.id
            boardCode = boardObject.code
        })
    })

    it('create kanban board', () => {
        boardApi.post({token : userToken, orgId : organizationId, boardType: 'kanban_board', testMessage : 'Napravljen kanban board'})
        .then((boardObject) => {
            console.log(boardObject.id)
            boardId = boardObject.id
            boardCode = boardObject.code
        })
    })

    it('edit board', () => {
        boardApi.put({token : userToken, brdId : boardId, brdCode : boardCode, testMessage : 'Editovan naziv board-a'})
        .then((boardObject) => {
            console.log(boardObject.id)
        })
    })

    let allBoards
    it('get all boards', () => {
        boardApi.get({token : userToken, orgId : organizationId})
        .then((allBrd) => {
            allBoards = allBrd
            console.log(allBoards)
        })
    })
    
    after('Delete boards and organizations', () => {
        boardApi.get({token : userToken, orgId : organizationId})
        .then((allBoards) => {
            allBoards.forEach(element => {
                boardApi.delete({token : userToken, brdId : element.id}) 
            })
        })

        organizationApi.get({token : userToken})
        .then((allOrgs) => {
            allOrgs.forEach(element => {
                organizationApi.delete({token : userToken, orgId : element.id})
            })
        })
    })

})