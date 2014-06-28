var utils = require('utils');
var Vehicle = require('vehicle');
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
app.post('/vehicles', function (req, res) {
    Vehicle.create(req.body, function (err, vehicle) {
        if (err) {
            res.send(400, {
                error: 'error while adding new vehicle'
            });
            return;
        }
        res.send({
            error: false
        });
    });
});

/**
 * /vehicles/51bfd3bd5a51f1722d000001
 */
app.get('/vehicles/:id', function (req, res) {
    if (!mongutil.objectId(req.params.id)) {
        res.send(404, {
            error: 'specified vehicle cannot be found'
        });
        return;
    }
    Vehicle.findOne({
        _id: req.params.id
    }).exec(function (err, vehicle) {
        if (err) {
            res.send(500, {
                error: err
            });
            return;
        }
        if (!vehicle) {
            res.send(404, {
                error: 'specified vehicle cannot be found'
            });
            return;
        }
        var name;
        var opts = [];
        for (name in vehicle.addresses) {
            if (vehicle.addresses.hasOwnProperty(name)) {
                opts.push({
                    model: 'Location',
                    path: 'addresses.' + name + '.location'
                });
            }
        }
        Vehicle.populate(vehicle, opts, function (err, vehicle) {
            if (err) {
                res.send(400, {
                    error: err
                });
                return;
            }
            res.send(vehicle);
        });
    });
});

/**
 * /vehicles/51bfd3bd5a51f1722d000001
 */
app.post('/vehicles/:id', function (req, res) {
    if (!mongutil.objectId(req.params.id)) {
        res.send(404, {
            error: 'specified vehicle cannot be found'
        });
        return;
    }
    Vehicle.update({
        _id: req.params.id
    }, req.body, function (err, vehicle) {
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
 * /vehicles?data={}
 */
app.get('/vehicles', function (req, res) {
    var data = req.query.data ? JSON.parse(req.query.data) : {};
    sanitizer.clean(data.criteria || (data.criteria = {}));
    utils.merge(data.paging || (data.paging = {}), paging);
    utils.merge(data.fields || (data.fields = {}), fields);
    Vehicle.find(data.criteria)
        .skip(data.paging.start)
        .limit(data.paging.count)
        .sort(data.paging.sort)
        .exec(function (err, vehicles) {
            if (err) {
                res.send(500, {
                    error: err
                });
                return;
            }
            res.send(vehicles);
        });
});
