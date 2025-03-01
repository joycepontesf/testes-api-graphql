const { reporter, mock } = require('pactum')
const pf = require('pactum-flow-plugin');

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
  await mock.stop()
  await reporter.end()
})

it('Deve validar contrato para adicionar categoria (Provider Test)', async () => {
  mock.addInteraction({
    request: {
      method: 'POST',
      path: '/graphql',
      headers: {
        Authorization: '/^Bearer .+$/'
      },
      body: {
        query: `
          mutation AddCategory($name: String, $photo: String) {
            addCategory(name: $name, photo: $photo) {
              name
              photo
            }
          }
        `,
        variables: {
          name: "Fantasia de Pizza",
          photo: "https://32966.cdn.simplo7.net/static/32966/sku/carnaval-acessorios-para-fantasias-fantasia-divertida-pizza-adulto-cosplay-p-1737404429479.jpg"
        }
      }
    },
    response: {
      status: 200,
      body: {
        data: {
          addCategory: {
            name: "Fantasia de Pizza",
            photo: "https://32966.cdn.simplo7.net/static/32966/sku/carnaval-acessorios-para-fantasias-fantasia-divertida-pizza-adulto-cosplay-p-1737404429479.jpg"
          }
        }
      }
    }
  })
})