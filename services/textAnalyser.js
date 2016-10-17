'use strict';

import Http from './http';
import _    from 'underscore';

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

function removeGrammarNodesFromTree(tree, phraseType) {

    if (tree.children && tree.children.length > 0) {

        for (var i = 0; i < tree.children.length; i++) {

            if (tree.children[i].type === phraseType) {

                var commaIndex = tree.children.indexOf(tree.children[i]);

                if (commaIndex > -1) {

                    tree.children.splice(commaIndex, 1);
                }

            } else {

                removeGrammarNodesFromTree(tree.children[i], phraseType);
            }
        }
    }
}

function removeGrammarNodesFromTrees(trees, phraseType) {

    _.each(trees, (tree) => {

        removeGrammarNodesFromTree(tree, phraseType);
    });

    return trees;
}

var treeIndexCounter = 0;

function reindexSentenceTree(tree) {

    if (tree.id) {

        tree.id = treeIndexCounter + 1;

        treeIndexCounter = tree.id;
    }

    if (tree.children && tree.children.length > 0) {

        for (var i = 0; i < tree.children.length; i++) {

            reindexSentenceTree(tree.children[i]);
        }
    }

    return tree;
}

function reindexSentenceTrees(trees) {

    _.each(trees, (tree) => {

        treeIndexCounter = 0;

        reindexSentenceTree(tree);
    });

    return trees;
}

export default {

    analyse(text) {

        var data = {
            q: text
        };

        return Http.get('http://nlp.adambarrell.co.uk/api', data);
    },

    extractPhrasePositions(textAnalysis, phraseType) {

        var sentenceTrees       = getSentenceTrees(textAnalysis),
            prunedSentenceTrees = reindexSentenceTrees(removeGrammarNodesFromTrees(sentenceTrees, ','));

        var sentencePhrasePositions = [];

        _.each(prunedSentenceTrees, (tree) => {

            var phraseNodes     = getNodesOfType(tree, phraseType),
                phrasePositions = getPhrasePositions(phraseNodes);

            _.each(phrasePositions, function(position) {

                position.tag = phraseType
            });

            sentencePhrasePositions.push(phrasePositions);
        });

        return sentencePhrasePositions;
    }
}