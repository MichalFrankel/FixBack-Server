const mongoose = require('mongoose');
var room=require('./room.js')
var tasks=require('./task.js')

const ResturantSchema = mongoose.Schema({
    Address: String,
    Rooms:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'room'
    },
});

module.exports = mongoose.model('resturant', ResturantSchema);