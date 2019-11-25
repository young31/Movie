const mongoose = require('mongoose')

const Schema = mongoose.Schema
const reviewSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  content: String,
  movie: String,
  rating: Number,
  user: String,
}, { collection: 'reviews' })

module.exports = mongoose.model('reviews', reviewSchema)