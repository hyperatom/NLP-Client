
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

    _getPhraseClass(tag) {

        return 'phrase phrase--' + tag.toLowerCase();
    },

    _applyTags(text, sentencePositions) {

        var _this      = this,
            taggedText = '';

        var sentences = text.split(/(?=[.])/);

        _.each(sentences, (sentence, index) => {

            var j = 0;

            var phraseClass = '';

            if (sentencePositions.length > 0 && sentencePositions[index] && sentencePositions[index].length > 0) {

                phraseClass = _this._getPhraseClass(sentencePositions[index][0]['tag']);
            }

            var newText = sentence.replace(/\w+/g, function(s) {

                if (_this._isStartingPosition(sentencePositions[index], j) && _this._isEndingPosition(sentencePositions[index], j)) {

                    j++;

                    return '<span class="' + phraseClass + '">' + s + '</span>';
                }

                if (_this._isStartingPosition(sentencePositions[index], j)) {

                    j++;

                    return '<span class="' + phraseClass + '">' + s;
                }

                if (_this._isEndingPosition(sentencePositions[index], j)) {

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

    tag(markup, activePhraseTags) {

        var tagger = this,
            defer  = q.defer();

        var rawText = textExtractor.extractTextFromMarkup(markup);

        if (rawText) {

            textAnalyser.analyse(rawText)
                .then((analysedText) => {

                    var sentenceStructures = tagger._extractSentenceStructuresAsStrings(analysedText);

                    var phrasePositions = [];

                    for (var i = 0; i < activePhraseTags.length; i++) {

                        // Array of arrays - L1 is sentences[], L2 is word positions[]
                        var sentencePositions = textAnalyser.extractPhrasePositions(analysedText, activePhraseTags[i]);

                        _.each(sentencePositions, function(positions, index) {

                            if (phrasePositions[index]) {

                                phrasePositions[index] = phrasePositions[index].concat(positions);

                            } else {

                                phrasePositions[index] = positions;
                            }
                        });
                    }

                    var taggedMarkup = tagger._applyTags(rawText, phrasePositions);
                    
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