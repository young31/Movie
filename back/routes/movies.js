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

<<<<<<< HEAD
// router.put('/:movie_id', function(req, res){
//   Movie.findOne({ _id: req.params.movie_id}, {$set: req.query})
//   .then()
// })
=======
router.put('/:id/', function(req, res) {
  Movie.updateOne({ _id: req.params.id }, { $set: req.query }, function(err, output) {
    if (err) { res.status(500).json({ err: 'connect failed' }) }
    if (!output.n) return res.status(404).json({ err: 'not founded' })
    res.json({ res: 'success' })
  })
})

router.delete('/:id/', function(req, res) {
  Movie.remove({ _id: req.params.id }, function(err, output) {
    if (err) return res.status(500).json({ error: 'connect failed' })
    res.status(204).end()
  })
})

>>>>>>> 7694a3d27b2c09d30ace371804ca6a5ffff03001

module.exports = router