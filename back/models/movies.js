const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const Schema = mongoose.Schema
const movieSchema = new Schema({
  // id: {
  //   type: Number,
  //   unique: true
  // },
  title: String,
  score: { type: Float },
  actors: String,
  description: String,
  posterUrl: String,
  genres: Array,
  like_users: Array,
  reviews: Array
}, { collection: 'movies' })

module.exports = mongoose.model('movies', movieSchema)