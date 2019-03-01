const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true, unique:false},
    name: {type:String, unique: true},
    email:{type:String, required:true, unique:true},
    boardMembers:[{
        name:String,
        email:String
    }],
    notifications: [{
        seen: {type: Boolean,default: false},
        srcURL: String,
        description: String
    }],
    membershipExpiryDate:Date,
    availability:Boolean,
    workfeild:String,
    vacancies:[{
        type: mongoose.ObjectId,
        ref: 'Vacancy'
    }],
    membershipState:{
        type: String,
        trim: true,
        enum:['Pending','Active','Expired'],
        default:'Pending'
    }, 
    pastProjects:[{type:String}],
    ProfileURL:{
        type: String,
        trim: true  
    },
    events: [{
        type: mongoose.ObjectId,
        ref: 'Event'
    }],
    
    feedbacks: [{
        text: String,
        date: {
            type: Date,
            default: Date.now
        },
        member: {
            type: mongoose.ObjectId,
            ref: 'Member'
        }
    }]
});

module.exports = mongoose.model('Partner', PartnerSchema);

