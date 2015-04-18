(function () {
    'use strict';

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

}());
