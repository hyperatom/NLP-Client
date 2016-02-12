
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

    _getStartPositionMarkup(positions) {

        return '';
    },

    _applyTags(text, positions, className) {

        var _this = this, j = 0;

        return text.replace(/\w+/g, function(s) {

            if (_this._isStartingPosition(positions, j)) {

                j++;

                return '<span class="' + className + '">' + s;
            }

            if (_this._isEndingPosition(positions, j)) {

                j++;

                return s + '</span>';
            }

            j++;

            return s;
        });
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