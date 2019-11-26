const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const User = require('../models/users')

// 영화 전체 조회
router.get('/', function(req, res, next) {
  Movie.find({})
    .then((movies) => {
      if (!movies.length) {
        return res.status(404).send({ message: 'error' })
      }
      res.json(movies)
    })
})

// 영화 추가
router.post('/', function(req, res) {
  // console.log('1111111111')
  console.log(req.body)
  Movie.create(req.body)
    .then((movie) => {
      res.send(movie)
    })
    .catch((err) => res.send({ message: 'error' }))
})

// 해당 영화 조회
router.get('/:index', async function(req, res) {
  const movie = await Movie.findOne({ index: req.params.index })
  res.json(movie)
})


// 조건 만족하는 영화목록 조회
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
    movie_actor: movie_actor,
    movie_director: movie_director
  }

  res.json({ result: result })
})


// 영화 리뷰정보 작성 + 유저모델에 작성
router.post('/:index/review', async function(req, res) {
  // 유저정보와 평점, 리뷰정보와 해당 영화아이디(index)가 넘어와 야됨
  // 영화정보는 위에서 보는 것 처럼 넘겨주면 됨
  // user 라우트에 함수 추가
  let movie = await Movie.findOne({ index: req.params.index })
    // console.log(movie)
    // console.log(req.params)
  const review = { // user, rate, content
    email: req.body.email,
    rate: req.body.rate,
    content: req.body.content
  }

  movie.reviews.push(review)
  movie.save()

  let user = await User.findOne({ email: req.body.email })
  user.reviews.push(req.params.index) // 수정사항 => 평점도 함께 넣어서 내가 높은 점수 준 영화들 보기?
  user.save()
  res.send('successfully saved')
})


// 영화 좋아요 달기 및 유저 좋아요 정보 작성
router.post('/:index/like', async function(req, res) { // 유저정보(email)와 해당 영화 id가 넘어와야 됨
  let movie = await Movie.findOne({ index: req.params.index })
  if (movie.like_users.includes(req.body.email)) {
    // console.log(movie)
    movie.like_users.splice(movie.like_users.indexOf(req.body.email), 1)
  } else {
    movie.like_users.push(req.body.email)
  }

  movie.save()

  let user = await User.findOne({ email: req.body.email })
  if (user.like_movies.includes(req.params.index)) {
    user.like_movies.splice(user.like_movies.indexOf(req.params.index), 1)
  } else {
    user.like_movies.push(req.params.index)
  }

  user.save()

  res.send('successfully saved')
})


// router.put('/:movie_id', function(req, res) {
//   Movie.findOne({ _id: req.params.movie_id }, { $set: req.query })
//     .then()
// })

module.exports = router