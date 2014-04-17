var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var SECRET_LENGTH = 48;

var client = Schema({
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    secret: String
});

/*
 client.set('toJSON', {
 getters: true,
 virtuals: false,
 transform: function (doc, ret, options) {
 //delete this.secret;
 }
 });
 */

client.methods.verify = function (secret) {
    return this.secret === secret;
};

client.methods.refresh = function (cb) {
    var that = this;
    crypto.randomBytes(SECRET_LENGTH, function (err, buf) {
        if (err) {
            console.error(err);
            cb(err);
            return;
        }
        that.secret = buf.toString('hex');
        cb();
    });
};

client.pre('save', function (next) {
    this.refresh(function (err) {
        next(err);
    });
});

/*
 user.statics.find = function (options, callback) {
 if (options.email) {
 this.findOne({
 email: email
 }, callback);
 return;
 }
 callback(null);
 };*/

module.exports = mongoose.model('Client', client);