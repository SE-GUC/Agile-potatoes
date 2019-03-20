'use strict'
const express = require('express');
const mongoose = require('mongoose');
const config = require("./config");

const port = process.env.PORT || config.getDevelopmentPort();
mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true});

const notificationRouter = require('./routers/notificationRouter');
const profileRouter = require('./routers/profileRouter');
const vacancyRouter = require('./routers/vacancyRouter');
const eventRouter = require('./routers/eventRouter');

const app = express();


app.use('/api/notification', notificationRouter);
app.use('/api/profile', profileRouter);
app.use('/api/vacancy', vacancyRouter);
app.use('/api/event', eventRouter);

//inserting an event id into a member doc

console.log(`app is up and running ... on http://localhost:${port}`);
app.listen(port);



