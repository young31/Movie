const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  master: {
    type: Boolean,
  },
  like_movies: {
    type: Array
  },
  reviews: {
    type: Array
  }
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }]
}, { collections: 'users' })

// userSchema.pre('save', async function(next) {
//   // Hash the password before saving the user model
//   const user = this
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8)
//   }
//   next()
// })

// userSchema.methods.generateAuthToken = async function() {
//   // Generate an auth token for the user
//   const user = this
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
//   user.tokens = user.tokens.concat({ token })
//   await user.save()
//   return token
// }


// userSchema.statics.findByCredentials = async(email, password) => {
//   // Search for a user by email and password.
//   const user = await User.findOne({ email })
//   if (!user) {
//     throw new Error({ error: 'Invalid login credentials' })
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password)
//   if (!isPasswordMatch) {
//     throw new Error({ error: 'Invalid login credentials' })
//   }
// }
module.exports = mongoose.model('users', userSchema)