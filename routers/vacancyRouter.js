const Vacancy = require('../models/vacancyModel');
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const Member = require('../models/memberModel');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({extended: true})) //handle url encoded data

/////////// 7
router.post('/:id/comment', function (req,res) {
    var userType = req.body.userType; //should come from session
    var userId = req.body.userId;    //should come from session
    var comment = req.body.comment;
    var vacId = req.params.id;
    if (userType == 'Admin'){
        Vacancy.findById(vacId)
            .exec(function (err, vacancy) {
                vacancy.commentsByAdmin.push({
                    text: comment,
                    author: userId
                });
                vacancy.save(); //DON'T FORGET TO SAVE DOCUMENT INTO DATABASE
            })
        Vacancy.findById(vacId).populate('partner') //notifying partner
            .exec(function (err, vacancy) {
                vacancy.partner.notifications.push({
                    srcURL: '/api/vacancy/' + vacId,
                    description: 'Admin commented on your vacancy request'
                });
                vacancy.partner.save(); //DON'T FORGET TO SAVE DOCUMENT INTO DATABASEs
            })
    } 
    else if (userType == 'Partner') {
        Vacancy.findById(vacId)
            .exec(function (err, vacancy) {
                console.log(vacancy.commentsByPartner);
                vacancy.commentsByPartner.push({
                    text: comment,
                    author: userId
                });
                vacancy.save(); 
            });
        Vacancy.findById(vacId).populate('admin') //notifying admin
            .exec(function (err, vacancy) {
                vacancy.admin.notifications.push({
                    srcURL: '/api/vacancy/' + vacId,
                    description: 'Partner commented on your vacancy request'
                });
                vacancy.admin.save(); 
            })
    }
    return res.send("updated");
});
router.post('/:id/CreateVacancy', function (req, res) {
    var userId = req.params.id;   //should come from session
    var description = req.body.description; 
    var duration = req.body.duration;    
    var location = req.body.location; 
    var salary = req.body.salary;    
    var dailyHours = req.body.dailyHours; 
    var vacancy = new Vacancy({
        description:description,
        duration:duration,
        location:location,
        salary:salary,
        dailyHours:dailyHours,
        partner:userId
    });

    vacancy.url= '/api/vacancy/' + vacancy._id;
    vacancy.save(function(err){
        if(err) return handleError(err);
    });
    Partner.findById(userId).exec(function(err,par){
        par.vacancies.push(vacancy);
        par.save();   
    });
    return res.send("created vacancy successfully");
});


 //15    
router.get('/:id/comment', function (req,res) { 
    var userType = req.body.userType; //should come from session
    var userId = req.body.userId;    //should come from session
    var vacId = req.params.id;
     if (userType == 'Admin' || userType == 'Partner'){  //only partners and admins can access vacancies' comments section

         Vacancy.findById(vacId)
          .exec(function(err,vacancy){
             vacancy.commentsByPartner.populate('author');
             vacancy.commentsByAdmin.populate('author');
             var Allcomments = vacancy.commentsByAdmin.concat(vacancy.commentsByPartner); // putting all comments in one object
             res.send(Allcomments);
          })
     }
    })

////////// 16
router.get('/:id/applicants', function (req, res) {
    var userId = req.body.userId; //should come from session
    var vacId = req.params.id;
    Partner.findById(userId,'vacancies')
        .exec(function (err, partnerDoc) {
            if (partnerDoc.vacancies.find(vac => (vac._id == vacId)))   //partner investigating HIS vacancy applicants
                Vacancy.findById(vacId, 'applicants')
                    .populate('applicants', 'fname lname ProfileURL')
                    .exec(function (err,vacancyDoc) {
                        return res.send(vacancyDoc.applicants);
                    })
            else                                                        //partner try to investigate other partner vacancy applicants
                return res.send('you are not allowed to view this')
        })
})

router.delete('/', function(req,res){
    var userType=req.body.userType;
    var vacId= req.params.id;

    if(userType == 'Partner')
    {
        Vacancy.findById(vacId)
        .exec(function(err,vacancy){
            if(vacancy.status=='Submitted')
            {
                Vacancy.deleteOne(vacancy,function(err,result){
                    if(err)
                    {
                        handleError(err);
                    }
                    vacancy.save();
                })
            }


        }
        
        
        )
    }


return res.send("deleted");

}

);

router.get('/pendingVacancies', function(req,res){

    var userType=req.body.userType;
    var pendingVacancies=[];


    if(userType=='Admin')
    {
        Vacancy.find().array.forEach(vacancy => {
            if(vacancy.status=='Submitted')
            {
                pendingVacancies.push(vacancy);
            }
        });
    }


return  res.send(pendingVacancies);


});

// Story 22.2 : viewing recommended vacancies as a member (sprint 2)
router.get('/RecommendedVacancies', function (req, res) {
    var userId = req.body.userId;
    var RecommendedVacancies = [];
    Member.findById(userId)
        .exec((err, member) => {
            if (err) console.log(err); // getting recommended events
            if (member.availability !== true) return res.send('member is not available to be hired')
            Vacancy.find({'status': 'Open'})
                .exec((err, vacs) => {
                    if (err) console.log(err);
                    for (vac of vacs) {
                        if ((vac.city) && (member.address.includes(vac.city))) {
                            RecommendedVacancies.push(vac);
                        } else{
                            for (skill of member.skills ){
                                if (skill.includes(vac.name) || vac.name.includes(skill)){
                                    RecommendedVacancies.push(vac);
                                    break;
                                }
                            }
                        }
                    }
                    res.send(RecommendedVacancies);
                })
        })
})

//As an admin i can change vacancy status if it is submitted and as a partner i can change vacancy status if it is opened
router.put('/:id/status', function(req,res){
    var userType = req.body.userType;
    var vacId = req.params.id;
    var vacStatus = req.body.status;
    if (userType == 'Admin'){
        Vacancy.findById(vacId).exec(function(err,vacancy){
            if(vacancy.status == 'Submitted')
              Vacancy.findByIdAndUpdate(vacId, {status: vacStatus}, 
              function(err, response){
              console.log(response); 
              return res.send("Status Updated");
            });
            else  
            return res.send("This vacancy is already opened and you are not allowed to change its status")
                    
    })}
    else if (userType == 'Partner'){
        Vacancy.findById(vacId).exec(function(err,vacancy){
            if(vacancy.status == 'Open')
              Vacancy.findByIdAndUpdate(vacId, {status: vacStatus}, 
              function(err, response){
              console.log(response); 
              return res.send("Status Updated");
             });
            else
            return res.send("You are not allowed to change the status of this vacancy")
      
                    
    })}
    
});









////////////// Story 22.1 : A partner can view his vacancy
router.get('/:id/', function(req, res){  //showing non approved vacancy to be updated and checking if its pending

    var userType = req.body.userType ;  //should come from session
    var userId = req.body.id ;      //should come from session
    var vacId = req.params.id ;

    Vacancy.findById(vacId, 'duration location description salary dailyHours partner status').exec(function (err, vacancy){

        if(userType === 'Partner' && userId == vacancy.partner && vacancy.status === 'Submitted')
        {
            return res.send(vacancy) ;
        }
        else{
            return res.send("It's either not your own vacancy to update or its not pending anymore to be edited") ;
        }
    })
})

////////////// Story 22.2 : A partner can update his vacancy
router.post('/:id/', function(req, res){  //submitting edited vacancy
    
    var vacId = req.params.id ;
    var duration = req.body.duration ;
    var location = req.body.location ;
    var description = req.body.description ;
    var salary = req.body.salary ;
    var dailyhours = req.body.dailyHours ;

    Vacancy.findById(vacId).exec(function(err,vacancy){

        if(err)
        {
            return res.send(err) ;
        }        
        if(vacancy.status === 'Submitted')
        {
        
            vacancy.duration = duration ;
            vacancy.location = location ;
            vacancy.description = description ;
            vacancy.salary = salary ;
            vacancy.dailyhours = dailyhours ;

            vacancy.save();
        }
        else{
            res.send('Vacancy cannot be edited after being approved') ;
        }
    })
})


module.exports = router;

