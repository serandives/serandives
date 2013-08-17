var mongoose = require('mongoose');

var user = mongoose.Schema({
    email: String,
    hash: String,
    salt: String,
    alias: String
});

user.set('toJSON', {
    getters: true,
    virtuals: false,
    transform: function (doc, ret, options) {
        delete ret.hash;
        delete ret.salt;
    }
});

user.methods.authenticate = function (password, callback) {
    return this.hash === password;
};

user.virtual('password').set(function (password) {
    this.hash = '######';
    this.salt = '******';
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