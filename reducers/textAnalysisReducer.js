'use strict';

var defaultState = {
    composerHtml: '',
    isAnalysing: false
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

        default:
            return state;
    }
};