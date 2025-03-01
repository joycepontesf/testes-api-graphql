const { flow } = require('pactum')
const pf = require('pactum-flow-plugin')
const { reporter } = require('pactum')
const { getAuthToken } = require('../../auth.test')

before(async() => {
  pf.config.url = 'http://localhost:8080/'
  pf.config.projectId = 'loja-ebac-front'
  pf.config.projectName = 'Front End Loja Ebac'
  pf.config.version = '1.0.0'
  pf.config.username = 'admin'
  pf.config.password = 'admin'
  reporter.add(pf.reporter)
  await mock.start(4000)
})

after(async () => {
  await mock.start(4000)
  await reporter.end()
})

it('Deve adicionar categoria com sucesso (Consumer Test)', async () => {
  const token = getAuthToken()

  await flow('Add Category')
    .useInteraction('Adicionar Categoria')
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
    .expectJson({
      data: {
        addCategory: {
          name: "Fantasia de Pizza",
          photo: "https://32966.cdn.simplo7.net/static/32966/sku/carnaval-acessorios-para-fantasias-fantasia-divertida-pizza-adulto-cosplay-p-1737404429479.jpg"
        }
      }
    })
})
