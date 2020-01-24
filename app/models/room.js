const mongoose = require('mongoose');
var device= require('./device.js');
const RoomSchema = mongoose.Schema({
    Name: String,
    Device:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'device'
    },
});

module.exports = mongoose.model('room', RoomSchema);