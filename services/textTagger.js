
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

    _applyTags(text, positions, className) {

        var i = 0, wordToReplaceIndex = 1;

        return text.replace(/\w+/g, function(s) {

            return i++ === wordToReplaceIndex ? '<span class="' + className + '">' + s + '</span>' : s;
        });
    },

    tag(markup) {

        var tagger = this;

        var defer = q.defer();

        var elem    = this._createContainerElem(markup),
            rawText = this._extractMarkupText(elem);

        textAnalyser.analyse(rawText)
            .then((analysedText) => {

                var nounPhrasePositions = textAnalyser.extractNounPhrasePositions(analysedText);

                var taggedMarkup = tagger._applyTags(rawText, nounPhrasePositions, 'np');

                defer.resolve(taggedMarkup);
            });

        return defer.promise;
    }
}