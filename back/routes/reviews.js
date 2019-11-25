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
  Review.create(req.body)
    .then(res.status(200).send("accepted"))
    .catch(res.status(404).send('failed'))
})

router.put('/:user/:movie', function(req, res) {
  const review = Review.find({
      user: req.params.user,
      movie: req.params.movie
    })
    // Review.updateOne({ _id: req.params.id }, { $set: req.query }, function(err, output) {
    //   if (err) { res.status(500).json({ err: 'connect failed' }) }
    //   if (!output.n) return res.status(404).json({ err: 'not founded' })
    //   res.json({ res: 'success' })
    // })
})

router.delete('/:id/', function(req, res) {
  Review.remove({ _id: req.params.id }, function(err, output) {
    if (err) return res.status(500).json({ error: 'connect failed' })
    res.status(204).end()
  })
})


module.exports = router