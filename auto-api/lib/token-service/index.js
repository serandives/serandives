var utils = require('utils');
var Client = require('client');
var Token = require('token');
var Code = require('code');
var async = require('async');
var sanitizer = require('./sanitizer');

var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

/**
 * grant_type=authorization_code&code=AUTH_CODE_HERE&redirect_uri=REDIRECT_URI&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
 */
app.post('/token', function (req, res) {
    Code.findOne({
        value: req.params.code
    }).populate('user client').exec(function (err, code) {
            if (err) {
                console.error(err);
                return;
            }
            if (!code) {
                console.error('code cannot be found');
                return;
            }
            Token.create({
                type: 'authorization_code',
                user: code.user,
                client: code.client
            }, function (err, token) {
                if (err) {
                    console.log(err);
                    res.send({
                        error: true
                    });
                    return;
                }
                res.send({
                    token: token.value
                });
            });
        });
});
