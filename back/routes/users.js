const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    // res.send(users)
    // next()
    res.json(users)
  })
})

router.post('/', function(req, res) {
  let user = new User()
  user.userId = req.query.userId
  user.password = req.query.password
  user.sex = req.query.sex
  user.followers = req.query.followers
  user.followings = req.query.followings
  user.reviews = req.query.reviews

  console.log(User)
  user.save(function(err) {
    if (err) {
      console.log(err)
      res.status(400).json({ result: 'error' })
      return
    }

    res.status(200).json({ result: 1 })
  })
})

router.put('/:id/', function(req, res) {
  User.updateOne({ _id: req.params.id }, { $set: req.query }, function(err, output) {
    if (err) { res.status(500).json({ err: 'connect failed' }) }
    if (!output.n) return res.status(404).json({ err: 'not founded' })
    res.json({ res: 'success' })
  })
})

router.delete('/:id/', function(req, res) {
  User.remove({ _id: req.params.id }, function(err, output) {
    if (err) return res.status(500).json({ error: 'connect failed' })
    res.status(204).end()
  })
})


module.exports = router