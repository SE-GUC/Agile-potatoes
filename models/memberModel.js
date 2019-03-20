const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true, unique:true},
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    address:{type:String,lowercase:true, required:true},
    notifications: [{
        seen:{type:Boolean, default:false},
        srcURL:String,
        description:String
    }],
    membershipExpiryDate:Date,
    availability:{
        type:Boolean,
        default:true
    },
    skills: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    masterClasses: [String],
    certificates: [String],
    membershipState:{
        type: String,
        trim: true,
        enum:['Pending','Active','Expired'],
        default:'Pending'
    },
    ProfileURL:{
        type: String,
        trim: true  
    },
    interests: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    events: [{
        type: mongoose.ObjectId,
        ref: 'Event'
   }],
    projects:[{type:String}],
    tasks: [{type: String}], 
    vacancies:[{
        type: mongoose.ObjectId,
        ref: 'Vacancy'
    }],  
    reviews: [{
        text: String,
        date: {
            type: Date,
            default: Date.now
        },
        partner: {
            type: mongoose.ObjectId,
            ref: 'Partner'
        }
    }]
});

module.exports = mongoose.model('Member', MemberSchema);

