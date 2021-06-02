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

// view engine setup
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cache Setup
var redis = require("redis");
var cacheConnection = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEKEY}});
app.set('cache', cacheConnection);


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