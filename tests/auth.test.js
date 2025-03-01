const { spec } = require ('pactum')

let authToken = null

const getAuthToken = () => authToken

it('deve obter token válido', async () => {
  const response = await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
        mutation AuthUser($email: String, $password: String) {
            authUser(email: $email, password: $password) {
              success
              token
            }
          }
    `)
    .withGraphQLVariables({
      "email": "admin@admin.com",
      "password": "admin123"
    })
    .expectStatus(200)
    .expectJson('data.authUser.success', true)

  authToken = response.json.data.authUser.token

})

module.exports = { getAuthToken }