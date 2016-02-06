'use strict';

import Http from './http';
import _    from 'underscore';

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

function getAllNouns(sentenceTree) {

    var words = [];

    words = words.concat(
        getWordsOfType(sentenceTree, partOfSpeech.SINGULAR_NOUN),
        getWordsOfType(sentenceTree, partOfSpeech.PLURAL_NOUN),
        getWordsOfType(sentenceTree, partOfSpeech.SINGULAR_PROPER_NOUN),
        getWordsOfType(sentenceTree, partOfSpeech.PLURAL_PROPER_NOUN)
    );

    return _.sortBy(words, function(word) {
        return word.id;
    });
}

function getFirstNoun(sentenceTree) {

    var allNouns = getAllNouns(sentenceTree);

    return allNouns[0].word || '';
}

function getFirstVerb(sentenceTree) {

    return getPartOfSpeech(sentenceTree, 'VBD', 0).word;
}

function getSecondNoun(sentenceTree) {

    var allNouns = getAllNouns(sentenceTree);

    return allNouns[1].word || '';
}

export default {

    analyse(text) {

        var data = {
            q: text
        };

        return Http.get('http://nlp.adambarrell.co.uk:8990', data);
    }
}