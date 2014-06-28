var express = require('express');
var app = module.exports = express();
var vehicle = require('vehicle');

var version = 'v1';

var v = function(path) {
    //return path.replace(/^\/((?:[^/]+\/){1})([^/]+)\//,'/$1$2/' + version + '/');
    return path.replace('/v/', '/v1/');
};

//app.use(express.bodyParser());

/**
 * {
 *     "title": "Honda Hybrid 2012",
 *     "price": {
 *          "amount": "4000000",
 *          "currency": "LKR",
 *     },
 *     "make": {
 *          "brand": "Honda",
 *          "year": "2012"
 *     },
 *     "engine": {
 *          "capacity": "1400",
 *          "powerb": "petrol"
 *     }
 * }
 */
app.post(v('/apis/vehicle/v/add'), function (req, res) {
    vehicle.create(req.body, function (err) {
        res.send({
            error: err
        });
    });
});

/**
 * { "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d1" }
 */
app.post(v('/apis/vehicle/v/remove'), function (req, res) {
    vehicle.remove(req.body.id, function (err) {
        res.send({
            error: err
        });
    });
});

/**
 * {
 *     "id": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
 *     "title": "Honda Hybrid 2012",
 *     "price": {
 *          "amount": "4000000",
 *          "currency": "LKR",
 *     },
 *     "make": {
 *          "brand": "Honda",
 *          "year": "2012"
 *     },
 *     "engine": {
 *          "capacity": "1400",
 *          "powerb": "petrol"
 *     }
 * }
 */
//versioning ??
//auto.serandives.com/apis/v1/auto/123456
app.post(v('/apis/vehicle/v/update'), function (req, res) {
    vehicle.update(req.body, function (err) {
        res.send({
            error: err
        });
    });
});
