var utils = require('utils');
var Vehicle = require('vehicle');
var mongutil = require('mongutil');
var sanitizer = require('./sanitizer');
var util = require('util');
var knox = require('knox');
var path = require('path');
var uuid = require('node-uuid');
var formida = require('formida');

var MultiPartUpload = require('knox-mpu');

var s3Client = knox.createClient({
    secure: false,
    key: 'AKIAILCXULHWOJBVDNTA',
    secret: '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',
    bucket: 'auto.serandives.com'
});

var express = require('express');
var app = module.exports = express();

app.use(express.json());

var paging = {
    start: 0,
    count: 1000,
    sort: ''
};

var fields = {
    '*': true
};

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
/*app.post('/vehicles', function (req, res) {
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
 });*/
var clean = function (success, failed) {

};

var add = function (err, data, success, failed, res) {
    console.log('add callback');
    if (err) {
        clean(success, failed);
        res.send(400, {
            error: err
        });
        return;
    }
    var photos = [];
    success.forEach(function (suc) {
        photos.push(suc.name);
    });
    data.photos = photos;
    Vehicle.create(data, function (err, vehicle) {
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
};

/**
 * { "email": "ruchira@serandives.com", "password": "mypassword" }
 */
app.post('/vehicles', function (req, res) {
    var data;
    var success = [];
    var failed = [];
    var queue = 0;
    var next = function (err) {
        if (--queue > 0) {
            return;
        }
        add(null, data, success, failed, res);
    };
    var form = new formida.IncomingForm();
    form.on('progress', function (rec, exp) {
        console.log('received >>> ' + rec);
        console.log('expected >>> ' + exp);
    });
    form.on('field', function (name, value) {
        if (name !== 'data') {
            return;
        }
        console.log(name + ' ' + value);
        data = JSON.parse(value);
    });
    form.on('file', function (part) {
        console.log('file field');
        queue++;
        var name = uuid.v4() + path.extname(part.filename);
        var upload = new MultiPartUpload({
            client: s3Client,
            objectName: name,
            headers: {
                'Content-Type': part.headers['content-type'],
                'x-amz-acl': 'public-read'
            },
            stream: part
        });
        upload.on('initiated', function () {
            console.log('mpu initiated');
        });
        upload.on('uploading', function () {
            console.log('mpu uploading');
        });
        upload.on('uploaded', function () {
            console.log('mpu uploaded');
        });
        upload.on('error', function (err) {
            console.log('mpu error');
            failed.push({
                name: name,
                error: err
            });
            next(err);
        });
        upload.on('completed', function (body) {
            console.log('mpu complete');
            success.push({
                name: name,
                body: body
            });
            next();
        });
    });
    form.on('error', function (err) {
        console.log(err);
        add(err, data, success, failed, res);
    });
    form.on('aborted', function () {
        console.log('request was aborted');
        add(true, data, success, failed, res);
    });
    form.on('end', function () {
        console.log('form end');
    });
    form.parse(req);
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
