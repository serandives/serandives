var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var CODE_LENGTH = 48;

var code = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    value:String
});

code.pre('save', function (next) {
    var that = this;
    crypto.randomBytes(CODE_LENGTH, function (err, buf) {
        if (err) {
            console.error(err);
            next(err);
            return;
        }
        that.value = buf.toString('hex');
        next();
    });
});

module.exports = mongoose.model('Code', code);