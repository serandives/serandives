var vehicle = require('vehicle');
var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/vehicle/create', function (req, res) {
    var data = req.body;
    var user = require('user');
    user.findOne({
        email: 'ruchira@serandives.com'
    }, function (err, user) {
        if (err) {
            console.log('vehicle create: user not found');
            res.send({
                error: true
            });
            return;
        }
        data.user = user;
        vehicle.create(data, function (err) {
            if (err) {
                console.log('vehicle create error');
                console.error(err);
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
});

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/vehicle/update', function (req, res) {
    vehicle.update(req.body, function (err) {
        if (err) {
            console.log('vehicle update error');
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
 * { "email": "ruchira@serandives.com" }
 */
app.post('/vehicle/find', function (req, res) {
    vehicle.find(req.body, function (err, vehicles) {
        if (err) {
            console.log('vehicle find error');
            res.send({
                error: true
            });
            return;
        }
        res.send(vehicles);
    });
});
