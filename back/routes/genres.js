const express = require('express')
const router = express.Router()
const Genre = require('../models/genres')

router.get('/', function(req, res, next) {
  Genre.find(function(err, genres) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    // res.send(genres)
    // next()
    res.json(genres)
  })
})

router.post('/', function(req, res) {
  let genre = new Genre()
  genre.name = req.query.name
  genre.movies = req.query.movies

  console.log(genre)
  genre.save(function(err) {
    if (err) {
      console.log(err)
      res.status(400).json({ result: 'error' })
      return
    }

    res.status(200).json({ result: 1 })
  })
})

router.put('/:id/', function(req, res) {
  Genre.updateOne({ _id: req.params.id }, { $set: req.query }, function(err, output) {
    if (err) { res.status(500).json({ err: 'connect failed' }) }
    if (!output.n) return res.status(404).json({ err: 'not founded' })
    res.json({ res: 'success' })
  })
})

router.delete('/:id/', function(req, res) {
  Genre.remove({ _id: req.params.id }, function(err, output) {
    if (err) return res.status(500).json({ error: 'connect failed' })
    res.status(204).end()
  })
})


module.exports = router