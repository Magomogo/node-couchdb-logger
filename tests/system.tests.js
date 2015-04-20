describe('system test', function () {
    'use strict';

    var request = require('request'),
        assert = require('assert'),

        CouchDbLogger = require('../index.js');

    it('assumes couchdb logger presence', function () {
        request('http://127.0.0.1:5984/logger-application', function (err) {
            assert.ifError(err);
        });
    });

    it('can write to the logger using request', function (done) {
        var logger = new CouchDbLogger(
            request.defaults({
                baseUrl: 'http://127.0.0.1:5984/logger-application'
            })
        );

        logger.log({ message: 'Yo!', channel: 'system test' }, function (err, data) {
            assert.strictEqual(data.ok, true);
            assert.ifError(err);
            done();
        });
    });

    it('can be constructed simply', function (done) {
        var logger = CouchDbLogger.simple();

        logger.log({ message: 'Yo!', channel: 'system test' }, function (err, data) {
            assert.ifError(err);
            assert.strictEqual(data.ok, true);
            done();
        });

    });
});
