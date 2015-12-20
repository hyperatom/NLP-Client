'use strict';

var q = require('q');

function createRequest() {

    if (window.XMLHttpRequest) {

        return new XMLHttpRequest();

    } else {

        return new ActiveXObject('Microsoft.XMLHTTP');
    }
}

function mapRequestToResponse(request) {

    return {
        status: request.status,
        data: JSON.parse(request.response)
    };
}

module.exports = {

    get: function(endpoint) {

        var request = createRequest(),
            defer   = q.defer();

        request.onreadystatechange = function() {

            if (request.readyState == XMLHttpRequest.DONE) {

                var response = mapRequestToResponse(request);

                if (request.status == 200) {

                    defer.resolve(response);

                } else {

                    defer.reject(response);
                }
            }
        };

        request.open('GET', endpoint, true);
        request.send();

        return defer.promise;
    }
};