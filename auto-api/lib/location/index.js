var mongoose = require('mongoose');

var location = new mongoose.Schema({
    line1: String,
    line2: String,
    city: String,
    district: String,
    province: String,
    country: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('Location', location);

