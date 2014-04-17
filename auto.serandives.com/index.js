var express = require('express');

var proxy = require('http-proxy');

var server = new proxy.RoutingProxy();

var allowed = {
    'accounts.serandives.com': 4000
};

var app = module.exports = express();

// middleware
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    var xhost = req.header('x-host');
    if (xhost) {
        xhost = xhost.split(':');
        var host = xhost[0];
        var port = xhost.length === 2 ? xhost[1] : 80;
        if (allowed[host] != port) {
            res.send(404, 'Not Found');
            return;
        }
        console.log('proxing request to host: ' + host + ' port: ' + port);
        server.proxyRequest(req, res, {
            host: host,
            port: port
        });
        return;
    }
    next();
})
;

//dumy data
app.use(require('autos'));
app.use(require('locations'));

// mount
app.use(require('boot'));
