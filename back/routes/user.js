// model setting
const express = require('express')
const router = express.Router()
const User = require('../models/users')

// auth setting
const jwt = require('jsonwebtoken')
const secretKey = require('../config/jwt')

const decode = require('../config/auth')

router.get('/', function(req, res) {
  res.cookie('user', 'abs')
  User.find(function(err, users) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    // res.send(users)
    // next()
    res.json(users)

  })
  console.log('users')
    // if (req.cookies.user.master) {
    //   User.find(function(err, users) {
    //     if (err) { return res.status(500).send({ error: 'fail' }) }
    //     // res.send(users)
    //     // next()
    //     res.json(users)
    //   })
    // } else {
    //   res.send('you are not master')
    // }
})

router.post('/signup', async function(req, res) {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    User.create(req.body)
    res.send('success')
  } else {
    res.json({ message: 'error' })
  }
})


router.post('/login', async function(req, res) {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    let token = jwt.sign({
        email: req.body.email
      },
      secretKey.secret, { expiresIn: '1d' })

    if (user.email === req.body.email && user.password === req.body.password) {
      // res.cookie('user', token)
      res.json({ message: token })
    } else {
      res.json({ message: 'error' })
    }
  } else { // 회원정보가 없으면
    res.json({ message: 'error' })
  }
})

router.post('/:email/reviews', async function(req, res) {
  // 성공여부 확인 안해봄
  let user = await User.findOne({ email: req.params.email })
  console.log(user)
  let review = req.body
  console.log(review)

  // delete review.email
  // review.index = req.body.index

  user.reviews.push(review)
  user.save()
  res.send('aa')
})


// user.userId = req.body.userId
// user.password = req.query.password
// user.sex = req.query.sex
// user.followers = req.query.followers
// user.followings = req.query.followings
// user.reviews = req.query.reviews

// console.log(User)
// user.save(function(err) {
// if (err) {
//   console.log(err)
//   res.status(400).json({ result: 'error' })
//   return
// }

// res.status(200).json({ result: 1 })
// })
// })

// router.put('/:id/', function(req, res) {
//   User.updateOne({ _id: req.params.id }, { $set: req.query }, function(err, output) {
//     if (err) { res.status(500).json({ err: 'connect failed' }) }
//     if (!output.n) return res.status(404).json({ err: 'not founded' })
//     res.json({ res: 'success' })
//   })
// })

// router.delete('/:id/', function(req, res) {
//   User.remove({ _id: req.params.id }, function(err, output) {
//     if (err) return res.status(500).json({ error: 'connect failed' })
//     res.status(204).end()
//   })
// })


module.exports = router