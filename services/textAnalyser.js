'use strict';

import Http from './http';

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

function getWordOfType(sentenceTree, type, index) {

    var words = getWordsOfType(sentenceTree, type);

    if (words && words.length > index) {

        return words[index].word;
    }

    return '';
}

function getFirstNoun(sentenceTree) {

    return getWordOfType(sentenceTree, 'NN', 0);
}

function getFirstVerb(sentenceTree) {

    return getWordOfType(sentenceTree, 'VBD', 0);
}

function getSecondNoun(sentenceTree) {

    return getWordOfType(sentenceTree, 'NN', 1);
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

        console.log('sentenceTree', sentenceTree);

        return {
            subject: getFirstNoun(sentenceTree),
            action: getFirstVerb(sentenceTree),
            object: getSecondNoun(sentenceTree)
        }
    }
}