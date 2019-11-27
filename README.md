# Backend DB관리
- 사용 프레임 워크: express + mongodb

## DB연결
- app.py
// mongoose로 조작
const mongoose = require('mongoose')

// port 설정
const port = process.env.PORT || 3000

// db에 연결시 알림 설정
const db = mongoose.connection
db.on('error', function() {
  console.error('error')
})
db.once('open', function() {
  console.log('connected')
})

// mognodb를 연결할 위치 및 디렉토리
const LOCAL_URI = 'mongodb://localhost/mongodb_tutorial'
mongoose.connect(LOCAL_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true
})



## jwt 관리
- 로그인시 필요
    - front에 전달해줘야 함

let token = jwt.sign({
        email: req.body.email
      },
      secretKey.secret, { expiresIn: '1d' })

식으로 토큰 생성

- secretKey파일에는
let jwtObj = {}

jwtObj.secret = 'SeCrEtKeY'

module.exports = jwtObj
식으로 생성해 놓음

- 