var express = require('express');
var router = express.Router();




////////////// 13
router.get('/:id/notifications', function (req, res) {
    var userType = req.body.userType ;
    var userId = req.params.id ;
    
    if (userType == 'Admin')
    {
        Admin.findById(userId).exec(
        function (err, admin)
        {
            if(err)
            {
                console.log('wrong query!') ;
                next() ; //end as return
            }
            if(admin)
            {
                res.send(admin.notifications) ;

                for(var i = 0 ; i < admin.notifications.length ; i++)
                    if(admin.notifications.seen === false)
                        break ;
                if(i < admin.notifications.length)
                    admin.notifications[i].seen = true ;
                admin.save() ;
                            
                // Admin.update({"_id": userId,'notifications.seen': false}, {'$set': {'notifications.$.seen': true}},
                //             function(err) {console.log('ERROR!')})
            }

            }) ;
    }
    else{
        if(userType === 'Member'){
            Member.findById(userId)
            .exec(function (err, member)
            {
                if(member)
                {
                    // member.notifications.seen = true ;
                    member.notifications.$.seen = true ;
                    member.save() ;
                    return res.send(member.notifications) ;
                }
/*                if(err)
                {
                    console.log(err.message) ;
                    return ;
                }
*/
            }) ;
        }
        else{
            if(userType === 'Partner'){
                Partner.findById(userId)
                .exec(function (err, partner)
                {
                    if(member)
                    {
                        partner.notifications.seen = true ;
                        partner.save() ;
                        return res.send(member.notifications) ;
                    }
                    // if(err)
                    // {
                    //     console.log(err.message) ;
                    //     return ;
                    // }
                }) ;
            }
        }
    }
})
module.exports = router;
