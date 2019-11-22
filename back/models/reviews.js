const mongoose = require('mongoose')

const Schema = mongoose.Schema
const reviewSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
  name: String,
  movies: Array
=======
  content: String,
  score: Number,
  movies: Array,
  user: Number,
>>>>>>> 7694a3d27b2c09d30ace371804ca6a5ffff03001
}, { collection: 'reviews' })

module.exports = mongoose.model('reviews', reviewSchema)