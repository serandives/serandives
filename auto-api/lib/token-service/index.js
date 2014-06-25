var utils = require('utils');
var User = require('user');
var Client = require('client');
var Token = require('token');
var Code = require('code');
var async = require('async');
var sanitizer = require('./sanitizer');

var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

var su = {
    email: 'admin@serandives.com',
    password: 'ruchira'
};

var sc = 'serandives.com';

var ssc = function (user) {
    Client.create({
        name: sc,
        user: user
    }, function (err, client) {
        if (err) {
            throw err;
        }
        sc = client;
    });
};

User.findOne({
    email: su.email
}).exec(function (err, user) {
    if (err) {
        throw err;
    }
    if (user) {
        su = user;
        ssc(user);
        return;
    }
    User.create({
        email: su.email,
        password: su.password
    }, function (err, user) {
        if (err) {
            throw err;
        }
        su = user;
        ssc(user);
    });
});

/**
 * grant_type=password&username=ruchira&password=ruchira
 */
app.post('/token', function (req, res) {
    User.findOne({
        email: req.body.username
    }).populate('token').exec(function (err, user) {
        if (err) {
            res.send({
                error: err
            });
            return;
        }
        if (!user) {
            res.send({
                error: 'specified user cannot be found'
            });
            return;
        }
        user.auth(req.body.password, function (err, auth) {
            if (err) {
                res.send({
                    error: err
                });
                return;
            }
            if (!auth) {
                res.send({
                    error: false,
                    auth: false
                });
                return;
            }
            var token = user.token;
            if (token) {
                if (token.created.getTime() + token.validity > new Date().getTime()) {
                    res.send({
                        access_token: token.id,
                        expires_in: token.validity
                    });
                    return;
                }
            }
            Token.create({
                type: 'password',
                user: user.id,
                client: sc
            }, function (err, token) {
                if (err) {
                    res.send({
                        error: err
                    });
                    return;
                }
                User.update({
                    _id: user.id
                }, {
                    token: token
                }, function (err, user) {
                    if (err) {
                        res.send(404, {
                            error: err
                        });
                        return;
                    }
                    res.send({
                        access_token: token.id,
                        expires_in: token.validity
                    });
                });
            });
        });
    });
});
