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
    movie_title = Movie.find({ title: { $regex: req.body.keyword, $options: "i" } })
    movie_actors = Movie.find({ actors: { $in: req.body.keyword } })
    movie_directors = Movie.find({ directors: { $in: req.body.keyword } })
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
    genres = [{ genres: req.body.genre }]

    movie_title = movie_title
      .or(genres)
    movie_actors = movie_actors
      .or(genres)
    movie_directors = movie_directors
      .or(genres)
  }

  if (req.body.rating) {
    movie_title = movie_title
      .gt('score', req.body.rating)
    movie_actors = movie_actors
      .gt('score', req.body.rating)
    movie_directors = movie_directors
      .gt('score', req.body.rating)
  }

  if (req.body.runingTime) {
    movie_title = movie_title
      .lt('runningTime', req.body.runingTime)
    movie_actors = movie_actors
      .lt('runningTime', req.body.runingTime)
    movie_directors = movie_directors
      .lt('runningTime', req.body.runingTime)
  }

  movie_title = await movie_title
  movie_actors = await movie_actors
  movie_directors = await movie_directors

  result = {
    movie_title: movie_title,
    movie_actors: movie_actors,
    movie_directors: movie_directors
  }

  res.json({ result: result })
})




router.post('/', function(req, res) {
  // console.log('1111111111')
  console.log(req.body)
  Movie.create(req.body)
    .then((movie) => {
      res.send(movie)
    })
    .catch((err) => res.send({ message: 'error' }))
})


router.post('/reviews', async function(req, res) {
  const aa = Movie.findOne({ name: req.body.name })
  const temp = {
    email: '',
    rate: '',
    content: ''
  }
  aa.reviews.push(temp)
  aa.save()
})


// router.put('/:movie_id', function(req, res){
//   Movie.findOne({ _id: req.params.movie_id}, {$set: req.query})
//   .then()
// })

module.exports = router