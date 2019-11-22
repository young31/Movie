const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  password: String,
  sex: Boolean,
  followers: Array,
  followings: Array,
  reviews: Array,
}, { collection: 'users' })

module.exports = mongoose.model('users', userSchema)