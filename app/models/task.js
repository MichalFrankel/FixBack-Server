const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Schedualed: Date,
    FixNow:{
    type: Boolean,
    default:false},
    Resturant: { type:[mongoose.Schema.Types.ObjectId],
        ref: 'resturant'},
    Type: {
        type: String,
        enum: ['AC','Electrician','Big Appliances','General']
    },
    OpenedBy:{ 
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'UserSchema'
    },
    AssignedTech:{
        type:[mongoose.Schema.Types.ObjectId],//TODO: validate only technicians 
        ref: 'UserSchema'
    },
    Urgency: { type:String,
        enum:['High','Medium','Low']
    },
    StatusTech: { type:String,
        enum: ['Opened','Closed']
    },

    StatusManager:{type:String,
        enum:['To do','Awaits','Booked','In progress','Closed']
    },

    
}, {
});

module.exports = mongoose.model('task', TaskSchema);