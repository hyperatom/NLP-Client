'use strict';

var defaultState = {
    composerHtml: '',
    isAnalysing: false,
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
                isNounPhraseChecked: true,
                isSubordinateClauseChecked: false
            });

        case 'SUBORDINATE_CLAUSE_CHECKED':

            return Object.assign({}, state, {
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: true
            });

        default:
            return state;
    }
};