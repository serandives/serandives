var express = require('express');
var app = module.exports = express();
var http = require('http');

app.use(express.json());
app.use(express.urlencoded());

var data = [
    {
        name: 'New Home',
        line1: '95/4/1',
        line2: 'Mahalwarawa',
        city: 'Pannipitiya',
        state: 'Western',
        phone: '+94775493444'
    },
    {
        name: 'Old Home',
        line1: 'Isuru',
        line2: 'Muruthawela Road, Galahitiya',
        city: 'Walasmulla',
        state: 'Southern',
        phone: '+94775493444'
    }
];


app.get('/apis/locations', function (req, res) {
    data.reverse();
    res.send(data);
});

app.get('/apis/locations/:id', function (req, res) {
    res.send(data[req.params.id]);
});