const mongoose = require('mongoose')
<<<<<<< HEAD

const Schema = mongoose.Schema
const genreSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: String,
  movies: Array
}, { collection: 'genres' })

=======
let fixtures = require('node-mongodb-fixtures')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: String,
  movies: Array,

}, { collection: 'genres' })


>>>>>>> 7694a3d27b2c09d30ace371804ca6a5ffff03001
module.exports = mongoose.model('genres', genreSchema)