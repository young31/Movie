const mongoose = require('mongoose')

const Schema = mongoose.Schema
const reviewSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: String,
  movies: Array
}, { collection: 'reviews' })

module.exports = mongoose.model('reviews', reviewSchema)