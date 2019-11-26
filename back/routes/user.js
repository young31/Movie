// model setting
const express = require('express')
const router = express.Router()
const User = require('../models/users')

// auth setting
const jwt = require('jsonwebtoken')
const secretKey = require('../config/jwt')

const decode = require('../config/auth')


// 유저 전체 조회(login 하듯이 유저 정보 전달 => 마스터 유저확인)
router.post('/', function(req, res) {
  if (!req.body.master) {
    res.send('you are not authorized')
    res.end()
  }
  User.find(function(err, users) {
      if (err) { return res.status(500).send({ error: 'fail' }) }
      // res.send(users)
      // next()
      res.json(users)

    })
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

// 회원가입
router.post('/signup', async function(req, res) {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    User.create(req.body)
    res.send('success')
  } else {
    res.json({ message: 'error' })
  }
})


// 로그인
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


// 개별 유저 조회
router.get('/:email', async function(req, res) {
  let user = await User.find({ email: req.params.email })
  if (user) {
    res.json(user)
  } else { res.status(404).json({ message: 'fail' }) }

})

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