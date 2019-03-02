const Vacancy = require('../models/vacancyModel');
const Partner = require('../models/partnerModel');
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

router.get(('/:id', function(req,res){

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


module.exports = router;
