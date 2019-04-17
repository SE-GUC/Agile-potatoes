const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VacancySchema = new Schema({
    description: { type: String, required: true },
    duration: { type: String, required: true },
    location: String,
    city: { type: String, lowercase: true, trim: true },
    salary: Number,
    dailyHours: Number,
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Submitted', 'Open', 'Closed'],
        default: 'Submitted',
    },
    url: {
        type: String,
        trim: true
    },
    partner: {      // should be required
        required: true,
        type: mongoose.ObjectId,
        ref: 'Partner'
    },
    admin: {
        type: mongoose.ObjectId,
        ref: 'Admin'
    },
    applicants: [{
        type: mongoose.ObjectId,
        ref: 'Member'
    }],
    hired: [{
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

module.exports = mongoose.model('Vacancy', VacancySchema); //using the schema to build a model
