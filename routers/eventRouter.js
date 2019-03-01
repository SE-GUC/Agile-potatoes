const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({extended: true})) //handle url encoded data
const Events = require('../models/eventModel');


//user story 21: As a partner I can update my pending events
 router.put('/:id', async (req,res) => {
    var userType =  'Partner' //should come from session
    var userID =  '5c7945fe1c9d440000ec7811' //should come from session
    var creatorID = '5c7945fe1c9d440000ec7811'; //should come from event itself
    var id = req.params.id;
    if (userType == 'Partner' && creatorID == userID){     //partner updating HIS event
        var values = req.body;
        await Events.update({_id: id}, values);
        res.json({msg: 'Event updated successfully'});
    }
    else 
        return res.status(400).send({error: 'Cannot edit this event as it is NOT yours'});
 });

module.exports = router;
