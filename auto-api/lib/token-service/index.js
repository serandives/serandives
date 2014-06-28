var utils = require('utils');
var User = require('user');
var Client = require('client');
var Token = require('token');
var Code = require('code');
var async = require('async');
var sanitizer = require('./sanitizer');

var express = require('express');
var app = module.exports = express();

app.use(express.json());
app.use(express.urlencoded());

var MIN_TOKEN_VALIDITY = 40 * 1000;

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

var expires = function (token) {
    var exin = token.created.getTime() + token.validity - new Date().getTime();
    return exin > 0 ? exin : 0;
};

/**
 * grant_type=password&username=ruchira&password=ruchira
 */
app.post('/tokens', function (req, res) {
    if (req.body.grant_type !== 'password') {
        res.send(400, {
            error: 'unsupported grant type'
        });
        return;
    }
    User.findOne({
        email: req.body.username
    }).populate('token').exec(function (err, user) {
        if (err) {
            res.send(500, {
                error: err
            });
            return;
        }
        if (!user) {
            res.send(401, {
                error: 'user not authorized'
            });
            return;
        }
        user.auth(req.body.password, function (err, auth) {
            if (err) {
                res.send(500, {
                    error: err
                });
                return;
            }
            if (!auth) {
                res.send(401, {
                    error: 'user not authorized'
                });
                return;
            }
            var token = user.token;
            if (token) {
                if (expires(token) > MIN_TOKEN_VALIDITY) {
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
                    res.send(500, {
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
                        res.send(500, {
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
