
import q from 'q';
import _ from 'underscore';

import textAnalyser  from './textAnalyser';
import textExtractor from './textExtractor';

export default {

    _extractSentenceStructuresAsStrings(textAnalysis) {

        if (textAnalysis.data.document.sentences.sentence.parse) {

            return [ textAnalysis.data.document.sentences.sentence.parse ];
        }

        return textAnalysis.data.document.sentences.sentence.map((sentence) => {
            return sentence.parse;
        })
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

                if (_this._isStartingPosition(positions[index], j) && _this._isEndingPosition(positions[index], j)) {

                    j++;

                    return '<span class="' + className + '">' + s + '</span>';
                }

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

    showAllTags() {

        document.body.className = '';
    },

    hideAllTags() {

        document.body.className = 'hide-tags';
    },

    tag(markup, activePhraseTag) {

        var tagger = this,
            defer  = q.defer();

        var rawText = textExtractor.extractTextFromMarkup(markup);

        if (rawText) {

            textAnalyser.analyse(rawText)
                .then((analysedText) => {

                    var sentenceStructures = tagger._extractSentenceStructuresAsStrings(analysedText);

                    var phrasePositions = textAnalyser.extractPhrasePositions(analysedText, activePhraseTag);

                    var taggedMarkup = tagger._applyTags(rawText, phrasePositions, 'phrase phrase--' + activePhraseTag.toLowerCase());

                    defer.resolve({
                        taggedMarkup,
                        sentenceStructures
                    });
                });

        } else {

            defer.resolve({
                taggedMarkup: '',
                sentenceStructures: []
            });
        }

        return defer.promise;
    }
}