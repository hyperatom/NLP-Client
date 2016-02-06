
import q from 'q';

import textAnalyser from './textAnalyser';

export default {

    _createContainerElem(markup) {

        var divElem = document.createElement('div');

        divElem.innerHTML = markup;

        return divElem;
    },

    _extractMarkupText(elem) {

        return elem.textContent;
    },

    tag(markup) {

        var defer = q.defer();

        var elem = this._createContainerElem(markup);

        textAnalyser.analyse(this._extractMarkupText(elem))
            .then((analysedText) => {

                console.log(analysedText);

                var newMarkup = '<p>' + markup + '</p>';

                defer.resolve(newMarkup);
            });

        return defer.promise;
    }
}