var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');

// connect redis
require('./src/redis');
require('./src/config/bootstrap');
require('./src/config/db')();

const config = require('./src/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// settup passport middleware
require('./src/config/passport')(passport, config);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
