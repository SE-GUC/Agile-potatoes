const Event = require('../models/eventModel');
const Partner = require('../models/partnerModel');
const Admin = require('../models/adminModel');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

	router.use(bodyParser.json()); //parsing out json out of the http request body
	router.use(bodyParser.urlencoded({extended: true})) //handle url encoded data
	
	//15
	router.get('/:id/comment', function (req,res) {
		var userType = req.body.userType; //should come from session
		var userId = req.body.userId;    //should come from session
		var eveId = req.params.id;
		 if (userType == 'Admin' || userType == 'Partner'){ //only partners and admins can access events' comments section
	
			 Event.findById(eveId)
			  .exec(function(err,event){
				 event.commentsByPartner.populate('author');
				 event.commentsByAdmin.populate('author');
				 var Allcomments = event.commentsByAdmin.concat(event.commentsByPartner); // putting all comments in one object
				 res.send(Allcomments);
			  })
		 }
		})	
	
// Strory 3, 4: creating events	
router.post('/CreateEvent', function (req,res) {
	    var userType = req.body.userType; //should come from session
	    var userId = req.body.id;    //should come from session
	
	    var description = req.body.description;
	    var price = req.body.price;
	    var location = req.body.location;
	    var eventDate = req.body.date;
	    var remainingPlaces = req.body.places;
	    var eventType = req.body.eventType;
	    var speakers = req.body.speakers;
	    var topics = req.body.topics;
	    if (userType == 'Admin'){
	        
	        
	        var event = new Event({
	            description: description,
	                price: price,
	                location: location,
	                eventDate: eventDate,
	                eventStatus:'Approved', 
	                remainingPlaces: remainingPlaces,
	                eventType:eventType,
	                speakers: speakers,
	                topics: topics
	        });
		event.url;  '/api/event/'+event._id ;
	        event.save(function(err,eve)
	        {
	            if(err) throw err;
	            console.log(eve);
		})
		Admin.findById(userId).exec(function(err,admin){
	            console.log(Admin.event);
	            admin.events.push(event._id)
				admin.save();
	        });
			
	    } 
	    else if (userType == 'Partner') {
	        
	        
	        var event = new Event({
	            description: description,
	                price: price,
	                location: location,
	                eventDate: eventDate,
	                eventStatus:'Submitted',
	                remainingPlaces: remainingPlaces,
	                eventType:eventType,
	                speakers: speakers,
	                topics: topics
	        });
		event.url;  '/api/event/'+event._id ;
	        event.save(function(err,eve)
	        {
	            if(err) throw err;
	            console.log(eve);
	        })
		Partner.findById(userId).exec(function(err,partner){
	            console.log(Partner.event);
				partner.events.push(event._id)
				partner.save();
	        });	
	
	    }
	    return res.send("created event successfully");
	});
	

// Story 18 : viewing pending event requests as admin
	router.get('/PendingEvents', function (req, res) {
	    var usertype = req.body.usertype
	   if(usertype == 'Admin')
	    {
	        Event.find({eventStatus: 'Submitted'},function(err,response)
	        {
              return res.send(response);
	            console.log(response);
	        });
	    }
	    else
	    {
	        return res.send('This Information is not accessible!');
		}
});


// Story 14 : viewing approved events as admin/partner/member
router.get('/ApprovedEvents', function (req, res) {

	Event.find({'eventStatus.type': 'Approved'} ,function(err,events){
		if(err)
	    {
		    return console.log(err) ;
	    }
	  return res.send(events) ;
    })
})


//user story 21: As a partner I can update my pending events
router.put('/:id', async (req, res) => {
	var userType = 'Partner' //should come from session
	var userID = '5c7945fe1c9d440000ec7811' //should come from session
	var creatorID = '5c7945fe1c9d440000ec7811'; //should come from event itself
	var id = req.params.id;
	if (userType == 'Partner' && creatorID == userID) {     //partner updating HIS event
		var values = req.body;
		await Event.update({ _id: id }, values);
		res.json({ msg: 'Event updated successfully' });
	}
	else
		return res.status(400).send({ error: 'Cannot edit this event as it is NOT yours' });
});

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended: true})) 

router.post('/:id/comment', function (req,res) {
    var userType = req.body.userType; 
    var userId = req.body.userId;   
    var comment = req.body.comment;
    var evId = req.params.id;
    if (userType == 'Admin'){
        Event.findById(evId)
            .exec(function (err, event) {
                event.commentsByAdmin.push({
                    text: comment,
                    author: userId
                });
                event.save(); 
            });
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
    }
    return res.send("updated");
});
module.exports = router;
