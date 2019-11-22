const express = require('express')
const router = express.Router()
const Genre = require('../models/genres')

router.get('/', function(req, res, next) {
  Genre.find(function(err, genre) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    res.json(genre)
  })
})

router.post('/', function(req, res) {
  let genre = Genre
  if (req.query.name in genre.name) { '' }
  // else { genre. }

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

module.exports = router