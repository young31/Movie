const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const Schema = mongoose.Schema
const movieSchema = new Schema({
  // id: {
  //   type: Number,
  //   unique: true
  // },
  index: {
    type: Number,
    unique: true
  },
  title: String,
  openDt: Date,
  score: { type: Float },
  directors: Array,
  actors: Array,
  description: String,
  posterUrl: String,
  genres: Array,
  runningTime: Number,
  preview: String,
  like_users: Array, // user, like
  reviews: Array // user, rate, content
}, { collection: 'movies' })

module.exports = mongoose.model('movies', movieSchema)