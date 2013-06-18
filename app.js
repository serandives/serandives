var mongourl = 'mongodb://localhost/test';

var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(mongourl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('connected to mongodb : ' + mongourl);

    app.use('/apis', require('user-service'));
    app.use('/apis', require('vehicle-service'));

    var fs = require('fs');

    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

    app.set('views', __dirname);
    app.set('view engine', 'jade');

    app.listen(3000);
    console.log('listening on port 3000');
});
