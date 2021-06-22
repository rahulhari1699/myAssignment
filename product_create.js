const cuid = require('cuid')
const { da } = require('date-fns/locale')

const db = require('./db')

const Data = db.model('products', {
  _id: { type: String, default: cuid },
  product_name: { type: String, required: true},
  price: { type: String, required: true},
  description: { type: String, required: true},
  discount: { type: String, required: true},
  image_url: { type: String, required: true},

})

module.exports = {
  list,
  create,
  get,
  edit,
  remove,
  model: Data
}

async function list (mobile) {
  const data = await Data.find({device:mobile})
  return data
}

async function create (fields) {
  const data = new Data(fields)
  await data.save()
  return data
}

async function get (_id) {
  const user = await Data.findOne({ _id })
  return user
}

async function edit (_id, change) {
  const user = await get({_id})
  Object.keys(change).forEach(function (key) {
    user[key] = change[key]
  })
  await user.save()
  return user
}
async function remove (_id) {
  await Data.deleteOne({ _id })
}