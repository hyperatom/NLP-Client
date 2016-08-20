'use strict';

import * as phraseTags from '../constants/phraseTags';

var defaultState = {
    composerHtml: '',
    sentenceTrees: [],
    isAnalysing: false,
    activePhraseTag: phraseTags.NOUN_PHRASE,
    isNounPhraseChecked: true,
    isAdjectivesChecked: false,
    isAdverbsChecked: false,
    isVerbsChecked: false,
    isSubordinateClauseChecked: false,
    isPrepositionalPhraseChecked: false,
    isMainClauseChecked: false,
    isMissingFullStop: false,
    isMissingCapitalLetter: false
};

export default function(state = defaultState, action) {

    switch (action.type) {

        case 'IS_MISSING_FULL_STOP_CHANGED':

            return Object.assign({}, state, {
                isMissingFullStop: action.isMissingFullStop
            });

        case 'IS_MISSING_CAPITAL_LETTER_CHANGED':

            return Object.assign({}, state, {
                isMissingCapitalLetter: action.isMissingCapitalLetter
            });

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
                isPrepositionalPhraseChecked: false,
                isMainClauseChecked: false,
                isAdjectivesChecked: false,
                isAdverbsChecked: false,
                isVerbsChecked: false
            });

        case 'SUBORDINATE_CLAUSE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.SUBORDINATE_CLAUSE,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: true,
                isPrepositionalPhraseChecked: false,
                isMainClauseChecked: false,
                isAdjectivesChecked: false,
                isAdverbsChecked: false,
                isVerbsChecked: false
            });

        case 'PREPOSITIONAL_PHRASE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.PREPOSITIONAL_PHRASE,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: false,
                isPrepositionalPhraseChecked: true,
                isMainClauseChecked: false,
                isAdjectivesChecked: false,
                isAdverbsChecked: false,
                isVerbsChecked: false
            });

        case 'MAIN_CLAUSE_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.MAIN_CLAUSE,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: false,
                isPrepositionalPhraseChecked: false,
                isMainClauseChecked: true,
                isAdjectivesChecked: false,
                isAdverbsChecked: false,
                isVerbsChecked: false
            });

        case 'ADVERBS_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.ADVERB,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: false,
                isPrepositionalPhraseChecked: false,
                isMainClauseChecked: false,
                isAdjectivesChecked: false,
                isAdverbsChecked: true,
                isVerbsChecked: false
            });

        case 'ADJECTIVES_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.ADJECTIVE,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: false,
                isPrepositionalPhraseChecked: false,
                isMainClauseChecked: false,
                isAdjectivesChecked: true,
                isAdverbsChecked: false,
                isVerbsChecked: false
            });

        case 'VERBS_CHECKED':

            return Object.assign({}, state, {
                activePhraseTag: phraseTags.VERB,
                isNounPhraseChecked: false,
                isSubordinateClauseChecked: false,
                isPrepositionalPhraseChecked: false,
                isMainClauseChecked: false,
                isAdjectivesChecked: false,
                isAdverbsChecked: false,
                isVerbsChecked: true
            });

        default:
            return state;
    }
};