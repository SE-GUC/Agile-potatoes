const Admin = require('../models/adminModel')
const Member = require('../models/memberModel')
const Partner = require('../models/partnerModel')

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({extended: true})) //handle url encoded data
///////////////// 12
router.get('/:id',function (req,res) {
    var userType = req.body.userType; //should come from session
    var userId = req.body.userId; //should come from session
    var profId = req.params.id;
    if (profId == userId){       //user viewing his profile
        if (userType == 'Admin') {
            Admin.findById({_id: profId},function (err,adminDoc) {    
                if (err) throw err;
                res.send(adminDoc);
            });
        }
        else if (userType == 'Partner'){
            Partner.findById({_id: profId}, function (err, partnerDoc) {
                if (err) throw err;
                res.send(partnerDoc);
            });
        }
        else if (userType == 'Member'){
            Member.findById({_id: profId}, function (err, memberDoc) {
                if (err) throw err;
                console.log("I am heeerrreeee");
                res.send(memberDoc);
            })
        }
    }
    else{                        //user viewing other's profile
        if (userType == 'Admin') {
            Admin.findById(profId,'username fname lname events',function (err,adminDoc) {    
                if (err) throw err;
                console.log(adminDoc);
                res.send(adminDoc);
            });
        }
        else if (userType == 'Partner'){
            Partner.findById(profId, '-username -password -notifications -membershipExpiryDate', function (err, partnerDoc) {
                if (err) throw err;
                res.send(partnerDoc);
            });
        }
        else if (userType == 'Member'){
            Member.findById(profId, '-username -password -notifications -membershipExpiryDate', function (err, memberDoc) {
                if (err) throw err;
                res.send(memberDoc);
            });
        }
    }
    return ;
})


//user story 8: As a Member I can post feedback to a Partner I previously worked with
router.post('/:id/feedback', function (req,res) {
    var userType = req.body.userType; //should come from session (has to be Member)
    var userID = req.body.userID;    //should come from session (the writer of the feedback comment)
    var partnerID = req.params.id;
    var comment = req.body.comment;
    if(userType == 'Member') {
        Partner.findById(partnerID).exec(function (err, partner) {
            partner.feedbacks.push({
                text: comment,
                author: userID
                });
            partner.save();
        });
        return res.send("Feedback added");
    }
});

//user story: As a Partner I can update my profile (Board Members, Pending vacancies, Password, Pending events).
//still not done
router.put('/:id',function (req, res) {
    var userType = req.body.userType; //should come from session
    var userId = req.body.userId; //should come from session
    var profId = req.params.id;
    if(userType == 'Partner')
        if(profId == userId){
            Partner.updateOne(req.body);
        }
});
        

module.exports = router;
