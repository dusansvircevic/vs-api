import userApi from "../api/user"
import organizationApi from "../api/organization"

describe('API Testing - Organizations Regression', () => {
    let userToken
    before(() => {
        userApi.login({}).then((token) => {
            userToken = token
        })
    })

    let organizationId
    it('create organization fail - unauthorized user', () => {
        organizationApi.post({
            orgName : "",
            token : "", 
            statusCode : 401,
            testMessage : 'nije napravljena organizacija'})
        .then((orgazniationObject) => {
            console.log(orgazniationObject.id)
            organizationId = orgazniationObject.id
        })
    })

    it('delete organization fail - unauthorized user', () => {
        organizationApi.delete({
            orgName : "",
            token : "", 
            statusCode : 401,
            testMessage : 'nije izbrisana organizacija'})
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