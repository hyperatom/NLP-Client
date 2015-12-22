'use strict';

import q from 'q';

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
        data: JSON.parse(request['response'])
    };
}

function urlEncode(obj) {
    
    var str = [];
    
    for (var p in obj) {
        
        if (obj.hasOwnProperty(p)) {
            
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }
    
    return str.join('&');
}

function methodRequiresParams(method) {

    return method === 'POST' || method === 'PUT';
}

function isSuccessStatusCode(statusCode) {

    return statusCode === 200 || statusCode === 201;
}

function resolvePromiseOnResponse(defered, request) {

    request.onreadystatechange = function() {

        if (request.readyState == XMLHttpRequest.DONE) {

            var response = mapRequestToResponse(request);

            if (isSuccessStatusCode(request.status)) {

                defered.resolve(response);

            } else {

                defered.reject(response);
            }
        }
    };
}

function attachHeaders(request) {

    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
}

function sendRequest() {

    var method   = arguments[0],
        endpoint = arguments[1],
        data     = arguments[2];

    var request = createRequest(),
        defer   = q.defer();

    resolvePromiseOnResponse(defer, request);

    request.open(method, endpoint, true);

    attachHeaders(request);

    if (methodRequiresParams(method)) {

        request.send(urlEncode(data));

    } else {

        request.send();
    }

    return defer.promise;
}

class Http {

    post(endpoint, data) {

        return sendRequest('POST', endpoint, data);
    }

    get(endpoint, urlParams) {

        endpoint += '?' + urlEncode(urlParams);

        return sendRequest('GET', endpoint);
    }

    put(endpoint, data) {

        return sendRequest('PUT', data);
    }

    delete(endpoint) {

        return sendRequest('DELETE', endpoint);
    }
}

export default new Http();