var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var db = require('./config/database')


var indexRouter = require('./routes/index');
var exploreRouter = require('./routes/explore');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/project');
var staticData = require('./routes/staticData');

var app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/explore', exploreRouter);
app.use('/users', usersRouter);
app.use('/project', projectRouter);
app.use('/events', projectRouter);
app.use('/staticdata', staticData);

//static gives us access to the public folder of our server, in the frontend
app.use('/static', express.static('public'))


module.exports = app;
