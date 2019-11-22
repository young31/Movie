const mongoose = require('mongoose')

const Schema = mongoose.Schema
const reviewSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  content: String,
  score: Number,
  movies: Array,
  user: Number,
}, { collection: 'reviews' })

module.exports = mongoose.model('reviews', reviewSchema)