
const mongoose = require('mongoose')
const { response } = require('express')

mongoose.connect(
  process.env.MONGO_URI || 'mongodb+srv://rahul:rahul@cluster0.7wquj.mongodb.net/myProducts?retryWrites=true&w=majority',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} 
)

module.exports = mongoose

