var utils = require('utils');
var user = require('user');
var sanitizer = require('./sanitizer');

var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/user/login', function (req, res) {
    user.authenticate(req.body, function (err) {
        if (err) {
            console.log('user login error');
            res.send({
                error: true
            });
            return;
        }
        res.send({
            error: false
        });
    });
});


/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/users', function (req, res) {
    user.create(req.body, function (err) {
        if (err) {
            //TODO: send proper HTTP code
            console.log('user create error');
            res.send({
                error: true
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
    user.findOne({
        _id: req.params.id
    })
        .populate('addresses')
        .exec(function (err, user) {
            if (err) {
                console.log('user find error');
                res.send({
                    error: true
                });
                return;
            }
            res.send(user);
        });
});

var paging = {
    start: 0,
    count: 10,
    sort: ''
};

var fields = {
    '*': true
};

/**
 * /users?data={}
 */
app.get('/users', function (req, res) {
    var data = req.query.data ? JSON.parse(req.query.data) : {};
    sanitizer.clean(data.criteria || (data.criteria = {}));
    utils.merge(data.paging || (data.paging = {}), paging);
    utils.merge(data.fields || (data.fields = {}), fields);
    user.find(data.criteria)
        .skip(data.paging.start)
        .limit(data.paging.count)
        .sort(data.paging.sort)
        .exec(function (err, users) {
            if (err) {
                //TODO: send proper HTTP code
                console.log('user find error');
                res.send({
                    error: true
                });
                return;
            }
            res.send(users);
        });
});
