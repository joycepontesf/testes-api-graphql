const { getAuthToken } = require('../../auth.test')
const { spec } = require('pactum')

describe('Produtos', () => {
    it('Deve deletar produto com sucesso', async () => {
        const token = getAuthToken()

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders({
                'Authorization': `Bearer ${token}`
            })
            .withGraphQLQuery(`
                mutation Mutation($deleteProductId: ID!) {
                deleteProduct(id: $deleteProductId) {
                    name
                    categories {
                    name
                    }
                    description
                    price
                    specialPrice
                    photos
                    popular
                    quantity
                    visible
                    location
                    additionalDetails
                }
                }`)
            .withGraphQLVariables({
                "deleteProductId": "5"
              })
            .expectStatus(200)
    })
})