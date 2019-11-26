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
  let genres = []

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
    for (g of req.body.genre) {
      genres.push({ genres: g })
    }

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


router.post('/:index/review', async function(req, res) {
  // 유저정보와 평점, 리뷰정보와 해당 영화아이디(index)가 넘어와 야됨
  // 영화정보는 위에서 보는 것 처럼 넘겨주면 됨
  let movie = await Movie.findOne({ index: req.params.index })
  console.log(movie)
  console.log(req.params)
  const review = { // user, rate, content
    user: req.body.user,
    rate: req.body.rate,
    content: req.body.content
  }

  movie.reviews.push(review)
  movie.save()
  console.log(movie)
  res.send('successfully saved')
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

router.post('/:index/like', async function(req, res) { // 유저정보(email)와 해당 영화 id가 넘어와야 됨
  let movie = await Movie.findOne({ index: req.params.index })
  if (movie.like_users.includes(req.body.email)) {
    movie.splice(movie.indexOf(req.body.email), 1)
  } else {
    movie.like_users.push(req.body.email)
  }
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