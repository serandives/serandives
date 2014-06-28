var utils = require('utils');
var User = require('user');
var Token = require('token');
var mongutil = require('mongutil');
var sanitizer = require('./sanitizer');

var client = '123456';

var express = require('express');
var app = module.exports = express();

app.use(express.json());

var paging = {
    start: 0,
    count: 10,
    sort: ''
};

var fields = {
    '*': true
};

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
/*app.post('/user/login', function (req, res) {
 User.findOne({
 email: req.body.email
 }).exec(function (err, user) {
 if (err) {
 res.send(500, {
 error: err
 });
 return;
 }
 if (!user) {
 res.send(404, {
 error: 'specified user cannot be found'
 });
 return;
 }
 user.auth(req.body.password, function (err, auth) {
 res.send({
 error: err,
 auth: auth
 });
 });
 });
 });*/


/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/users', function (req, res) {
    User.create(req.body, function (err, user) {
        if (err) {
            res.send(400, {
                error: 'error while adding new user'
            });
            return;
        }
        res.send({
            error: false
        });
    });
});

/**
 * /users/51bfd3bd5a51f1722d000001
 */
app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    if (!mongutil.objectId(id)) {
        res.send(404, {
            error: 'specified user cannot be found'
        });
        return;
    }
    if (id != req.token.user) {
        res.send(401, {
            error: 'unauthorized access for user'
        });
        return;
    }
    User.findOne({
        _id: id
    }).exec(function (err, user) {
        if (err) {
            res.send(500, {
                error: err
            });
            return;
        }
        if (!user) {
            res.send(404, {
                error: 'specified user cannot be found'
            });
            return;
        }
        var name;
        var opts = [];
        for (name in user.addresses) {
            if (user.addresses.hasOwnProperty(name)) {
                opts.push({
                    model: 'Location',
                    path: 'addresses.' + name + '.location'
                });
            }
        }
        User.populate(user, opts, function (err, user) {
            if (err) {
                res.send(400, {
                    error: err
                });
                return;
            }
            res.send(user);
        });
    });
});

/**
 * /users/51bfd3bd5a51f1722d000001
 */
app.post('/users/:id', function (req, res) {
    if (!mongutil.objectId(req.params.id)) {
        res.send(404, {
            error: 'specified user cannot be found'
        });
        return;
    }
    User.update({
        _id: req.params.id
    }, req.body, function (err, user) {
        if (err) {
            res.send(500, {
                error: err
            });
            return;
        }
        //TODO: handle 404 case
        res.send({
            error: false
        });
    });
});

/**
 * /users?data={}
 */
app.get('/users', function (req, res) {
    var data = req.query.data ? JSON.parse(req.query.data) : {};
    sanitizer.clean(data.criteria || (data.criteria = {}));
    utils.merge(data.paging || (data.paging = {}), paging);
    utils.merge(data.fields || (data.fields = {}), fields);
    User.find(data.criteria)
        .skip(data.paging.start)
        .limit(data.paging.count)
        .sort(data.paging.sort)
        .exec(function (err, users) {
            if (err) {
                res.send(500, {
                    error: err
                });
                return;
            }
            res.send(users);
        });
});
