'use strict';

var defaultState = {
    searchText: '',
    isAnalysing: false,
    textAnalysis: {}
};

export default function(state = defaultState, action) {

    switch (action.type) {

        case 'ANALYSE_TEXT_SUCCESS':

            return Object.assign({}, state, {
                textAnalysis: action.data,
                isAnalysing: false
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