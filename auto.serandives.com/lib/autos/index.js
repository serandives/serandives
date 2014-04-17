var express = require('express');
var app = module.exports = express();
var http = require('http');

app.use(express.json());
app.use(express.urlencoded());

var data = [
    {
        title: 'Insight1',
        thumbnail: '/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        title: 'Insight2',
        thumbnail: '/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        title: 'Insight3',
        thumbnail: '/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        title: 'Insight1',
        thumbnail: '/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        title: 'Insight2',
        thumbnail: '/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        title: 'Insight3',
        thumbnail: '/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    }
];


app.get('/apis/vehicles', function (req, res) {
    data.reverse();
    res.send(data);
});

app.get('/apis/vehicles/:id', function (req, res) {
    res.send(data[req.params.id]);
});