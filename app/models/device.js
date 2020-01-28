const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    name: {
        type: String,
        require:true,
    },
    GTIN:{
    type: String,
    require:true,
    }
});

module.exports = mongoose.model('device', DeviceSchema);