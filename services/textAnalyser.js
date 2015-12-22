'use strict';

import Http  from './http';

function extractSentenceAnalysis(response) {

    return response.data.document.sentences.sentence;
}

export default {

    analyse(text) {

        var data = {
            q: text
        };

        return Http.get('http://localhost:8990', data)
            .then(extractSentenceAnalysis);
    }
}