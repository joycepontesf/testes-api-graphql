const { getAuthToken } = require('../../auth.test')
const { spec } = require('pactum')

describe('Categorias', () => {
    it('Deve deletar categoria com sucesso', async () => {
        const token = getAuthToken()

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders({
                'Authorization': `Bearer ${token}`
            })
            .withGraphQLQuery(`
                mutation DeleteCategory($deleteCategoryId: ID!) {
                deleteCategory(id: $deleteCategoryId) {
                    name
                    photo
                }
            }`)
            .withGraphQLVariables({
                "deleteCategoryId": "10"
            })
            .expectStatus(200)
    })
})