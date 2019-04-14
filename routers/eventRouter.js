
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Event = require('../models/eventModel');
const Member = require('../models/memberModel')
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const schemas = require('../models/Schemas/schemas');
const bodyParser = require('body-parser');
const NotifyByEmail = require('../services/NotifyByEmail');


router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({ extended: true })) //handle url encoded data


// Story 3, 4: creating events	
router.post(`/:id/CreateEvent`, function (req, res) {
	var userType = req.body.userType; //should come from session
	var userId = req.params.id;    //should come from session
	var description = req.body.description;
	var name = req.body.name;
	var price = req.body.price;
	var location = req.body.location;
	var city = req.body.city;
	var eventDate = req.body.date;
	var remainingPlaces = req.body.places;
	var eventType = req.body.eventtype;
	var speakers = req.body.speakers;
	var topics = req.body.topics;

	const result = Joi.validate(req.body, schemas.eventSchema)
	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	if (userType == 'Admin') {
		var event = new Event({
			name: name,
			description: description,
			price: price,
			location: location,
			city: city,
			eventDate: eventDate,
			eventStatus: 'Approved',
			remainingPlaces: remainingPlaces,
			eventType: eventType,
			speakers: speakers,
			topics: topics
		});
		event.url = '/api/event/Post' + event._id
		event.save(function (err, eve) {
			if (err) throw err;
			console.log(eve);
		})
		Admin.findById(userId).exec(function (err, admin) {
			console.log(admin.event);
			admin.events.push(event._id)
			admin.save();
		});
		return res.send('created event for admin successfully');
	}
	else if (userType == 'Partner') {
		var event = new Event({
			name: name,
			description: description,
			price: price,
			location: location,
			eventDate: eventDate,
			eventStatus: 'Submitted',
			remainingPlaces: remainingPlaces,
			eventType: eventType,
			speakers: speakers,
			topics: topics,
			partner: userId
		});

		event.url = '/api/event/Post' + event._id
		event.save(function (err, eve) {
			if (err) throw err;
			console.log(eve);
		})
		Partner.findById(userId).exec(function (err, partner) {
			console.log(partner.event);
			partner.events.push(event._id)
			partner.save();
		});

		return res.send('created event for partner successfully');
	}
});

//15
router.get('/:id/comment', function (req, res) {
	var userType = req.body.userType; //should come from session
	var eveId = req.params.id;
	if (userType == 'Admin' || userType == 'Partner') { //only partners and admins can access events' comments section
		Event.findById(eveId).populate('author').exec(function (err, event) {
			if (err) console.log(err);
			var Allcomments = event.commentsByAdmin.concat(event.commentsByPartner); // putting all comments in one object
			res.send(Allcomments);
		})
	}
})

// Story 18 : viewing pending event requests as admin
router.get('/PendingEventsAdmin', function (req, res) {
	var usertype = req.get('userType');
	if (usertype == 'Admin') {
		Event.find({ eventStatus: 'Submitted' }, 'url name eventDate eventStatus').exec(function (err, event) {
			if (err) { return res.send(err); }
			else { return res.send(event); }
		})
	}
	else {
		return res.send('This Information is not accessible!');
	}
});

// Story 14 : viewing approved events as admin/partner/member
router.get('/ApprovedEvents', function (req, res) {
	Event.find({ eventStatus: 'Approved' }, 'url name eventDate eventStatus').exec(function (err, events) {
		if (err) {
			return console.log(err);
		}
		return res.send(events);
	})
})

/// story 20 : As a Partner, I can view All My Pending(yet not approved) Event Requests. (READ)
router.get('/:id/PartnerPendingEvents', function (req, res) {
	var userType = req.get('userType');
	var userid = req.params.id
	if (userType == 'Partner') {
		Event.find({ partner: userid, eventStatus: 'Submitted' }, 'url name eventDate description').exec(function (err, event) {
			if (err) return res.send(err)
			return res.send(event);
		});
	}
});

// Story 22.1 : viewing recommended events as a member (sprint 2)
router.get('/RecommendedEvents', function (req, res) {
	var userId = req.get('userId');
	var memberPastEventsTypes = [];
	var recommendedEvents = [];
	Member.findById(userId, 'url name eventDate address interests events')
		.populate('events')
		.exec((err, member) => {
			if (!member) return res.status(400).send("member not found");
			if (err) console.log(err); // getting recommended events
			member.events.map((event) => {
				memberPastEventsTypes.push(event.eventType);
			})
			Event.find({ 'eventStatus': 'Approved' }, 'name eventType city description eventDate url')
				.exec((err, events) => {
					if (err) console.log(err);
					for (event of events) {
						if ((event.city) && (member.address.includes(event.city))) {
							recommendedEvents.push(event);
						}
						else if (member.interests.includes(event.eventType)) {
							recommendedEvents.push(event);
						}
						else if (memberPastEventsTypes.includes(event.eventType)) {
							recommendedEvents.push(event);
						}
					}
					return res.send(recommendedEvents);
				})
		})
})

router.delete('/:evid/deleteEvent', function (req, res) {
	var userType = req.body.userType;
	var evId = req.params.evid;
	var userId = req.body.userid;

	if (userType == 'Partner') {
		Event.findById(evId)
			.exec(function (err, event) {
				if (event.status == 'Submitted' && event.partner == userId) {
					Event.findByIdAndRemove(event, function (err, result) {
						if (err) {
							console.log(err);
							handleError(err);
						}
						event.save();
					});
				}

			});
	}
	return res.send("deleted event successfully");
});

// Story 21.2 display an event post for partner/admin/member
router.get('/Post/:id', function (req, res) {
	var eveId = req.params.id;
	Event.findById(eveId, '-_id').populate('partner', 'name').populate('attendees', 'fname lname').exec(
		function (err, response) {
			if (err) return res.send("event not found");
			return res.send(response);
		});
});

// As a partner i can re-allow more members to book tickets to my event 
router.put('/:id/reOpenMyEvent', (req,res,next)=>{
	let userType = req.body.userType; //should come from session
	let userId = req.body.userId; //should come from session
	let eventId = req.params.id;
		Event.findById(eventId).exec((err, event) => {
			if (err) return res.send("something wrong");
			if (!event) {
				console.log('event not found')
				res.status(404).send("event not found");
				return next();
			}
			if (event.partner && event.partner == userId) {
				if(event.eventStatus === 'Finished' && (Date.parse(event.eventDate) - Date.now()) > 0) {
					event.eventStatus = 'Approved';
					event.save((err)=>{
						if(err) console.log(err);
						return res.status(201).send('opened')
					});
				}else{
					return res.status(403).send("event is either not closed or expired ")
				}
			}
			else {
				if (!event.partner && event.admin && event.admin == userId) {
					if (event.eventStatus === 'Finished' && (Date.parse(event.eventDate) - Date.now()) > 0) {
						event.eventStatus = 'Approved';
						event.save((err) => {
							if (err) console.log(err);
							return res.status(201).send('opened')
						});
					} else {
						return res.status(403).send("event is either not closed or expired ")
					}
				} else {
					return res.status(401).send('event not yours')
				}
			}
		});
})

// As a partner i can disallow more members to book tickets to my event 
router.put('/:id/closeMyEvent', (req, res, next) => {
	let userType = req.body.userType; //should come from session
	let userId = req.body.userId; //should come from session
	let eventId = req.params.id;
		Event.findById(eventId).exec((err, event) => {
			if (err) return res.send("something wrong");
			if (!event) {
				console.log('event not found')
				res.status(404).send("event not found");
				return next();
			}
			if (userType==="Partner" && event.partner && event.partner == userId) {
				if(event.eventStatus === 'Approved' ) {
					event.eventStatus = 'Finished';
					event.save((err)=>{
						if(err) console.log(err);
						return res.status(201).send('closed')
					});
				}
				else{
					return res.status(403).send("event is either closed or not approved yet ")
				}
			}
			else {
				if (!event.partner && event.admin && event.admin == userId) {
					if (event.eventStatus === 'Approved') {
						event.eventStatus = 'Finished';
						event.save((err) => {
							if (err) console.log(err);
							return res.status(201).send('closed')
						});
					} else {
						return res.status(403).send("event is either closed or not approved yet ")
					}
				}
				else {
					return res.status(401).send('event not yours')
				}
			}
		});
	
})

//user story 21: As a partner I can update my pending events
//Date, Location, Description, Price, Type, Topics, Speakers, Number of Attendees, Remaining Places.
router.put('/:id', async (req, res) => {
	var userType = req.body.userType; //should come from session
	var userID = req.body.userID; //should come from session
	var eventID = req.params.id;
	var date; var location; var desc; var price; var type; var topics; var speakers; var attendees; var remPlaces;
	if (userType == 'Partner') {     //partner updating HIS event
		if (req.body.date) {
			date = req.body.date;
		}
		if (req.body.location) {
			location = req.body.location;
		}
		if (req.body.description) {
			desc = req.body.description;
		}
		if (req.body.price) {
			price = req.body.price
		}
		if (req.body.type) {
			type = req.body.eventType;
		}
		if (req.body.topics) {
			topics = req.body.topics
		}
		if (req.body.speakers) {
			speakers = req.body.speakers;
		}
		if (req.body.attendees) {
			attendees = req.body.attendees;
		}
		if (req.body.remainingPlaces) {
			remPlaces = req.body.remainingPlaces;
		}
		await Event.findById(eventID).exec(function (err, event) {
			if (event.partner._id == userID && event.eventStatus == 'Submitted') {
				if (date) {
					event.date = date;
				}
				if (location) {
					event.location = location;
				}
				if (desc) {
					event.description = desc;
				}
				if (price) {
					event.price = price;
				}
				if (type) {
					event.type = type;
				}
				if (topics) {
					event.topics = topics;
				}
				if (speakers) {
					event.speakers = speakers;
				}
				if (attendees) {
					event.attendees = attendees;
				}
				if (remPlaces) {
					event.remainingPlaces = remPlaces;
				}
				res.send(event);
				console.log("Updated event successfully");
				event.save();
			}
			//else res.send("Event was already approved so you can't update it");
		});
	}
	else
		return res.status(400).send({ error: 'Cannot edit this event as it is NOT yours' });
});

router.post('/:id/comment', function (req, res) {
	var userType = req.body.userType;
	var userId = req.body.userId;
	var comment = req.body.comment;
	var evId = req.params.id;
	if (userType == 'Admin') {
		Event.findById(evId).populate('partner') //notifying partner
			.exec(async (err, event) => {
				event.commentsByAdmin.push({
					text: comment,
					author: userId
				});
				if (event.partner) {
					event.partner.notifications.push({
						srcURL: '/api/event/Post' + evId,
						description: 'Partner commented on your event request'
					});
					NotifyByEmail(event.partner.email, 'New comment on event that you added before',
					`Admin commented on your event request \n go to link: http://localhost:3000/api/event/Post/${evId}`)
				}
				await event.save();
				return res.status(201).send(event.commentsByAdmin);
			});
	} else if (userType == 'Partner') {
		Event.findById(evId).populate('admin')
			.exec(async (err, event) => {
				event.commentsByPartner.push({
					text: comment,
					author: userId
				});
				if (event.admin) {
					event.admin.notifications.push({
						srcURL: '/api/event/Post' + evId,
						description: 'Partner commented on your event request'
					});
					NotifyByEmail(event.admin.email, 'New comment on event that you follow',
					`Partner commented on your event request \n go to link: http://localhost:3000/api/event/Post/${evId}`)
				}
				await event.save();
				return res.status(201).send(event.commentsByPartner);
			});
	}
});

//As a member I can mark myself as going to an event
router.put('/:id/attending', function(req, res){
    var eventID = req.params.id;
    var userID = req.body.userID;
    var userType = req.body.userType;
    if(userType === 'Member'){
        Event.findById(eventID).exec(function (err, event){
            event.attendees.push(userID);
            event.remainingPlaces = event.remainingPlaces - 1;
            event.save();
        });
        res.send("Marked you as attending");
    }
});

//As a member I can mark myself as not going to an event that I 
//previously marked myself as going to
router.put('/:id/notAttending', function(req, res){
    var eventID = req.params.id;
    var userID = req.body.userID;
    var userType = req.body.userType;
    if(userType === 'Member'){
        Event.findById(eventID).exec(function (err, event){
            event.attendees.pull(userID);
            event.remainingPlaces = event.remainingPlaces + 1;
            event.save();
        });
        res.send("Marked you as not-attending");
    }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))
module.exports = router;
