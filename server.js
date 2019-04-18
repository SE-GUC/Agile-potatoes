'use strict'
const express = require('express');
const mongoose = require('mongoose');
const config = require("./config");
const path = require('path');


const port = process.env.PORT || config.getDevelopmentPort();
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log('connected successfully')).catch(err => console.log('got error' + err));

const notificationRouter = require('./routers/notificationRouter');
const profileRouter = require('./routers/profileRouter');
const vacancyRouter = require('./routers/vacancyRouter');
const eventRouter = require('./routers/eventRouter');

const app = express();


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use('/api/notification', notificationRouter);
app.use('/api/profile', profileRouter);
app.use('/api/vacancy', vacancyRouter);
app.use('/api/event', eventRouter);

// handling errors here
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
    next();
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

console.log(`app is up and running ... on http://localhost:${port}`);
app.listen(port);

