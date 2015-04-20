describe('unit test', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),

        CouchdbLogger = require('../index.js');

    it('can write to the logger using request', function (done) {
        var request = sinon.stub().yields(null, { statusCode: 201 }, {}),
            logger = new CouchdbLogger(request);

        logger.log({ message: 'Yo!' }, function () {
            sinon.assert.calledOnce(request);
            sinon.assert.calledWith(request, sinon.match.has('uri', '/_design/main/_rewrite/new'));
            done();
        });
    });

    it('checks response status code to propagate an error', function (done) {
        var request = sinon.stub().yields(null, { statusCode: 404 }, { error: 'not_found' }),
            logger = new CouchdbLogger(request);

        logger.log({ message: 'Yo!' }, function (err) {
            assert(err);
            done();
        });
    });
});
