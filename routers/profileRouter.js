const Admin = require('../models/adminModel')
const Member = require('../models/memberModel')
const Partner = require('../models/partnerModel')

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({ extended: true })) //handle url encoded data

//user story 12
router.get('/:id', function (req, res) {
    var userType = req.body.userType; //should come from session
    var userId = req.body.userId; //should come from session
    var profId = req.params.id;
    if (profId == userId) {       //user viewing his profile
        if (userType == 'Admin') {
            Admin.findById({ _id: profId }, function (err, adminDoc) {
                if (err) throw err;
                res.send(adminDoc);
            });
        }
        else if (userType == 'Partner') {
            Partner.findById({ _id: profId }, function (err, partnerDoc) {
                if (err) throw err;
                res.send(partnerDoc);
            });
        }
        else if (userType == 'Member') {
            Member.findById({ _id: profId }, function (err, memberDoc) {
                if (err) throw err;
                console.log("I am heeerrreeee");
                res.send(memberDoc);
            })
        }
    }
    else {                        //user viewing other's profile
        if (userType == 'Admin') {
            Admin.findById(profId, 'username fname lname events', function (err, adminDoc) {
                if (err) throw err;
                console.log(adminDoc);
                res.send(adminDoc);
            });
        }
        else if (userType == 'Partner') {
            Partner.findById(profId, '-username -password -notifications -membershipExpiryDate', function (err, partnerDoc) {
                if (err) throw err;
                res.send(partnerDoc);
            });
        }
        else if (userType == 'Member') {
            Member.findById(profId, '-username -password -notifications -membershipExpiryDate', function (err, memberDoc) {
                if (err) throw err;
                res.send(memberDoc);
            });
        }
    }
    return;
})


//user story 8: As a Member I can post feedback to a Partner I previously worked with
router.post('/:id/feedback', function (req, res) {
    var userType = req.body.userType; //should come from session (has to be Member)
    var userID = req.body.userID;    //should come from session (the writer of the feedback comment)
    var partnerID = req.params.id;
    var comment = req.body.comment;
    if (userType == 'Member') {
        Partner.findById(partnerID).exec(function (err, partner) {
            partner.feedbacks.push({
                text: comment,
                author: userID
            });
            partner.save();
        });
        return res.send("Feedback added");
    }
});

//user story 20: As a Partner I can update my profile (Board Members, Pending vacancies, Password, Pending events).
router.put('/:id', function (req, res) {
    var userType = req.body.userType; //should come from session
    var userID = req.body.userID; //should come from session (person logged in)
    var partnerID = req.params.id; //the ID of the partner I want to update
    if (req.body.boardMembers) {
        var members = req.body.boardMembers;
    }
    if (req.body.password) {
        var pwd = req.body.password;
    }
    if (userType == 'Partner') {
        if (partnerID == userID) {
            Partner.findById(partnerID).exec(function (err, partner) {
                if (members) {
                    console.log("yes there's members to push");
                    partner.boardMembers = members;
                }
                if (pwd) {
                    partner.password = pwd;
                }
                res.send({ msg: "updated", members, pwd });
                partner.save();
            });
        }
    }
});



router.put('/:id/name', function (req, res) {
    var userType = req.body.userType;
    var userId = req.body.userId;
    var fname = req.body.name;
    var lname = req.body.name;
    if (userType == 'Admin') {
        Admin.findByIdAndUpdate(userId, { fname: fname, lname: lname },
            function (err, response) {
                console.log(response);
            });
    }
    return res.send("Name Updated");
});


router.put('/:id/password', function (req, res) {
    var userType = req.body.userType;
    var userId = req.body.userId;
    var password = req.body.password;
    if (userType == 'Admin') {
        Admin.findByIdAndUpdate(userId, { password: password },
            function (err, response) {
                console.log(response);
            });
    }
    return res.send("Password Updated");
});

//user stories 1 & 2: creating member or partner profiles
router.post('/create', function (req, res) {
    var userType = req.body.userType;
    if (userType == 'Partner') {
        var usern = req.body.username;
        var pwd = req.body.password;
        var n = req.body.name;
        var em = req.body.email;
        var wf = req.body.workfield
        var newPartner = new Partner({
            username: usern,
            password: pwd,
            name: n,
            email: em,
            workfield: wf
        });
        newPartner.save(function (err, p) {
            if (err) throw err;
            console.log(p);
            res.send("Added a partner")
        });
    }
    if (userType == 'Member') {
        var usern = req.body.username;
        var pwd = req.body.password;
        var em = req.body.email;
        var fn = req.body.fname;
        var ln = req.body.lname;
        var add = req.body.address;
        //var skls = req.body.skills;
        //var mc = req.body.masterclasses;
        //var cert = req.body.certificates;
        var intst = req.body.interests;
        //var tsks = req.body.tasks;
        //var prjs = req.body.projects
        var newMember = new Member({
            username: usern,
            password: pwd,
            email: em,
            fname: fn,
            lname: ln,
            address: add,
            //skills: skls,
            //masterclasses: mc,
            //certificates: cert,
            interests: intst,
            //tasks: tsks,
            // projects: prjs
        });
        newMember.save(function (err, m) {
            if (err) throw err;
            console.log(m);
            res.send("Added a member");
        });
    }
});


module.exports = router;
