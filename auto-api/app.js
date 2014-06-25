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

    app.use('/apis/v', require('user-service'));
    app.use('/apis/v', require('client-service'));
    app.use('/apis/v', require('vehicle-service'));
    app.use('/apis/v', require('location-service'));
    app.use('/apis/v', require('token-service'));

    //app.use('/', require('./sites/auto/lib/boot'));
    //app.use(require('pages'));

    var fs = require('fs');

    //app.use(express.bodyParser());
    app.use(express.json());
    app.use(express.urlencoded());

    /*app.user(function apis(err, req, res, next) {
        if ('test' != env) console.error(err.stack);
        var accept = req.headers.accept || '';
        next(err);
    });*/

    app.listen(4000);
    console.log('listening on port 4000');
});
/*

http://accounts.serandives.com/apis/users

http://autos.serandives.com/apis/v/vehicles

/apis/v/users

/apis/user/v/users

/apis/users/v1

*/
