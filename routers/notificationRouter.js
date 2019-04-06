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
    var userType = req.body.userType;
    var userId = req.body.userId; //should come from session
    var correctType;

    console.log(userType);
    switch (userType) {
        case 'Admin': correctType = Admin; break;
        case 'Partner': correctType = Partner; break;
        case 'Member': correctType = Member; break;
    }
    correctType.findById(userId, 'notifications', function (err, user) {
        user.notifications.forEach(function (notf) {
            notf.seen = true;
        });
        res.send(user.notifications);
        user.save();
    });


})
module.exports = router;
