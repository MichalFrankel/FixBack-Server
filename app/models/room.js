const mongoose = require('mongoose');
var Device= require('./device.js');
const RoomSchema = mongoose.Schema({
    name: {
        type:String,
        require:true,
    },
    device:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'device'
    },
});

module.exports = mongoose.model('room', RoomSchema);