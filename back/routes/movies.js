const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')

router.get('/', function(req, res, next) {
  Movie.find(function(err, movies) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    // res.send(movies)
    // next()
    res.json(movies)
  })
})

router.post('/', function(req, res) {
  let movie = new Movie()
  movie.title = req.query.title
  movie.score = req.query.score
  movie.actors = req.query.actors
  movie.description = req.query.description
  movie.genres = req.query.genres
  movie.like_users = req.query.like_users
  movie.reviews = req.query.reviews

  console.log(movie)
  movie.save(function(err) {
    if (err) {
      console.log(err)
      res.status(400).json({ result: 'error' })
      return
    }

    res.status(200).json({ result: 1 })
  })
})

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


module.exports = router