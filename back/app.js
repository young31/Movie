var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// const history = require('connect-history-api-fallback')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
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
<<<<<<< HEAD
const test = require('./routes/test')
const movie = require('./routes/movies')
const genre = require('./routes/genres')

app.use('/api/movies', movie)
app.use('/api/test', test)
app.use('/api/genre', genre)
  // mongoose.Promise = global.Promise
  ////////////////////////////////////////
=======

app.use('/api/movies', movieRouter)
app.use('/api/users', usersRouter)
app.use('/api/genres', genreRouter)
app.use('/api/reviews', reviewRouter)

////////////////////////////////////////
>>>>>>> 7694a3d27b2c09d30ace371804ca6a5ffff03001
app.use('/', indexRouter);




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