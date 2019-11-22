const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')

router.get('/', function(req, res, next) {
  Movie.find({})
    .then((movies) => {
      if (!movies.length) {
        return res.status(404).send({ message: 'error' })
      }
      res.json(movies)
    })
})

router.post('/', function(req, res) {
  Movie.create(req.query)
    .then((movie) => res.send(movie))
    .catch((err) => res.send({ message: 'error' }))
    // let movie = new Movie()
    // movie.title = req.query.title
    // movie.score = req.query.score
    // movie.actors = req.query.actors
    // movie.description = req.query.description
    // movie.genres = req.query.genres
    // movie.like_users = req.query.like_users
    // movie.reviews = req.query.reviews

  // console.log(movie)
  // movie.save(function(err) {
  //   if (err) {
  //     console.log(err)
  //     res.status(400).json({ result: 'error' })
  //     return
  //   }

  //   res.status(200).json({ result: 1 })
  // })
})

// router.put('/:movie_id', function(req, res){
//   Movie.findOne({ _id: req.params.movie_id}, {$set: req.query})
//   .then()
// })

module.exports = router