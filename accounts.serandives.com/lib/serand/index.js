
var page = require('page');

var listeners = [];

var event = function (channel, event) {
    channel = listeners[channel] || (listeners[channel] = {});
    return channel[event] || (channel[event] = []);
};

/**
 * Registers an event listner for the specified channel
 * @param ch channel name
 * @param e event name
 * @param fn event callback
 */
module.exports.on = function (ch, e, fn) {
    event(ch, e).push(fn);
};

/**
 * Emits the specified event on the specified channel
 * @param ch channel name
 * @param e event name
 * @param data event data
 */
module.exports.emit = function (ch, e, data) {
    event(ch, e).forEach(function(fn) {
        fn(data);
    });
};

module.exports.page = function(path, fn) {
    return page(path, fn);
};

module.exports.init = function() {
    page();
};

