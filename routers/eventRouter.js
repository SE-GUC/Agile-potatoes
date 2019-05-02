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
const verifyToken = require('../middleware/tokenVerifier').verifyToken;



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
	//wtf??
	// let eventDate = moment();
	// eventDate = moment(req.body.eventDate + '');
	// eventDate.day(eventDate.day() + 1)
	// var eventDate = req.body.eventDate;
	// var remainingPlaces = req.body.places;
	var eventDate = req.body.eventDate
	var remainingPlaces = req.body.remainingPlaces;
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
			eventDate: Date(eventDate),
			eventStatus: 'Approved',
			remainingPlaces: remainingPlaces,
			eventType: eventType,
			speakers: speakers,
			topics: topics,
			admin: userId
		});
		event.save(function (err, eve) {
			if (err) return res.status(400).send(err);
			else res.send('created event for admin successfully');
		})
		event.url = '/api/event/Post/' + event._id
		Admin.findById(userId).exec(function (err, admin) {
			if (err) return res.send(err);
			admin.events.push(event._id)
			admin.save();
		});
	}
	else if (userType == 'Partner') {
		var event = new Event({
			name: name,
			description: description,
			price: price,
			location: location,
			eventDate: Date(eventDate),
			eventStatus: 'Submitted',
			remainingPlaces: remainingPlaces,
			eventType: eventType,
			speakers: speakers,
			topics: topics,
			partner: userId
		});
		event.save(function (err, eve) {
			if (err) return res.send(err);
			else res.send('created event for partner successfully');
		})
		event.url = '/api/event/Post' + event._id
		Partner.findById(userId).exec(function (err, partner) {
			//console.log(partner.event);
			partner.events.push(event._id)
			partner.save();
		});
	}
	else
		return res.status(400).send('Cannot create event');
});

//15
router.get('/:id/comment', function (req, res) {
	var userType = req.get('userType'); //should come from session
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
router.get('/PendingEventsAdmin', verifyToken, function (req, res) {
	var usertype = req.userType;
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
	Event.find({ eventStatus: 'Approved' }, 'url name eventDate eventStatus description').exec(function (err, events) {
		if (err) {
			return console.log(err);
		}
		return res.send(events);
	})
})

/// story 20 : As a Partner, I can view All Event Requests.(Sorted by status)
router.get('/PartnerEvents', verifyToken, function (req, res) {
	var userType = req.userType;
	var userid = req.userId;
	if (userType == 'Partner') {
		Event.find({ partner: userid, eventStatus: 'Submitted' }, 'url name eventDate description').exec(function (err, Submittedevent) {
			if (err) return res.send(err)
			Event.find({ partner: userid, eventStatus: 'Approved' }, 'url name eventDate description').exec(function (err, Approvedevent) {
				if (err) return res.send(err)
				Event.find({ partner: userid, eventStatus: 'Closed' }, 'url name eventDate description').exec(function (err, Closedevent) {
					if (err) return res.send(err)
					Event.find({ partner: userid, eventStatus: 'Finished' }, 'url name eventDate description').exec(function (err, Finishedevent) {
						if (err) return res.send(err)
						return res.send([...Submittedevent, ...Approvedevent, ...Closedevent, ...Finishedevent])
					});
				});
			});
		});
	}
});

// Story 22.1 : viewing recommended events as a member (sprint 2)
router.get('/RecommendedEvents', verifyToken, function (req, res) {
	var userId = req.userId;
	var memberPastEventsTypes = [];
	var recommendedEvents = [];
	Member.findById(userId, 'url name eventDate address interests events')
		.populate('events')
		.exec((err, member) => {
			if (!member) {
				return res.status(404).send("member not found");
			}
			if (err) console.log(err); // getting recommended events
			member.events.map((event) => {
				memberPastEventsTypes.push(event.eventType);
			})
			Event.find({ 'eventStatus': 'Approved' }, 'name eventType city description eventDate url partner')
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

router.delete('/:evid/deleteEvent', verifyToken, function (req, res) {
	var userType = req.userType;
	var evId = req.params.evid;
	var userID = req.userId;
	console.log("I am deleting event")
	if (userType == 'Partner') {
		Event.findById(evId)
			.exec(function (err, event) {
				if (err) res.status(400).send('shit happens');
				if (event.eventStatus == 'Submitted' && event.partner == userID) {
					Event.findByIdAndRemove(evId, function (err, event1) {
						if (err) res.status(400).send('Got a database error while deleting')
						if (!event1) res.status(404).send('Cannot find event')
						console.log(event1)
						event1.save();
					}).then(res.send('Deleted successfully'));
				}

			});
	}

	// if (userType == 'Partner') {
	// 	Event.findById(evId)
	// 		.exec(function (err, event) {
	// 			if (event.status == 'Submitted' && event.partner == userId) {
	// 				Event.findByIdAndRemove(evId, function (err, result) {
	// 					if (err) res.status(400).send('Got a database error while deleting')
	// 					if(!event) res.status(404).send('Cannot find event')
	// 					event.save();
	// 				});
	// 			}

	// 		});
	// }
});

// Story 21.2 display an event post for partner/admin/member
router.get('/Post/:id', function (req, res) {
	var eveId = req.params.id;
	Event.findById(eveId).populate('partner', 'name').populate('attendees', 'fname lname').exec(
		function (err, response) {
			if (err) return res.send("event not found");
			return res.send(response);
		});
});

// As a partner i can re-allow more members to book tickets to my event 
router.put('/:id/reOpenMyEvent', verifyToken, (req, res, next) => {
	let userType = req.userType; //should come from session
	let userId = req.userId; //should come from session
	let eventId = req.params.id;
	Event.findById(eventId).exec((err, event) => {
		if (err) return res.send("something wrong");
		if (!event) {
			console.log('event not found')
			return res.status(404).send("event not found");
		}
		if (userType === "Admin" || (userType === "Partner" && event.partner && event.partner == userId)) {
			if (event.eventStatus === 'Finished' && (Date.parse(event.eventDate) - Date.now()) > 0) {
				event.eventStatus = 'Approved';
				event.save((err) => {
					if (err) console.log(err);
					return res.status(201).send('opened')
				});
			} else {
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
router.put('/:id/closeMyEvent', verifyToken, (req, res, next) => {
	let userType = req.userType; //should come from session
	let userId = req.userId; //should come from session
	let eventId = req.params.id;
	console.log(userType, userId, eventId, req);
	Event.findById(eventId).exec((err, event) => {
		if (err) return res.send("something wrong");
		if (!event) {
			console.log('event not found')
			return res.status(404).send("event not found");
		}
		if (userType === "Admin" || (userType === "Partner" && event.partner && event.partner == userId)) {
			if (event.eventStatus === 'Approved') {
				event.eventStatus = 'Finished';
				event.save((err) => {
					if (err) console.log(err);
					return res.status(201).send('closed')
				});
			}
			else {
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
router.put('/:id', verifyToken, async (req, res) => {
	var userType = req.userType; //should come from session
	var userID = req.userId; //should come from session
	var eventID = req.params.id;
	var date = req.body.date;
	var location = req.body.location;
	var description = req.body.description;
	var price = req.body.price
	var eventType = req.body.eventType;
	var topics = req.body.topics;
	var speakers = req.body.speakers;
	var remainingPlaces = req.body.remainingPlaces;
	var city = req.body.city;
	if (userType == 'Partner') {     //partner updating HIS event
		await Event.findById(eventID).exec(async function (err, event) {
			if (event.partner._id == userID && event.eventStatus == 'Submitted') {
				event.eventDate = date;
				event.location = location;
				event.description = description;
				event.price = price;
				event.eventType = eventType;
				event.topics = topics;
				event.speakers = speakers;
				event.remainingPlaces = remainingPlaces;
				event.city = city;
				await event.save();
				res.send(event);
			}
			else res.status(400).send("Event is either not yours or was already Approved so you can't edit it");
		});
	}
	else
		return res.status(400).send({ error: 'Cannot edit this event as you are not a partner' });
});

router.post('/:id/comment', verifyToken, function (req, res) {
	var userType = req.userType;
	var userId = req.userId;
	var comment = req.body.comment;
	var evId = req.params.id;
	if (userType == 'Admin') {
		Event.findById(evId).populate('partner') //notifying partner
			.exec(async (err, event) => {
				console.log('pushing into admin comment section!')
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
						`Admin commented on your event request \n go to link: http://localhost:3000/events/${evId}`)
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
						`Partner commented on your event request \n go to link: http://localhost:3000/events/${evId}`)
				}
				await event.save();
				return res.status(201).send(event.commentsByPartner);
			});
	}
});

//As a member I can mark myself as going to an event
router.put('/:id/attending', verifyToken, function (req, res) {
	var eventID = req.params.id;
	var userID = req.userId;
	var userType = req.userType;
	if (userType === 'Member') {
		Event.findById(eventID).exec(function (err, event) {
			event.attendees.push(userID);
			event.remainingPlaces = event.remainingPlaces - 1;
			event.save(function (err, done) {
				if (err) {
					res.status(400).send(err);
					console.log(err);
				}
				else res.send("Marked you as attending");
			});
		});
	}
});
//As an admin I can approve events
router.put('/:id/approve', verifyToken, function (req, res) {
	var userType = req.userType;
	var eveId = req.params.id;
	if (userType == 'Admin') {
		Event.findById(eveId).exec(function (err, event) {
			if (event.eventStatus !== 'Approved')
				Event.findByIdAndUpdate(eveId, { eventStatus: "Approved" },
					function (err, response) {
						response.save();
						return res.send("updated");
					});
			else
				return res.status(400).send("this event is already approved")
		})
	}
	else res.status(400).send("only admin can approve")
})
//As a member I can mark myself as not going to an event that I 
//previously marked myself as going to
router.put('/:id/notAttending', verifyToken, function (req, res) {
	var eventID = req.params.id;
	var userID = req.userId;
	var userType = req.userType;
	if (userType === 'Member') {
		Event.findById(eventID).exec(function (err, event) {
			event.attendees.pull(userID);
			event.remainingPlaces = event.remainingPlaces + 1;
			event.save();
		});
		res.send("Marked you as not-attending");
	}
});

//as a member i can submit feedback on an event
router.put('/:id/feedback', function (req, res) {
	var eventID = req.params.id;
	var feedback = req.body.feedback;
	var userType = req.body.userType;
	if (userType === 'Member') {
		Event.findById(eventID).exec(function (err, event) {
			if (!event) res.status(404).send('Cannot find event');
			else {
				event.feedbacks.push(feedback);
				event.save(e => {
					res.send('Feedback added successfully');
				})
			}
		})
	}
	else
		res.status(400).send('Invalid user type');
})

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))
module.exports = router;
