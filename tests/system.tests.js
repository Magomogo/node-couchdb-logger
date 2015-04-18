describe('system test', function () {
    'use strict';

    var request = require('request'),
        assert = require('assert'),

        CouchDbLogger = require('../index.js');

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

    it('can be constructed simply');
});
