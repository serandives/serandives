var utils = require('utils');
var location = require('location');
var sanitizer = require('./sanitizer');

var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/locations', function (req, res) {
    location.create(req.body, function (err) {
        if (err) {
            //TODO: send proper HTTP code
            console.log('location create error');
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
app.get('/locations/:id', function (req, res) {
    location.findOne({
        _id: req.params.id
    }, function (err, location) {
        if (err) {
            console.log('location find error');
            res.send({
                error: true
            });
            return;
        }
        res.send(location);
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
app.get('/locations', function (req, res) {
    var data = req.query.data ? JSON.parse(req.query.data) : {};
    sanitizer.clean(data.criteria || (data.criteria = {}));
    utils.merge(data.paging || (data.paging = {}), paging);
    utils.merge(data.fields || (data.fields = {}), fields);
    location.find(data.criteria)
        .skip(data.paging.start)
        .limit(data.paging.count)
        .sort(data.paging.sort)
        .exec(function (err, locations) {
        if (err) {
            //TODO: send proper HTTP code
            console.log('user find error');
            res.send({
                error: true
            });
            return;
        }
        res.send(locations);
    });
});
