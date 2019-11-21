const mongoose = require('mongoose')

const Schema = mongoose.Schema
const movieSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: String,
  score: Number,
  actors: String,
  description: String,
  posterUrl: String,
  genres: Array,
  like_users: Array,
  reviews: Array
}, { collection: 'movies' })

module.exports = mongoose.model('movies', movieSchema)