import userApi from "../api/user"

describe('API Testing - Login', () => {

    let userToken
    it('Login successful', () => {
        userApi.login({}).then((token) => {
            userToken = token
        })
    })

})