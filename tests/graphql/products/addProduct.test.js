const { getAuthToken } = require('../../auth.test')
const { spec } = require('pactum')

describe('Produtos', () => {
    it('Deve adicionar produto com sucesso', async () => {
        const token = getAuthToken()

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders({
                'Authorization': `Bearer ${token}`
            })
            .withGraphQLQuery(`
                mutation Mutation($name: String, $categories: [CategoryInput], $description: String, $price: Float, $specialPrice: Float, $photos: [String], $popular: Boolean, $quantity: Float, $visible: Boolean, $location: String, $additionalDetails: [String]) {
                addProduct(name: $name, categories: $categories, description: $description, price: $price, specialPrice: $specialPrice, photos: $photos, popular: $popular, quantity: $quantity, visible: $visible, location: $location, additionalDetails: $additionalDetails) {
                    name
                    categories {
                        name
                        photo
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
                "name": "Produto de Teste",
                "categories": [
                  {
                    "name": "Fantasia de Pizza",
                    "photo": "https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg"
                  }
                ],
                "description": "Fantasia incluída como teste",
                "price": 5.99,
                "specialPrice": 5.00,
                "photos": "https://acdn-us.mitiendanube.com/stores/001/951/360/products/1717861118735-1-256d20c7d5f7c4790717178616421691-1024-1024.png",
                "popular": true,
                "quantity": 15.0,
                "visible": true,
                "location": "Recife",
                "additionalDetails": "Não se aplica"
              })
            .expectStatus(200)
    })
})