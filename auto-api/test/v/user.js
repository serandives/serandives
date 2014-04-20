var assert = require("assert");
var utils = require('./../utils');

var v = function (path) {
    return '/apis/v' + path;
};

describe('users', function () {

    var email = 'ruchira@serandives.com';
    var uid;

    before(function (done) {
        utils.clear('user', function (err) {
            done();
        });
    });


    it('create', function (done) {
        utils.request(v('/users'), 'POST', {
            email: email,
            firstname: 'Ruchira',
            lastname: 'Wageesha'
        }, function (err, headers, data) {
            assert.equal(false, data.error);
            done();
        })
    });

    it('list', function (done) {
        utils.request(v('/users'), 'GET', null, function (err, headers, data) {
            assert.equal();
            done();
        });
    });

    it('search', function (done) {
        utils.request(v('/users'), 'GET', {
            criteria: {
                email: email
            }
        }, function (err, headers, data) {
            uid = data[0].id;
            assert.equal(email, data[0].email);
            done();
        });
    });

    it('get', function (done) {
        utils.request(v('/users/' + uid), 'GET', null, function (err, headers, data) {
            assert.equal(uid, data.id);
            assert.equal(email, data.email);
            done();
        });
    });

    it('update', function (done) {
        utils.request(v('/users/' + uid), 'POST', {
            lastname: 'Manikku Badu'
        }, function (err, headers, data) {
            assert.equal(false, data.error);
            done();
        });
    });

    it('update check', function (done) {
        utils.request(v('/users/' + uid), 'GET', null, function (err, headers, data) {
            assert.equal(uid, data.id);
            assert.equal(email, data.email);
            assert.equal('Manikku Badu', data.lastname);
            done();
        });
    });
});