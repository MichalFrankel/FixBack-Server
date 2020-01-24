const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    Name: String,
    GTIN: String,
});

module.exports = mongoose.model('device', DeviceSchema);