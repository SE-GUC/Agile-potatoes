'use strict'
const express = require('express');
const mongoose = require('mongoose');
const config = require("./config");

const port = process.env.PORT || config.getDevelopmentPort();
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log('connected successfully')).catch(err => console.log('got error' + err));


const notificationRouter = require('./routers/notificationRouter');
const profileRouter = require('./routers/profileRouter');
const vacancyRouter = require('./routers/vacancyRouter');
const eventRouter = require('./routers/eventRouter');

const app = express();

app.get('/', function (err, res) {
    res.send('welcome to lirtenhub');
})


app.use('/api/notification', notificationRouter);
app.use('/api/profile', profileRouter);
app.use('/api/vacancy', vacancyRouter);
app.use('/api/event', eventRouter);

// handling errors
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
    next();
});



console.log(`app is up and running ... on http://localhost:${port}`);
app.listen(port);


