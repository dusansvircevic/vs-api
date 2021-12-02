import userApi from "../api/user"

describe('API Testing - Login Regression', () => {

    it('wrong email', () => {
        userApi.login({
            email: 'sitaku@test.com', 
            testMessage: 'Wrong email',
            statusCode : 401
        })
    })

    it('wrong email without @', () => {
        userApi.login({
            email: 'test.com', 
            testMessage: 'Wrong email',
            statusCode : 401
        })
    })

    it('wrong password', () => {
        userApi.login({
            password: 'sitaku@test.com', 
            testMessage: 'Wrong password',
            statusCode : 401
        })
    })

})