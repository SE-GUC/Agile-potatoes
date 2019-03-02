var express = require('express');
var router = express.Router();
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const Member = require('../models/memberModel');



////////////// 13
router.get('/:id/notifications', function (req, res) {
    var userType = req.body.userType ;
    var userId = req.params.id ;
    
    if (userType == 'Admin')
    {
        Admin.findByIdAndUpdate(userId, {'notifications.seen': true}, 
            function(err, admin)
        {
            if(admin)
            {
                res.send(admin.notifications) ;
            }

        })
    }
    else{
        if(userType === 'Member'){
            Member.findByIdAndUpdate(userId, {'notifications.seen': true}, 
            function(err, member)
        {
            if(member)
            {
                res.send(member.notifications) ;
            }

            })
        }
        else{
            if(userType === 'Partner'){
                Partner.findByIdAndUpdate(userId, {'notifications.seen': true}, 
                function(err, partner)
                {
                    if(partner)
                    {
                        res.send(partner.notifications) ;
                    }

                })
            }
        }
    }
})
module.exports = router;
