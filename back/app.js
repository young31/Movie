var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// const history = require('connect-history-api-fallback')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const movieRouter = require('./routes/movies');
const genreRouter = require('./routes/genres');
const reviewRouter = require('./routes/reviews');

const port = process.env.PORT || 3000
var app = express();
const db = mongoose.connection

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////////
// const test = require('./routes/test')
const movie = require('./routes/movies')
const genre = require('./routes/genres')
const user = require('./routes/user')

app.use('/api/movies', movie)
  // app.use('/api/test', test)
app.use('/api/genre', genre)
app.use('/user', user)

mongoose.Promise = global.Promise
  ////////////////////////////////////////
app.use('/', indexRouter);

////////////////////////
app.use(function(req, res, next) {
  // CORS에  x-access-token이 추가되었습니다. jwt로 생성된 토큰은 header의 x-access-token 항목을 통해 전달됩니다.
  // CORS(Cross-Origin Resource Sharing): 한 도메인에서 로드되어 다른 도메인에 있는 리소스와 상호 작용하는 클라이언트 웹 애플리케이션에 대한 방법을 정의
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});


/////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// when connected
db.on('error', function() {
  console.error('error')
})
db.once('open', function() {
  console.log('connected')
})

const LOCAL_URI = 'mongodb://localhost/mongodb_tutorial'
mongoose.connect(LOCAL_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true
})


app.listen(port, () => {
  console.log('listen' + port)
})

module.exports = app;