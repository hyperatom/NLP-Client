'use strict';

import TextAnalyzer from '../services/textAnalyser';

var defaultState = {
    searchText: ''
};

export default function(state = defaultState, action) {

    switch (action.type) {

        case 'ANALYSE_TEXT_SUCCESS':

            return state;

        case 'TEXT_CHANGED':

            return Object.assign({}, state, {
                searchText: action.text
            });

        case 'ANALYSE_TEXT':

            TextAnalyzer.analyse(state.searchText)
                .then(function(data) {

                    console.log('data', data);
                });

            return state;

        default:
            return state;
    }
};