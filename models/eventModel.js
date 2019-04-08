const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    city: { type: String, lowercase: true },
    location: String,
    eventDate: Date,
    postDate: { type: Date, default: Date.now },
    eventStatus: {
        type: String,
        enum: ['Submitted', 'Approved', 'Finished'],
        default: 'Submitted'
    },
    remainingPlaces: Number,
    eventType: {
        type: String,
        lowercase: true,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    speakers: [String],
    topics: [String],
    feedbacks: [String],
    partner: {
        type: mongoose.ObjectId,
        ref: 'Partner'
    },
    attendees: [{
        type: mongoose.ObjectId,
        ref: 'Member'
    }],
    commentsByAdmin: [{
        text: String,
        date: {
            type: Date,
            default: Date.now
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'Admin'
        }
    }],
    commentsByPartner: [{
        text: String,
        date: {
            type: Date,
            default: Date.now
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'Partner'
        }
    }]

});

module.exports = mongoose.model('Event', EventSchema); //using the schema to build a model
