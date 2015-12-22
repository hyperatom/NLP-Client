'use strict';

import TextAnalyzer from '../services/textAnalyser';

export default function(state, action) {

    if (typeof state === 'undefined') {

        return {
            searchText: ''
        };
    }

    switch (action.type) {

        case 'TEXT_CHANGED':

            return Object.assign({}, state, {
                searchText: action.text
            });

        case 'ANALYSE_TEXT':

            TextAnalyzer.analyse(state.searchText);

            return state;

        default:
            return state;
    }
};