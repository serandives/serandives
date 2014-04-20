var http = require('http');
var mongourl = 'mongodb://localhost/test';
var mongoose = require('mongoose');

mongoose.connect(mongourl);

exports.request = function (path, method, data, fn) {
    var options = {
        hostname: 'localhost',
        port: 4000,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var get = method.toUpperCase() === 'GET';

    if(get) {
        if(data) {
            options.path += '?data=' + JSON.stringify(data);
        }
    }

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('end', function() {
            fn(false, req.headers, JSON.parse(data));
        });
        res.on('data', function (chunk) {
            data += chunk;
        });
    });

    req.on('error', function (e) {
        console.log(e);
        fn(e);
    });

    // write data to request body
    //req.write('data\n');
    if(!get) {
        req.write(JSON.stringify(data));
    }
    req.end();
};

exports.clear = function(model, fn) {
    mongoose.connection.collections[require(model).collection.name].drop(fn);
};

