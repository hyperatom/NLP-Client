'use strict';

import * as phraseTags from '../constants/phraseTags';

var defaultState = {
    composerHtml: '',
    sentenceTrees: [],
    isAnalysing: false,
    activePhraseTag: phraseTags.NOUN_PHRASE,
    isNounPhraseChecked: true,
    isSubordinateClauseChecked: false,
    isPrepositionalPhraseChecked: false
};

export default function(state = defaultState, action) {

    switch (action.type) {

        case 'ANALYSING_TEXT':

            return Object.assign({}, state, {
                isAnalysing: action.isAnalysing
            });

        case 'TEXT_TAGGED':

            return Object.assign({}, state, {
                composerHtml: action.composerHtml,
                sentenceTrees: action.sentenceTrees
            });

        case 'TEXT_CHANGED':

            return Object.assign({}, state, {
                composerHtml: action.composerHtml
            });

        case 'NOUN_PHRASE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.NOUN_PHRASE,
                isNounPhraseChecked: true,
                isSubordinateClauseChecked: false,
                isPrepositionalPhraseChecked: false
            });

        case 'SUBORDINATE_CLAUSE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.SUBORDINATE_CLAUSE,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: true,
                isPrepositionalPhraseChecked: false
            });

        case 'PREPOSITIONAL_PHRASE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.PREPOSITIONAL_PHRASE,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: false,
                isPrepositionalPhraseChecked: true
            });

        default:
            return state;
    }
};