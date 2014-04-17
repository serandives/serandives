var utils = require('utils');
var Client = require('client');
var Token = require('token');
var Code = require('code');
var async = require('async');
var sanitizer = require('./sanitizer');

var express = require('express');
var app = module.exports = express();

app.use(express.bodyParser());

var paging = {
    start: 0,
    count: 10,
    sort: ''
};

var fields = {
    '*': true
};

/**
 * {"name": "serandives app"}
 */
app.post('/clients', function (req, res) {
    var data = req.body;
    data.user = '522cb77187313c454a000001';
    Client.create(req.body, function (err, client) {
        if (err) {
            console.error(err);
            res.send({
                error: true
            });
            return;
        }
        res.send(client);
    });
});

app.get('/clients/:id', function (req, res) {
    Client.findOne({
        _id: req.params.id
    })
        .exec(function (err, client) {
            if (err) {
                console.error('client find error');
                res.send({
                    error: true
                });
                return;
            }
            if (!client) {
                res.send({});
                return;
            }
            res.send(client);
        });
});


/**
 * /users?data={}
 */
app.get('/clients', function (req, res) {
    var data = req.query.data ? JSON.parse(req.query.data) : {};
    sanitizer.clean(data.criteria || (data.criteria = {}));
    utils.merge(data.paging || (data.paging = {}), paging);
    utils.merge(data.fields || (data.fields = {}), fields);
    Client.find(data.criteria)
        .skip(data.paging.start)
        .limit(data.paging.count)
        .sort(data.paging.sort)
        .exec(function (err, clients) {
            if (err) {
                //TODO: send proper HTTP code
                console.error('client find error');
                res.send({
                    error: true
                });
                return;
            }
            res.send(clients);
        });
});

app.del('/clients/:id', function (req, res) {
    Client.findOne({
        _id: req.params.id
    })
        .exec(function (err, client) {
            if (err) {
                console.error('client find error');
                res.send({
                    error: true
                });
                return;
            }
            if (!client) {
                res.send({

                });
                return;
            }
            client.remove();
            res.send({});
        });
});

