var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var location = new Schema({
    line1: String,
    line2: String,
    city: String,
    district: String,
    province: String,
    country: String,
    postcode: String,
    coordinates: {
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('Location', location);

