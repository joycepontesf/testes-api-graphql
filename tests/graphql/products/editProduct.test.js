const { getAuthToken } = require('../../auth.test')
const { spec } = require('pactum')

describe('Produtos', () => {
    it('Deve editar produto com sucesso', async () => {
        const token = getAuthToken()

        await spec()
            .post('http://lojaebac.ebaconline.art.br/graphql')
            .withHeaders({
                'Authorization': `Bearer ${token}`
            })
            .withGraphQLQuery(`
                mutation Mutation($editProductId: ID!, $name: String, $categories: [CategoryInput], $description: String, $price: Float, $specialPrice: Float, $photos: [String], $popular: Boolean, $quantity: Float, $visible: Boolean, $location: String, $additionalDetails: [String]) {
                editProduct(id: $editProductId, name: $name, categories: $categories, description: $description, price: $price, specialPrice: $specialPrice, photos: $photos, popular: $popular, quantity: $quantity, visible: $visible, location: $location, additionalDetails: $additionalDetails) {
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
                "editProductId": null,
                "name": null,
                "categories": [
                  {
                    "name": null,
                    "photo": null
                  }
                ],
                "description": null,
                "price": null,
                "specialPrice": null,
                "photos": null,
                "popular": null,
                "quantity": null,
                "visible": null,
                "location": null,
                "additionalDetails": null
              })
            .expectStatus(200)
    })
})