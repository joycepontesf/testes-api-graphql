const { getAuthToken } = require('../../auth.test')
const { spec } = require('pactum')

describe('Categorias', () => {
    it('Deve adicionar categoria com sucesso', async () => {
        const token = getAuthToken()

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders({
                'Authorization': `Bearer ${token}`
            })
            .withGraphQLQuery(`
                mutation EditCategory($editCategoryId: ID!, $name: String, $photo: String) {
                editCategory(id: $editCategoryId, name: $name, photo: $photo) {
                    name
                    photo
                    }
                }`)
            .withGraphQLVariables({
                "editCategoryId": 10,
                "name": "Categoria Editada",
                "photo": "https://m.media-amazon.com/images/I/41vRiqCInUL._AC_SY1000_.jpg"
            })
            .expectStatus(200)
    })
})