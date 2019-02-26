'use strict'
var express = require('express');

var notificationRouter = require('./controllers/notificationRouter');
var profileRouter = require('./controllers/profileRouter');
var vacancyRouter = require('./controllers/vacancyRouter');
var eventRouter = require('./controllers/eventRouter');

app.use('/api/notification', notificationRouter);
app.use('/api/profile', profileRouter);
app.use('/api/vacancy', vacancyRouter);
app.use('/api/event', eventRouter);

var app = express();
