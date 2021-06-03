var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var authorsRouter = require('./routes/authors');
var authorRouter = require('./routes/author');
var quotesRouter = require('./routes/quotes');
var topicsRouter = require('./routes/topics');
var keywordsRouter = require('./routes/keywords');
var searchRouter = require('./routes/search');


var app = express();
/*
process.on('uncaughtException', function (err) {
  try {
      console.log(err);
      mongoDal.log(err.message, err);
      //res.status(500).send(err.message);
      //return res.status(500).send("Something Broke!");
  } catch (err) {

  }
});*/

// view engine setup
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/authors', authorsRouter);
app.use('/quotes', quotesRouter);
app.use('/topics', topicsRouter);
app.use('/keywords', keywordsRouter);
app.use('/search', searchRouter);

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


module.exports = app;