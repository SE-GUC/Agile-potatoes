
var express = require('express');
var router = express.Router();
const Event = require('../models/eventModel');
const Member = require('../models/memberModel')
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const bodyParser = require('body-parser');

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
			console.log(Admin.event);
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

		event.url = '/api/event/' + event._id
		event.save(function (err, eve) {
			if (err) throw err;
			console.log(eve);
		})
		Partner.findById(userId).exec(function (err, partner) {
			console.log(Partner.event);
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
	var usertype = req.body.usertype
	if (usertype == 'Admin') {
		Event.find({ eventStatus: 'Submitted' }, 'url name eventDate').exec(function (err, event) {
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
	Event.find({ eventStatus: 'Approved' }, 'url name eventDate').exec(function (err, events) {
		if (err) {
			return console.log(err);
		}
		return res.send(events);
	})
})

/// story 20 : As a Partner, I can view All My Pending(yet not approved) Event Requests. (READ)
router.get('/:id/PartnerPendingEvents', function (req, res) {
	var userType = req.body.userType
	var userid = req.params.id
	if (userType == 'Partner') {
		Event.find({ partner: userid, eventStatus: 'Submitted' }, 'url name eventDate').exec(function (err, event) {
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
			Event.find({ 'eventStatus': 'Approved' },'name eventType city description eventDate url')
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
	Event.findById(eveId, '-_id').populate('partner').populate('attendees').exec(
		function (err, response) {
			if (err) return res.send("event not found");
			return res.send(response);
		});
});

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
		Event.findById(evId)
			.exec(function (err, event) {
				event.commentsByAdmin.push({
					text: comment,
					author: userId
				});
				event.save();
			});
		Event.findById(evId).populate('partner') //notifying partner
			.exec(function (err, event) {
				event.partner.notifications.push({
					srcURL: '/api/event/' + evId,
					description: 'admin commented on your event request'
				});
				event.admin.save();
			})
	}
	else if (userType == 'Partner') {
		Event.findById(evId)
			.exec(function (err, event) {
				console.log(event.commentsByPartner);
				event.commentsByPartner.push({
					text: comment,
					author: userId
				});
				event.save();
			});
		Event.findById(evId).populate('admin') //notifying admin
			.exec(function (err, event) {
				event.admin.notifications.push({
					srcURL: '/api/event/' + evId,
					description: 'Partner commented on your event request'
				});
				event.admin.save();
			})
	}
	return res.send("updated");
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))
module.exports = router;
