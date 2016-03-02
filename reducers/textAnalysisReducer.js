'use strict';

import * as phraseTags from '../constants/phraseTags';

var defaultState = {
    composerHtml: '',
    isAnalysing: false,
    activePhraseTag: phraseTags.NOUN_PHRASE,
    isNounPhraseChecked: true,
    isSubordinateClauseChecked: false
};

export default function(state = defaultState, action) {

    switch (action.type) {

        case 'ANALYSING_TEXT':

            return Object.assign({}, state, {
                isAnalysing: action.isAnalysing
            });

        case 'TEXT_TAGGED':

            return Object.assign({}, state, {
                composerHtml: action.composerHtml
            });

        case 'TEXT_CHANGED':

            return Object.assign({}, state, {
                composerHtml: action.composerHtml
            });

        case 'NOUN_PHRASE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.NOUN_PHRASE,
                isNounPhraseChecked: true,
                isSubordinateClauseChecked: false
            });

        case 'SUBORDINATE_CLAUSE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.SUBORDINATE_CLAUSE,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: true
            });

        default:
            return state;
    }
};