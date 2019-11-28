# Backend DB관리
- 사용 프레임 워크: express + mongodb

## DB연결
- app.py

  ```javascript
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
  ```

## jwt 관리

- 로그인시 필요
  
    - front에 전달해줘야 함
    
    ```javascript
    // token 생성방법
    let token = jwt.sign({
            email: req.body.email
          },
          secretKey.secret, { expiresIn: '1d' })
    ```

- secretKey파일에는

  ```javascript
  let jwtObj = {}
  jwtObj.secret = 'Secretkey'
  
  module.exports = jwtObj
  ```


## Model
- 관계형 DB가 아닌 MongoDB를 사용하므로 방대한 관계를 맺는 모델링을 하지 않음
  
- 대신에 User모형과 Movie모형만 사용하면서 관계를 다룰 수 있음
  
- Movie의 스키마는 다음과 같음

  ```javascript
  const movieSchema = new Schema({
  index: {
    type: Number,
    unique: true
  },
  title: String,
  title_trim: String,
  openDt: Date,
  score: { type: Float },
  rate: Array,
  directors: Array,
  directors_name: Array,
  actors: Array,
  actors_name: Array,
  description: String,
  posterUrl: String,
  genres: Array,
  runningTime: Number,
  preview: String,
  like_users: Array, // user, like
  reviews: Array // user, rate, content
  }, { collection: 'movies' })
  ```

## Routes
- 들어온 요청에 대한 함수로직을 짜는 곳임
- 실제로 사용하는 routes는 모델과 마찬가지로 movies와 users만 사용함
- 기본적으로 RESTful하게 구성

### movies
- 기본적으로 컨셉에 맞게 검색기능에 집중함
- 영화정보에 대한 조작은 관리자만 사용할 수 있음

#### GET
- 전체조회
  
    - 기본적으로 관심이 갈 법한 영화목록을 전달함
    
- 쿼리문을 통해서 제어
  
    ```javascript
    router.get('/', async function(req, res, next) {
    Movie.find({}).lt('openDt', date())
      .sort('-openDt -score')
      .ne('score', null)
      .limit(50)
      .then((movies) => {
        // console.log(movies[0])
        if (!movies.length) {
          return res.status(404).send({ message: 'error' })
     }
      res.json(movies)
        })
      })
    ```
    
      
    
- 특정 영화 조회
    - DB의 부피를 줄이기 위해 사용
    - 영화 정보를 저장할 필요가 있을 때 영화의 ID값만 저장하고 필요시 불러옴

#### POST
- 검색기능
    - 검색에 필요한 옵션을 전달 받을 필요가 있으므로 post로 설정함
    - DB에 있는 모든 요소에 대해서 조건을 받을 수 있음
    - 본 서비스에서는 기간과 평점 등에 대해 조건을 달아줌
        - if 로직으로 정보가 들어오는 경우에만 조건에 맞게 정렬하게 함
    
    ```javascript
    router.post('/search', async function(req, res) {
      let movie_title
      let movie_actor
      let movie_director
      let result
      let genres = []
    
      if (req.body.keyword) {
        let target = req.body.keyword.split(' ').join('')
        movie_title = Movie.find({ title_trim: { $regex: target, $options: "ix" } })
        movie_actor = Movie.find({ actors_name: { $in: target } })
        movie_director = Movie.find({ directors_name: { $in: target } })
    ```

- 관련기능
    - 관련기능으로는 댓글, 찜하기, 평점이 존재
    - 함수 실행시 movies와 users 양쪽에 정보를 저장함
    - 단일인에 대한 데이터 조작을 방지하고자 중복 평점과 찜하기기능을 막아놈
    
    ```javascript
    router.post('/:index/like', async function(req, res) { 
      let movie = await Movie.findOne({ index: req.params.index })
      if (movie.like_users.includes(req.body.email)) {
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
    ```

### User
- 기본적으로 관리자만 접근 가능한 기능들임(get요청 없음)
#### POST
- 회원가입
    - front에서 1차로 validation한 값을 활용
    - 회원정보가 있을 경우 저장하지 않고 오류를 출력함
    
  ```javascript
  router.post('/signup', async function(req, res) {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      User.create(req.body)
      res.send('success')
      } else {
    res.json({ message: 'error' })
    }
  ```
  
- 로그인
    - 이전에 설정한 jwt를 활용하는 단계
    - 마찬가지로 front에서 확인한 정보를 받아 일치여부를 판단하여 token를 넘겨주어 front에서 관리함
    
  ```javascript
  router.post('/login', async function(req, res) {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      let token = jwt.sign({
          email: req.body.email
      },
      secretKey.secret, { expiresIn: '1d' })
  
    if (user.email === req.body.email && user.password === req.body.password) {
        res.json({ message: token })
      } else {
        res.json({ message: 'error' })
      }
    } else { // 회원정보가 없으면
      res.json({ message: 'error' })
  }
})
  ```
  
- 유저조회
  - 해당 기능은 userId와 email(pk)로 검색을 제공함
  - 유저간의 커뮤니티 기능을 제공하기 위해서 사용함(다른 사람이 찜한 영화 보기 등)
  
  ```javascript
  router.post('/id', async function(req, res) {
    const users = await User.find({ userId: req.body.userId }).select('userId email')
    res.json({ result: users })
  })
  ```

- 정보 수정 및 삭제
    - RESTful한 api를 만들기 위해서 put과 delete메서드를 사용해서 구현