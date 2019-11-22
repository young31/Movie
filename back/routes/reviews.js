const express = require('express')
const router = express.Router()
const Review = require('../models/reviews')

router.get('/', function(req, res, next) {
  Review.find(function(err, reviews) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    // res.send(reviews)
    // next()
    res.json(reviews)
  })
})

router.post('/', function(req, res) {
  let review = new Review()
  review.content = req.query.content
  review.score = req.query.score
  review.movies = req.query.movies
  review.user = req.query.user

  console.log(Review)
  review.save(function(err) {
    if (err) {
      console.log(err)
      res.status(400).json({ result: 'error' })
      return
    }

    res.status(200).json({ result: 1 })
  })
})

router.put('/:id/', function(req, res) {
  Review.updateOne({ _id: req.params.id }, { $set: req.query }, function(err, output) {
    if (err) { res.status(500).json({ err: 'connect failed' }) }
    if (!output.n) return res.status(404).json({ err: 'not founded' })
    res.json({ res: 'success' })
  })
})

router.delete('/:id/', function(req, res) {
  Review.remove({ _id: req.params.id }, function(err, output) {
    if (err) return res.status(500).json({ error: 'connect failed' })
    res.status(204).end()
  })
})


module.exports = router