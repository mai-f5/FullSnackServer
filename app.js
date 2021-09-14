var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var db = require('./config/database')

var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var eventsRouter = require('./routes/events');
var forumRouter = require('./routes/forum');
var staticData = require('./routes/staticData');



var app = express();
app.set("trust proxy", 1);
app.use(cors({
    origin: ['http://localhost:3000', 'http://client.fullsnack-leebaron.site'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/events', eventsRouter);
app.use('/forum', forumRouter);
app.use('/staticdata', staticData);
app.use('/public', express.static('public'))

module.exports = app;
