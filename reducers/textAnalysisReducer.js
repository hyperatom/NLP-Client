'use strict';

var defaultState = {
    searchText: '',
    isAnalysing: false,
    hasAnalysed: false,
    subject: null,
    action: null,
    object: null
};

export default function(state = defaultState, action) {

    switch (action.type) {

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
                searchText: action.text
            });

        case 'ANALYSE_TEXT':

            return Object.assign({}, state, {
                isAnalysing: true
            });

        default:
            return state;
    }
};