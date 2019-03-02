const Vacancy = require('../models/vacancyModel');
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
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
router.post('/CreateVacancy', function (req, res) {
    var userId = req.body.id;   //should come from session
  
    var description = req.body.description; 
    var duration = req.body.duration;    
    var location = req.body.location; 
    var salary = req.body.salary;    
    var dailyHours = req.body.dailyHours; 
    var partner = req.body.partner; 
    var vacancy = new Vacancy({description:description},{duration:duration},{location:location},{salary:salary},{dailyHours:dailyHours},{partner:partner});
    vacancy.url= '/api/vacancy/' + vacancy._id;
    vacancy.save(function(err){
        if(err) return handleError(err);
    });

});
     




     












=======
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


router.put('/:id/status', function(req,res){
    var userType = req.body.userType;
    var vacId = req.params.id;
    var vacStatus = req.body.status;
    if (userType == 'Admin'&&  Vacancy.status== 'Submitted'){
        Vacancy.findByIdAndUpdate(vacId, {status: vacStatus}, 
          function(err, response){
          console.log(response);
        });
                    
    }
    else if (userType == 'Partner' &&  Vacancy.status== 'Open'){
        Vacany.findByIdAndUpdate(vacId, {status: vacStatus}, 
        function(err, response){
           console.log(response);
         });
    }        
    return res.send("Status Updated");
});








////////////// Story 22.1 : A partner can view his vacancy
router.get('/:id/', function(req, res){  //showing non approved vacancy to be updated and checking if its pending

    var userType = req.body.userType ;  //should come from session
    var userId = req.body.id ;      //should come from session
    var vacId = req.params.id ;

    Vacancy.findById(vacId, 'duration location description salary dailyHours').exec(function (err, vacancy){

        if(userType === 'Partner' && userId === vacancy.partner && vacancy.status === 'Submitted')
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

