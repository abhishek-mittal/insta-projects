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

var whitelist = ['http://localhost:4200', 'http://localhost:3000', 'https://kohu4iwzjk.execute-api.us-east-2.amazonaws.com/production']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(__dirname + 'dist/instacar-task-app'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
