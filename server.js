const express = require('express')
const eslint = require('eslint')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const product_create_api = require('./product_create_api')





var cors = require('cors')

const middleware = require('./middleware')

const port = process.env.PORT || 5008

const app = express()

app.use(cors())

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(cookieParser())



app.post('/products',product_create_api.createProduct)
app.get('/products',product_create_api.listProduct)
app.put('/products/:id',product_create_api.editProduct)
app.delete('/products/:id',product_create_api.deleteProduct)
app.get('/products/:id',product_create_api.getProduct)



app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port,"0.0.0.0", () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}



