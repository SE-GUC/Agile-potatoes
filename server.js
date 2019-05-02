'use strict'
const express = require('express');
const mongoose = require('mongoose');
const config = require("./config");
const path = require('path');
const cron = require('node-cron');
const Event = require('./models/eventModel');

const port = process.env.PORT || config.getDevelopmentPort();
mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true }).then(() => console.log('connected successfully')).catch(err => console.log('got error' + err));

const notificationRouter = require('./routers/notificationRouter');
const profileRouter = require('./routers/profileRouter');
const vacancyRouter = require('./routers/vacancyRouter');
const eventRouter = require('./routers/eventRouter');

const app = express();


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization");
    //res.header('Access-Control-Allow-Headers', 'Content-Type');
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


// passed events should get status of 'Finished'
cron.schedule('0 0 0 * * *', () => { //running every day at midnight
    console.log('expired events change status at midnight')
    try {
    Event.find({eventStatus: 'Approved'}, 'eventDate eventStatus')
        .exec((err, events) => {
            if (err) throw err;
            for (let event of events) {
                if ((event.eventDate) && event.eventDate < new Date()) {
                    event.eventStatus = 'Finished'
                    event.save();
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
});
