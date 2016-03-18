'use strict';

import Http from './http';
import _    from 'underscore';

var partOfSpeech = {
    NOUN_PHRASE:          'NP',
    SINGULAR_NOUN:        'NN',
    PLURAL_NOUN:          'NNS',
    SINGULAR_PROPER_NOUN: 'NNP',
    PLURAL_PROPER_NOUN:   'NNPS'
};

function getSentenceTrees(textAnalysis) {

    var sentence = textAnalysis.data.document.sentences.sentence;

    if (sentence.length > 1) {

        return _.map(sentence, s => s.parsedTree);
    }

    return [ sentence.parsedTree ];
}

function getNodesOfType(tree, type) {

    var nodes = [];

    if (tree.type && tree.type === type) {

        nodes.push(tree);
    }

    if (tree.children && tree.children.length > 0) {

        for (var i = 0; i < tree.children.length; i++) {

            nodes = nodes.concat(getNodesOfType(tree.children[i], type));
        }
    }

    return nodes;
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

function getFirstWord(tree) {

    if (tree.id) {

        return tree;

    } else {

        return getFirstWord(tree.children[0]);
    }
}

function getLastWord(tree) {

    if (tree.id) {

        return tree;

    } else {

        var lastIndex = tree.children.length - 1;

        return getLastWord(tree.children[lastIndex]);
    }
}

function getPhrasePositions(nodes) {

    var positions = [];

    for (var i = 0; i < nodes.length; i++) {

        positions.push({
            start: getFirstWord(nodes[i]).id - 1,
            end: getLastWord(nodes[i]).id - 1
        });
    }

    return positions;
}

export default {

    analyse(text) {

        var data = {
            q: text
        };

        return Http.get('http://nlp.adambarrell.co.uk:8990', data);
    },

    extractPhrasePositions(textAnalysis, phraseType) {

        var sentenceTrees = getSentenceTrees(textAnalysis);

        var sentencePhrasePositions = [];

        _.each(sentenceTrees, (tree) => {

            var phraseNodes     = getNodesOfType(tree, phraseType),
                phrasePositions = getPhrasePositions(phraseNodes);

            sentencePhrasePositions.push(phrasePositions);
        });

        return sentencePhrasePositions;
    }
}