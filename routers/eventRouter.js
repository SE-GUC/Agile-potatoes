const Event = require('../models/eventModel');
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended: true})) 

router.post('/:id/comment', function (req,res) {
    var userType = req.body.userType; 
    var userId = req.body.userId;   
    var comment = req.body.comment;
    var evId = req.params.id;
    if (userType == 'Admin'){
        Event.findById(evId)
            .exec(function (err, event) {
                event.commentsByAdmin.push({
                    text: comment,
                    author: userId
                });
                event.save(); 
            });
    } 
    else if (userType == 'Partner') {
        Event.findById(evId)
            .exec(function (err, event) {
                console.log(event.commentsByPartner);
                event.commentsByPartner.push({
                    text: comment,
                    author: userId
                });
                event.save(); 
            });
    }
    return res.send("updated");
});
module.exports = router;
