var express = require('express');
var router = express.Router();
var Eventt = require('../models/eventModel');

//user story: As a partner I can update my pending events
router.put('/:id', async (req,res) => {
    var userType = req.body.userType; //should come from session
    var userId = req.body.userId; //should come from session
    var profId = req.params.id;
    if (profId == userId){       //user viewing his profile
        if (userType == 'Partner') { 
            const id = req.params.id;
            const event = await Eventt.findOne({id});
            if(!event) 
                return res.status(404).send({error: 'Event does not exist'});
            await Eventt.updateOne(req.body);
            res.json({msg: 'Event updated successfully'});
        }
    }
    else 
        return res.status(400).send({error: 'Cannot edit this event as it is not yours'});
 });

module.exports = router;
