const Vacancy = require('../models/vacancyModel');
const Partner = require('../models/partnerModel');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({extended: true})) //handle url encoded data


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
            });
    } 
    else if (userType == 'Partner') {
        Vacancy.findById(vacId)
            .exec(function (err, vacancy) {
                console.log(vacancy.commentsByPartner);
                vacancy.commentsByPartner.push({
                    text: comment,
                    author: userId
                });
                vacancy.save(); //DON'T FORGET TO SAVE DOCUMENT INTO DATABASE
            });
    }
    return res.send("updated");
});
router.post('/:id', function (req, res) {
    var description = req.body.description; //should come from session
    var duration = req.body.duration;    //should come from session
    var location = req.body.location; //should come from session
    var salary = req.body.salary;    //should come from session
    var dailyHours = req.body.dailyHours; //should come from session
    var postDate = req.body.postDate;    //should come from session
    var status = req.body.status; //should come from session
    var url = req.body.url;    //should come from session
    var partner = req.body.partner; //should come from session
    var admin = req.body.admin;    //should come from session
    var applicants = req.body.applicants; //should come from session
    var commentsByAdmin = req.body.commentsByAdmin;    //should come from session
    var commentsByPartner = req.body.commentsByPartner; //should come from session
    var vacancy = new Vacancy({description:description},{duration:duration},{location:location},{salary:salary},{dailyHours:dailyHours},
    {postDate:postDate},{status:status},{url:url},{partner:partner},{admin:admin},{applicants:applicants},
    {commentsByAdmin:commentsByAdmin},{commentsByPartner:commentsByPartner});
    vacancy.save(function(err){
        if(err) return handleError(err);
    }
    );

});
     











)

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
module.exports = router;
