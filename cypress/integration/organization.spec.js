import userApi from "../api/user"
import organizationApi from "../api/organization"

describe('API Testing - Organizations', () => {
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

    it('update organization', () => {
        organizationApi.put({token : userToken, testMessage : 'update imena organizacije', orgId : organizationId})
        .then((orgazniationObject) => {
            console.log(organizationId)
        })
    })

    it('invalid update organization', () => {
        organizationApi.put({token : userToken, testMessage : 'update imena organizacije propao', orgName : null, orgId : organizationId})
        .then((orgazniationObject) => {
            console.log(organizationId)
        })
    })

    it('delete organization', () => {
        organizationApi.delete({token : userToken, orgId : organizationId})
    })

    let allOrganizations
    it('get all organization', () => {
        organizationApi.get({token : userToken})
        .then((allOrgs) => {
            allOrganizations = allOrgs
        })
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