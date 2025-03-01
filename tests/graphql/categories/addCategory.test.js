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
                mutation AddCategory($name: String, $photo: String) {
                    addCategory(name: $name, photo: $photo) {
                        name
                        photo
                    }
                }
            `)
            .withGraphQLVariables({
                "name": "Fantasia de Pizza",
                "photo": "https://32966.cdn.simplo7.net/static/32966/sku/carnaval-acessorios-para-fantasias-fantasia-divertida-pizza-adulto-cosplay-p-1737404429479.jpg"
            })
            .expectStatus(200)
    })
})