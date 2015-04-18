(function () {
    'use strict';

    var request = require('request');

    function CouchDbLogger (request) {

        this.log = function (event, callback) {
            request(
                {
                    method: 'POST',
                    uri: '/_design/main/_rewrite/new',
                    json: true,
                    body: event
                },
                function (err, res, obj) {
                    callback(
                        err || (res.statusCode >= 400 ?
                                new Error('Http #' + res.statusCode) :
                                null),
                        obj
                    );
                }
            );
        };

    }

    module.exports = CouchDbLogger;

    CouchDbLogger.simple = function (opts) {
        opts = opts || {};

        return new CouchDbLogger(request.defaults({
            baseUrl: [
                opts.secure ? 'https:/' : 'http:/',
                opts.host || '127.0.0.1:' + (opts.port || '5984'),
                opts.dbname || 'logger-application'
            ].join('/')
        }));
    }
}());
