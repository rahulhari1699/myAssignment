const Data1 = require('./product_create')
const autoCatch = require('./lib/auto-catch')

module.exports = autoCatch({
  listProduct,
  createProduct,
  editProduct,
  getProduct,
  deleteProduct,

})
async function getProduct (req, res, next) {

  const { id } = req.params
  const location= await Data1.get(id)
  if (!location) return next()
  res.json(location)
}


async function listProduct (req, res, next) {

  const data1= await Data1.list(req.body.device_id)

  res.json(data1)
}

async function createProduct (req, res, next) {
  
  const data1= await Data1.create(req.body)
  res.json(data1)
}

async function editProduct (req, res, next) {
 
  const change = req.body
  const location= await Data1.edit(req.params.id, change)

  res.json(location)
}

async function deleteProduct (req, res, next) {
  await Data1.remove(req.params.id)
  res.json({ success: true })
}

