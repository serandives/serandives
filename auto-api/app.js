var mongourl = 'mongodb://localhost/test';

var express = require('express');
var app = express();

app.configure(function () {

});

var mongoose = require('mongoose');
mongoose.connect(mongourl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('connected to mongodb : ' + mongourl);

    app.use('/apis', require('user-service'));
    app.use('/apis', require('client-service'));
    app.use('/apis', require('vehicle-service'));
    app.use('/apis', require('location-service'));

    //app.use('/', require('./sites/auto/lib/boot'));
    //app.use(require('pages'));

    var fs = require('fs');

    app.use(express.bodyParser());

    app.listen(3000);
    console.log('listening on port 3000');
});
