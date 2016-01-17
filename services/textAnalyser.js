'use strict';

import Http from './http';

var partOfSpeech = {
    SINGULAR_NOUN:        'NN',
    PLURAL_NOUN:          'NNS',
    SINGULAR_PROPER_NOUN: 'NNP',
    PLURAL_PROPER_NOUN:   'NNPS'
};

function getFirstSentence(textAnalysis) {

    var sentence = textAnalysis.data.document.sentences.sentence;

    if (sentence.length > 1) {

        return sentence[0];
    }

    return sentence;
}

function getSentenceTree(sentenceAnalysis) {

    return sentenceAnalysis.parsedTree.children[0];
}

function getWordsOfType(tree, type) {

    var children = [];

    if (!tree.children) {

        if (tree.type === type) {

            children.push(tree);
        }

    } else {

        for (var i = 0; i < tree.children.length; i++) {

            children = children.concat(getWordsOfType(tree.children[i], type));
        }
    }

    return children;
}

function getPartOfSpeech(sentenceTree, type, index) {

    var words = getWordsOfType(sentenceTree, type);

    if (words && words.length > index) {

        return words[index];
    }

    return '';
}

function getFirstOccurringNounType(nounTypes) {

    var firstNoun = {};

    for (var noun in nounTypes) {

        if (nounTypes.hasOwnProperty(noun) && nounTypes[noun]) {

            if (!firstNoun.id) {

                firstNoun = nounTypes[noun];

            } else if (nounTypes[noun].id < firstNoun.id) {

                firstNoun = nounTypes[noun];
            }
        }
    }

    return firstNoun;
}

function getFirstNounOfAllTypes(sentenceTree) {

    return {
        singular:       getPartOfSpeech(sentenceTree, partOfSpeech.SINGULAR_NOUN, 0),
        plural:         getPartOfSpeech(sentenceTree, partOfSpeech.PLURAL_NOUN, 0),
        singularProper: getPartOfSpeech(sentenceTree, partOfSpeech.SINGULAR_PROPER_NOUN, 0),
        pluralProper:   getPartOfSpeech(sentenceTree, partOfSpeech.PLURAL_PROPER_NOUN, 0)
    };
}

function getFirstNoun(sentenceTree) {

    var firstNouns = getFirstNounOfAllTypes(sentenceTree),
        firstNoun  = getFirstOccurringNounType(firstNouns);

    return firstNoun.word || '';
}

function getFirstVerb(sentenceTree) {

    return getPartOfSpeech(sentenceTree, 'VBD', 0).word;
}

function getSecondNoun(sentenceTree) {

    return getPartOfSpeech(sentenceTree, 'NN', 1).word;
}

export default {

    analyse(text) {

        var data = {
            q: text
        };

        return Http.get('http://localhost:8990', data);
    },

    extractSubjectActionObject(textAnalysis) {

        var sentenceTree = getSentenceTree(getFirstSentence(textAnalysis));

        return {
            subject: getFirstNoun(sentenceTree),
            action: getFirstVerb(sentenceTree),
            object: getSecondNoun(sentenceTree)
        }
    }
}