var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = Schema({
    email: String,
    password: String,
    token: { type: Schema.Types.ObjectId, ref: 'Token' },
    alias: String,
    firstname: String,
    lastname: String,
    birthday: Date,
    addresses: {},
    mobiles: [String],
    socials: {}
});

user.set('toJSON', {
    getters: true,
    //virtuals: false,
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret._id;
    }
});

user.methods.auth = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, res) {
        callback(err, res);
    });
};

user.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

user.virtual('id').get(function () {
    return this._id;
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

module.exports = mongoose.model('User', user);