const Vacancy = require('../models/vacancyModel');
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const Member = require('../models/memberModel');
const Joi = require('joi');
const schemas = require('../models/Schemas/schemas');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const NotifyByEmail = require('../services/NotifyByEmail');

router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({ extended: true })) //handle url encoded data

/////////// 7 Add comment to vacancy (admin-partner negotiation) 
router.post('/:id/comment', (req, res, next) => {
    var userType = req.body.userType; //should come from session
    var userId = req.body.userID;    //should come from session
    var comment = req.body.comment;
    var vacId = req.params.id;
    if (userType == 'Admin') {
        Vacancy.findById(vacId)
            .populate('partner')
            .exec(async (err, vacancy) => {
                if (err) console.log(err)
                if (!vacancy) {
                    console.log('vacancy not found')
                    res.status(404).send("vacancy not found");
                    return next();
                }
                vacancy.commentsByAdmin.push({
                    text: comment,
                    author: userId
                });
                ////notifying partner
                vacancy.partner.notifications.push({
                    srcURL: '/api/vacancy/Post' + vacId,
                    description: 'Admin commented on your vacancy request'
                });
                NotifyByEmail(vacancy.partner.email, 'New comment on vacancy that you follow',
                    `Admin commented on your vacancy request \n go to link: http://localhost:3000/api/vacancy/Post/${vacId}`)
                await vacancy.save(); //DON'T FORGET TO SAVE DOCUMENT INTO DATABASEs
                return res.status(201).send(vacancy.commentsByAdmin);
            })
    }
    else if (userType == 'Partner') {
        Vacancy.findById(vacId)
            .populate('admin')
            .exec(async (err, vacancy) => {
                if (err) console.log(err)
                if (!vacancy) {
                    console.log('vacancy not found')
                    res.status(404).send("vacancy not found");
                    return next();
                }
                vacancy.commentsByPartner.push({
                    text: comment,
                    author: userId
                });
                ////notifying admin
                if (vacancy.admin) {
                    vacancy.admin.notifications.push({
                        srcURL: '/api/vacancy/Post' + vacId,
                        description: 'Partner commented on his vacancy request'
                    });
                    NotifyByEmail(vacancy.admin.email, 'New comment on vacancy that you follow',
                        `Partner commented on his vacancy \n go to link: http://localhost:3000/api/vacancy/Post/${vacId}`)
                }
                await vacancy.save();
                return res.status(201).send(vacancy.commentsByPartner);
            })
    }
});

// As a partner I can submit a vacancy announcement request
router.post('/:id/CreateVacancy', async (req, res) => {
    var userType = req.body.userType;
    var userId = req.params.id;   //should come from session
    var description = req.body.description;
    var duration = req.body.duration;
    var location = req.body.location;
    var salary = req.body.salary;
    var dailyHours = req.body.dailyHours;
    var city = req.body.city;
    var name = req.body.name;

    const result = Joi.validate(req.body, schemas.vacancySchema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    if (userType == 'Partner') {
        var vacancy = new Vacancy({
            name: name,
            description: description,
            duration: duration,
            location: location,
            salary: salary,
            dailyHours: dailyHours,
            cit: city,
            partner: userId,
            status: 'Submitted'
        });

        vacancy.url = '/api/vacancy/Post/' + vacancy._id;
        await vacancy.save();
        Partner.findById(userId).exec(function (err, par) {
            par.vacancies.push(vacancy);
            par.save();
        });
        return res.send("created vacancy successfully");
    }
    else {
        return res.send("you can't create a vacancy");
    }
});

//15 getting all comments of a post
router.get('/:id/comments', function (req, res) {
    var userType = req.get('userType'); //should come from session
    var vacId = req.params.id;
    if (userType == 'Admin' || userType == 'Partner') {  //only partners and admins can access vacancies' comments section
        Vacancy.findById(vacId).populate('author').exec(function (err, vacancy) {
            if (err) console.log(err);
            var Allcomments = vacancy.commentsByAdmin.concat(vacancy.commentsByPartner); // putting all comments in one object
            res.send(Allcomments);
        })
    }
})

// Allow member to apply for a vacancy
router.put('/:id/apply', function (req, res) {
    var uid = req.body.userID; //should come from session
    var userType = req.body.userType;
    var vacId = req.params.id;
    if (userType === 'Member') {
        Vacancy.findById(vacId)
            .exec((err, vac) => {
                if (err) console.log(err);
                if (!vac) {
                    res.status(404).send('vacancy not found')
                } else {
                    if (vac.status != "Open") {
                        res.status(400).send('vacancy is not open at the moment')
                    } else {
                        vac.applicants.push(uid);
                        vac.save();
                        return res.send('Application successful')
                    }
                }
            })
    }

})

////////// 16 getting all those who applied to a vacancy
// router.get('/:id/applicants', function (req, res) {
//     var userId = req.get('userId'); //should come from session
//     var vacId = req.params.id;
//     Partner.findById(userId)
//         .exec(function (err, partnerDoc) {
//             if (partnerDoc.vacancies.find(vac => (vac._id == vacId)))   //partner investigating HIS vacancy applicants
//                 Vacancy.findById(vacId, 'applicants')
//                     .populate('applicants', 'fname lname ProfileURL')
//                     .exec(function (err, vacancyDoc) {
//                         return res.send(vacancyDoc.applicants);
//                     })
//             else                                                        //partner try to investigate other partner vacancy applicants
//                 return res.status(403).send('you are not allowed to view this')
//         })
// })

router.get('/:id/applicants', function (req, res) {
    var vacID = req.params.id;
    Vacancy.findById(vacID, 'applicants')
        .populate('applicants', 'fname lname ProfileURL')
        .exec(function (err, vacancy) {
            if (err) res.status(400).send('Error vacancy not found');
            res.send(vacancy.applicants);
        })
});

//story 11 As a partner I can delete my vacancy request before it is approved
router.delete('/:id/deleteVacancy', function (req, res) {
    var userType = req.body.userType;
    var vacId = req.params.id;
    var userId = req.body.userID;
    if (userType == 'Partner') {
        Vacancy.findById(vacId)
            .exec(function (err, vacancy) {
                if (vacancy.status == 'Submitted' && vacancy.partner == userId) {
                    Vacancy.findByIdAndDelete(vacId)
                        .exec(res.send("deleted vacancy successfully"));
                }
                else
                    res.status(400).send("This vacancy is Open or Closed so it can't be deleted. Or it is simply not yours.")
            })
    }
});

// Story 21.2 display a vacancy post for partner/admin/member
router.get('/Post/:id', function (req, res) {
    var vacId = req.params.id;

    Vacancy.findById(vacId)
        .populate('partner', 'name')
        .exec(
            function (err, response) {
                if (err) console.log(err);
                return res.send(response);
            });
});

//////Story 17 As an admin I cana view pending vacancies announcments requests
// FOR SOME REASON YOU'RE HAVING ID AS PARAMETER !
router.get('/:id/pendingVacancies', function (req, res) {
    var userType = req.get('userType');
    if (userType == 'Admin') {
        Vacancy.find({ status: 'Submitted' }, 'url name eventDate description postDate').exec(function (err, vacancies) {
            if (err) return res.send(err)
            return res.send(vacancies);
        });
    }
    else {
        return res.status(403).send("not authorized");
    }
});

// Story 22.2 : viewing recommended vacancies as a member (sprint 2)
router.get('/RecommendedVacancies', function (req, res, next) {
    let userId = req.get('userId');
    let vacSortObjArray = [];
    let LastRecommendedVacancies = [];
    let RecommendedVacancies = []
    Member.findById(userId, 'availability address skills')
        .exec((err, member) => {
            if (err) next(err);
            if (!member) {
                res.status(404).send("member not found");
                return next();
            }
            if (!member) return res.status(404).send('Member not found');
            Vacancy.find({ 'status': 'Open' }, 'url name location city dailyHours partner description')
                .exec((err, vacs) => {
                    if (err) next(err);
                    for (vac of vacs) {
                        if (((vac.city) && (member.address.includes(vac.city)) || ((vac.location) && (member.address.includes(vac.location))))) {
                            if (vac.dailyHours && member.availability) {
                                vacSortObjArray.push({ vacancy: vac, key: Math.abs(vac.dailyHours - member.availability) })
                            }
                            else {
                                LastRecommendedVacancies.push(vac);
                            }
                        } else {
                            for (skill of member.skills) {
                                if (skill.includes(vac.name) || vac.name.includes(skill)) {
                                    if (vac.dailyHours && member.availability) {
                                        vacSortObjArray.push({ vacancy: vac, key: Math.abs(vac.dailyHours - member.availability) })
                                    }
                                    else {
                                        LastRecommendedVacancies.push(vac)
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    vacSortObjArray.sort((vacSortObj1, vacSortObj2) => {
                        return vacSortObj1.key - vacSortObj2.key
                    });
                    vacSortObjArray.forEach(vacSortObj => {
                        RecommendedVacancies.push(vacSortObj.vacancy);
                    })
                    return res.send(RecommendedVacancies.concat(LastRecommendedVacancies));
                })
        })
})

//As an admin i can change vacancy status if it is submitted and as a partner i can change vacancy status if it is opened
router.put('/:id/status', function (req, res) {
    var userType = req.body.userType;
    var vacId = req.params.id;
    var vacStatus = req.body.status;
    var partnerid = req.body.partner;
    if (userType == 'Admin') {
        Vacancy.findById(vacId).exec(function (err, vacancy) {
            if (vacancy.status == 'Submitted') {
                Vacancy.findByIdAndUpdate(vacId, { status: vacStatus })
                    .populate('partner', 'name')
                    .exec({
                        function(err, response) {
                            console.log(response);
                            return res.send(response);
                        }
                    });
                if (vacStatus === 'Approved') {
                    NotifyByEmail(vacancy.partner.email, 'GOOD NEWS regarding a vacancy you posted!',
                        "Admin has approved your vacancy request and it members can apply for it now,"
                        + " please don't try to edit it as long as it is approved"
                        + `\n go to link: http://localhost:3000/api/vacancy/Post/${vacId}`)
                }
            }
            else
                return res.send("This vacancy is already opened and you are not allowed to change its status")
        })
    }
    else if (userType == 'Partner') {
        Vacancy.findById(vacId).exec(function (err, vacancy) {
            if (vacancy.status == 'Open' && vacancy.partner == partnerid)
                Vacancy.findByIdAndUpdate(vacId, { status: vacStatus },
                    function (err, response) {
                        console.log(response);
                        return res.send(response);
                    });
            else
                return res.send("You are not allowed to change the status of this vacancy")
        })
    }

});

//get all vacancies
router.get('/:id/GetAllVacancies', function (req, res) {
    var userid = req.params.id;
    Member.findById(userid).exec(function (err, memberDoc) {
        if (memberDoc) {
            Vacancy.find({ status: 'Open' }).exec(function (err, vacancy) {
                if (err)
                    return res.send("Error")
                else
                    return res.send(vacancy);
            });
        }
    })

    Partner.findById(userid).exec(function (err, partnerDoc) {
        if (partnerDoc) {
            Vacancy.find({ partner: userid, status: 'Submitted' }).exec(function (err, Submittedvacancy) {
                if (err)
                    return res.send("Error")

                Vacancy.find({ status: 'Open' }).exec(function (err, Openvacancy) {
                    if (err)
                        return res.send("Error")

                    Vacancy.find({ status: 'Closed' }).exec(function (err, Closedvacancy) {
                        if (err)
                            return res.send("Error")

                        return res.send([...Submittedvacancy, ...Openvacancy, ...Closedvacancy])

                    });


                });
            });



        }
    })

    Admin.findById(userid).exec(function (err, adminDoc) {
        if (adminDoc) {
            Vacancy.find({ status: 'Submitted' }, 'url name eventDate description postDate').exec(function (err, Submittedvacancies) {
                if (err)
                    return res.send("Error")

                Vacancy.find({ status: 'Open' }).exec(function (err, Openvacancies) {
                    if (err)
                        return res.send("Error")

                    return res.send([...Submittedvacancies, ...Openvacancies])
                });
            });
        }
    })


});

/// story 19 : As a Partner, I can view All My Pending(yet not approved) Vacancy Announcement Request
router.get('/:id/PartnerPendingVacancies', function (req, res) {
    var userType = req.get('userType')
    var userid = req.params.id
    if (userType == 'Partner') {
        Vacancy.find({ partner: userid, status: 'Submitted' }).exec(function (err, vacancy) {
            return res.send(vacancy);
        });
    }
    else {
        return res.status(404).send('not found');
    }
});

////////////// Story 22.1 : A partner can view his vacancy
router.get('/:id/', function (req, res) {  //showing non approved vacancy to be updated and checking if its pending
    var userType = req.get('userType');  //should come from session
    var userId = req.get('id');      //should come from session
    var vacId = req.params.id;

    Vacancy.findById(vacId, 'duration location description salary dailyHours partner status').exec(function (err, vacancy) {
        if (userType === 'Partner' && userId == vacancy.partner && vacancy.status === 'Submitted') {
            return res.send(vacancy);
        }
        else {
            return res.send("It's either not your own vacancy to update or its not pending anymore to be edited");
        }
    })
})

////////////// Story 22.2 : A partner can update his vacancy
router.put('/:id/', function (req, res) {  //submitting edited vacancy
    var vacId = req.params.id;
    var duration = req.body.duration;
    var location = req.body.location;
    var description = req.body.description;
    var salary = req.body.salary;
    var dailyhours = req.body.dailyHours;

    Vacancy.findById(vacId).exec(function (err, vacancy) {

        if (err) {
            return res.send(err);
        }
        console.log(vacancy.status)
        console.log(vacId)

        if (vacancy.status == 'Submitted') {

            vacancy.duration = duration;
            vacancy.location = location;
            vacancy.description = description;
            vacancy.salary = salary;
            vacancy.dailyhours = dailyHours;
            console.log(duration)
            vacancy.save();
            return res.send(vacancy);
        }

        else {
            return res.send('Vacancy cannot be edited after being approved');
        }

    })
});

//As a member I can withdraw my application from a vacancy
//that I previously applied to
router.put('/:id/un-apply', function (req, res) {
    var vacancyID = req.params.id;
    var userID = req.body.userID;
    var userType = req.body.userType;
    if (userType === 'Member') {
        Vacancy.findById(vacancyID).exec(function (err, vacancy) {
            vacancy.applicants.pull(userID);
            vacancy.save();
        });
        res.send("Application withdrawn");
    }
});

router.put('/:id/hireMember', function (req, res) {
    var vacancyID = req.params.id;
    var memberID = req.body.memberID;
    var userType = req.body.userType;
    var userID = req.body.userID;
    if (userType === 'Partner') {
        Vacancy.findById(vacancyID).exec(function (err, vacancy) {
            if (vacancy.partner == userID) {
                //must remove him from applicants so when the post re-renders it doesnt add him again
                vacancy.applicants.pull(memberID);
                vacancy.hired.push(memberID);
                vacancy.save();
                res.send('Done');
            }
            else
                res.status(400).send('This vacancy does not belong to you');
        });
    }
})

router.get('/:id/hired', function (req, res) {
    var vacID = req.params.id;
    Vacancy.findById(vacID, 'hired')
        .populate('hired', 'fname lname ProfileURL')
        .exec(function (err, vacancy) {
            if (err) res.status(400).send('Error vacancy not found');
            res.send(vacancy.hired);
        })
});

module.exports = router;