
import q from 'q';
import _ from 'underscore';

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

    _isStartingPosition(positions, wordIndex) {

        for (var i = 0; i < positions.length; i++) {

            if (positions[i].start === wordIndex) {

                return true;
            }
        }

        return false;
    },

    _isEndingPosition(positions, wordIndex) {

        for (var i = 0; i < positions.length; i++) {

            if (positions[i].end === wordIndex) {

                return true;
            }
        }

        return false;
    },

    _applyTags(text, positions, className) {

        var _this      = this,
            taggedText = '';

        var sentences = text.split(/(?=[.])/);

        _.each(sentences, (sentence, index) => {

            var j = 0;

            var newText = sentence.replace(/\w+/g, function(s) {

                if (_this._isStartingPosition(positions[index], j)) {

                    j++;

                    return '<span class="' + className + '">' + s;
                }

                if (_this._isEndingPosition(positions[index], j)) {

                    j++;

                    return s + '</span>';
                }

                j++;

                return s;
            });

            taggedText = taggedText.concat(newText);
        });

        return taggedText;
    },

    tag(markup) {

        var tagger = this,
            defer  = q.defer();

        var elem    = this._createContainerElem(markup),
            rawText = this._extractMarkupText(elem);

        if (rawText) {

            textAnalyser.analyse(rawText)
                .then((analysedText) => {

                    var nounPhrasePositions = textAnalyser.extractNounPhrasePositions(analysedText);

                    var taggedMarkup = tagger._applyTags(rawText, nounPhrasePositions, 'np');

                    defer.resolve(taggedMarkup);
                });

        } else {

            defer.resolve('');
        }



        return defer.promise;
    }
}