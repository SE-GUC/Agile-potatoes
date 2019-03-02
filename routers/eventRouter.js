var express = require('express');
var router = express.Router();

router.delete('/', function(req,res){
    var userType=req.body.userType;
    var evId= req.params.id;

    if(userType == 'Partner')
    {
        Event.findById(vacId)
        .exec(function(err,event){
            if(event.status=='Submitted')
            {
                Event.deleteOne(event,function(err,result){
                    if(err)
                    {
                        handleError(err);
                    }
                    event.save();
                })
            }


        }
        
        
        )
    }


return res.send("deleted");

}





);




module.exports = router;
