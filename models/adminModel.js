const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    fname: String,
    lname: String,
    email:{type:String, required:true, unique:true},
    notifications: [{
        seen: {type: Boolean,default: false},
        srcURL: String,
        description: String
    }],
    ControlPageURL:{
        type: String,
        trim: true  
    },
    events: [{
        type: mongoose.ObjectId,
        ref: 'Event'
   }]
    
});

module.exports = mongoose.model('Admin', AdminSchema);
