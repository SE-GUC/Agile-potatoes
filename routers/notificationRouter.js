const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const Member = require('../models/memberModel');


router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({ extended: true })) //handle url encoded data

// Story 13 : admin/member/partner can view his notifications
router.get('/', function (req, res) {
    var userType = req.get('userType');
    var userId = req.get('userId'); //should come from session
    // var correctType;

    // console.log(userType);
    // switch (userType) {
    //     case 'Admin': correctType = Admin; break;
    //     case 'Partner': correctType = Partner; break;
    //     case 'Member': correctType = Member; break;
    // }
    // correctType.findById(userId, 'notifications', function (err, user) {
    //     user.notifications.forEach(function (notf) {
    //         notf.seen = true;
    //     });
    //     res.send(user.notifications);
    //     user.save();
    // });

    if(userType == 'Admin'){
        Admin.findById(userId).exec(function(err,admin){
            if(err) console.log(err);
            admin.notifications.forEach(function(notif){
                notif.seen = true;
            })
            admin.save();
       
            return res.send(admin.notifications);
        })
    }
    else
    if(userType == 'Partner'){
        Partner.findById(userId).exec(function(err,partner){
            if(err) console.log(err);
            partner.notifications.forEach(function(notif){
                notif.seen = true;
            })
            partner.save();
         
           return res.send(partner.notifications);
        })
    }
    else
    if(userType == 'Member'){
        Member.findById(userId).exec(function(err,member){
            if(err) console.log(err);
            member.notifications.forEach(function(notif){
                notif.seen = true;
            })
            member.save();
           
            return res.send(member.notifications);
        })
    }
    else
    return res.send("Not authorized");


})

module.exports = router;

