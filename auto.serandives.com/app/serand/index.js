var page = require('page');

var listeners = [];

var layout;

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
    event(ch, e).forEach(function (fn) {
        fn(data);
    });
};

/**
 *   page('/vehicles', 'three-column-left', fn);
 */

//TODO: register only with existing layouts
module.exports.page = function (path, lt, fn) {
    return page(path, function (ctx, next) {
        if (lt && ctx.layout.name !== lt) {
            next();
            return;
        }
        fn(ctx, next);
    });
};

module.exports.init = function () {
    page();
};

module.exports.layout = function (paths, name, layout) {
    paths = paths instanceof Array ? paths : [paths];
    paths.forEach(function (path) {
        page(path, function (ctx, next) {
            layout.name = name;
            layout.el = layout.el.appendTo('#content');
            console.log(layout);
            ctx.layout = layout;
            next();
        });
    });
};