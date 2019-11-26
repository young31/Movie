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

router.post('/search', async function(req, res) {
  let movie_title
  let movie_actors
  let movie_directors
  let result

  if (req.body.keyword) {
    movie_title = await Movie.find({ title: { $in: req.body.keyword } }).sort('-openDt')
    movie_actors = await Movie.find({ actors: { $in: req.body.keyword } }).sort('-openDt')
    movie_directors = await Movie.find({ directors: { $in: req.body.keyword } }).sort('-openDt')
  }

  if (req.body.openDt) {
    movie_title = movie_title
      .gt('openDt', req.body.openDt.from)
      .lt('openDt', req.body.openDt.to)
    movie_actors = movie_actors
      .gt('openDt', req.body.openDt.from)
      .lt('openDt', req.body.openDt.to)
    movie_directors = movie_directors
      .gt('openDt', req.body.openDt.from)
      .lt('openDt', req.body.openDt.to)
  }

  if (req.body.genre) {
    let genres = []
    for (g of req.body.genre) {
      genres.push({ genres: g })
    }

    movie_title = movie_title
      .or({ genres: genres })
    movie_actors = movie_actors
      .or({ genres: genres })
    movie_directors = movie_directors
      .or(genres)
  }

  result = {
    movie_title: movie_title,
    movie_actors: movie_actors,
    movie_directors: movie_directors
  }

  res.send(req.body.keyword)
})

router.post('/', function(req, res) {
  // console.log('1111111111')
  console.log(req.body)
  Movie.create(req.body)
    .then((movie) => {
      res.send(movie)
    })
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