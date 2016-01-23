'use strict';

var defaultState = {
    composerHtml: '',
    isAnalysing: false,
    hasAnalysed: false,
    mainClause: null,
    subject: null,
    action: null,
    object: null
};

export default function(state = defaultState, action) {

    switch (action.type) {

        case 'SET_MAIN_CLAUSE':

            return Object.assign({}, state, {
                mainClause: action.mainClause,
                isAnalysing: false,
                hasAnalysed: true
            });

        case 'SET_SAO':

            return Object.assign({}, state, {
                subject: action.subject,
                action: action.action,
                object: action.object,
                isAnalysing: false,
                hasAnalysed: true
            });

        case 'TEXT_CHANGED':

            return Object.assign({}, state, {
                isAnalysing: true,
                composerHtml: action.composerHtml
            });

        default:
            return state;
    }
};