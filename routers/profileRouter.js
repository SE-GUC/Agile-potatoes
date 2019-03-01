const Admin = require('../models/adminModel')
const Member = require('../models/memberModel')
const Partner = require('../models/partnerModel')

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({extended: true})) //handle url encoded data

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


router.put('/:id/name', function(req,res){
    var userType = req.body.userType;
    var userId = req.body.userId;
    var fname = req.body.name;
    var lname = req.body.name;
    if (userType == 'Admin'){
        Admin.findByIdAndUpdate(userId, {fname: fname, lname: lname}, 
        function(err, response){
           console.log(response);
         });
    }
    return res.send("Name Updated");
});


router.put('/:id/password', function(req,res){
    var userType = req.body.userType;
    var userId = req.body.userId;
    var password = req.body.password;
    if (userType == 'Admin'){
        Admin.findByIdAndUpdate(userId, {password: password}, 
        function(err, response){
           console.log(response);
         });
    }
    return res.send("Password Updated");
});


module.exports = router;
router.listen(3000);