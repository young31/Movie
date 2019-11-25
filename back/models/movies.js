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
  directors: Array,
  actors: Array,
  description: String,
  posterUrl: String,
  genres: Array,
  runningTime: Number,
  preview: String,
  like_users: Array,
  reviews: Array
}, { collection: 'movies' })

module.exports = mongoose.model('movies', movieSchema)