var express = require('express');
var app = module.exports = express();
var http = require('http');

app.use(express.json());
app.use(express.urlencoded());

var data = [
    {
        id: 0,
        title: 'Insight1',
        thumbnail: '/public/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        id: 1,
        title: 'Insight2',
        thumbnail: '/public/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        id: 2,
        title: 'Insight3',
        thumbnail: '/public/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        id: 3,
        title: 'Insight1',
        thumbnail: '/public/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        id: 4,
        title: 'Insight2',
        thumbnail: '/public/images/prius.jpeg',
        make: 'Toyota',
        model: 'Prius',
        year: 2013,
        price: '4400000LKR',
        color: 'Metallic Black'
    },
    {
        id: 5,
        title: 'Insight3',
        thumbnail: '/public/images/prius.jpeg',
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