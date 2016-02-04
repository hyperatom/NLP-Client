
import q from 'q';

import textAnalyser from './textAnalyser';

export default {

    _markupToText(markup) {

        return markup.replace(/<.*>/g, '');
    },

    tag(markup) {

        var defer = q.defer();

        textAnalyser.analyse('testing')
            .then(() => {

                var newMarkup = '<p>' + markup + '</p>';

                defer.resolve(newMarkup);
            });

        return defer.promise;
    }
}