var express = require('express');
var router = express.Router();
const Event = require('../models/eventModel');
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const bodyParser = require('body-parser');

router.use(bodyParser.json()); //parsing out json out of the http request body
router.use(bodyParser.urlencoded({ extended: true })) //handle url encoded data
// story 3 : create event as admin or partner
router.post('/:id/CreateEvent', function (req, res) {
	var userType = req.body.userType; //should come from session
	var userId = req.params.id;    //should come from session
	var eventId = req.body.eventId;
	var description = req.body.description;
	var price = req.body.price;
	var location = req.body.location;
	var eventDate = req.body.date;
	var remainingPlaces = req.body.places;
	var eventType = req.body.eventtype;
	var speakers = req.body.speakers;
	var topics = req.body.topics;
	if (userType == 'Admin') {
		Admin.findById(userId).exec(function (err, admin) {
			console.log(Admin.event);
			admin.events.push(eventId)
			admin.save();
		});

		var event = new Event({
			description: description,
			price: price,
			location: location,
			eventDate: eventDate,
			eventStatus: 'Approved',
			remainingPlaces: remainingPlaces,
			eventType: eventType,
			url: '/api/event/' + eventId,
			speakers: speakers,
			topics: topics
		});
		event.save(function (err, eve) {
			if (err) throw err;
			console.log(eve);
		})

	}
	else if (userType == 'Partner') {
		Partner.findById(userId).exec(function (err, partner) {
			console.log(Partner.event);
			partner.events.push(eventID)
			partner.save();
		});

		var event = new Event({
			description: description,
			price: price,
			location: location,
			eventDate: eventDate,
			eventStatus: 'Submitted',
			remainingPlaces: remainingPlaces,
			eventType: eventType,
			url: '/api/event/' + eventId,
			speakers: speakers,
			topics: topics
		});
		event.save(function (err, eve) {
			if (err) throw err;
			console.log(eve);
		})


	}
	return res.send("created event successfully");
});

// story 18 : view pending events
router.get('/PendingEvents', function (req, res) {
	var usertype = req.body.usertype
	if (usertype == 'Admin') {
		Event.find({ eventStatus: 'Submitted' }, function (err, respomse) {
			console.log(response);
		});

	}
	else {
		return res.send('This Information is not accessible!');
	}
	return res.send("pending events loaded successfully");
});


//user story 21: As a partner I can update my pending events
router.put('/:id', async (req, res) => {
	var userType = 'Partner' //should come from session
	var userID = '5c7945fe1c9d440000ec7811' //should come from session
	var creatorID = '5c7945fe1c9d440000ec7811'; //should come from event itself
	var id = req.params.id;
	if (userType == 'Partner' && creatorID == userID) {     //partner updating HIS event
		var values = req.body;
		await Events.update({ _id: id }, values);
		res.json({ msg: 'Event updated successfully' });
	}
	else
		return res.status(400).send({ error: 'Cannot edit this event as it is NOT yours' });
});

module.exports = router;
