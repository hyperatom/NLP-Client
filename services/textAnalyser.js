'use strict';

import Http  from './http';

export default {

    analyse(text) {

        var data = {
            q: text
        };

        Http.get('http://localhost:8990', data)
            .then(function(response) {
                console.log(response.data.document.sentences.sentence);
            });
    }
}