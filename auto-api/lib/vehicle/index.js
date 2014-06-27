var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicle = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    time: Date,
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    contacts: [String],
    type: String,
    make: String,
    model: String,
    year: Number,
    country: String,
    fuel: String,
    width: Number,
    height: Number,
    length: Number,
    transmission: String,
    doors: Number,
    steering: String,
    seats: Number,
    driveType: String,
    features: [String],
    mileage: Number,
    condition: String,
    engine: Number,
    color: String,
    description: String,
    photos: [String],
    price: Number,
    currency: String
});

vehicle.set('toJSON', {
    getters: true,
    //virtuals: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    }
});

vehicle.virtual('id').get(function () {
    return this._id;
});

module.exports = mongoose.model('Vehicle', vehicle);