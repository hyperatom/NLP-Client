'use strict';

import React from 'react';

import TextComposer  from '../TextComposer';
import AnalysisModes from '../AnalysisModes';

import style from './style';

import textTagger      from '../../services/textTagger';
import phraseAnnotator from '../../services/phraseAnnotator';
import grammarChecker  from '../../services/grammarChecker';
import textExtractor   from '../../services/textExtractor';

import { connect } from 'react-redux';

import _ from 'underscore';

var analyseOnTextChanged = _.debounce(tagHtml, 1000);
var analyseOnModeChanged = _.debounce(tagHtml, 500);

function tagHtml(dispatch) {

    dispatch({
        type: 'ANALYSING_TEXT',
        isAnalysing: true
    });

    dispatch((thunkDispatch, getState) => {

        var activePhraseTags = getState().activePhraseTags;

        textTagger.tag(getState().composerHtml, activePhraseTags)
            .then((tagResult) => {

                thunkDispatch({
                    type: 'ANALYSING_TEXT',
                    isAnalysing: false
                });

                setTimeout(() => { phraseAnnotator.showAnnotations(activePhraseTags) }, 0);

                thunkDispatch({
                    type: 'TEXT_TAGGED',
                    composerHtml: tagResult.taggedMarkup,
                    sentenceTrees: tagResult.sentenceStructures
                });

                textTagger.showAllTags();

                var rawText = textExtractor.extractTextFromMarkup(tagResult.taggedMarkup);

                if (grammarChecker.isTextMissingCapitalLetter(rawText)) {

                    thunkDispatch({
                        type: 'IS_MISSING_CAPITAL_LETTER_CHANGED',
                        isMissingCapitalLetter: true
                    });
                }

                if (grammarChecker.isTextMissingFullStop(rawText)) {

                    thunkDispatch({
                        type: 'IS_MISSING_FULL_STOP_CHANGED',
                        isMissingFullStop: true
                    });
                }
            });
    });
}

function hideTagsAndAnnotations(dispatch) {

    textTagger.hideAllTags();
    phraseAnnotator.hideAllAnnotations();

    dispatch({
        type: 'IS_MISSING_FULL_STOP_CHANGED',
        isMissingFullStop: false
    });

    dispatch({
        type: 'IS_MISSING_CAPITAL_LETTER_CHANGED',
        isMissingCapitalLetter: false
    });
}

class SearchPanel extends React.Component {

    componentDidMount() {

        window.addEventListener('keydown', function (e) {

            if (e.code === 'Backspace' &&
                !e.target.getAttribute('contenteditable')) {

                e.preventDefault();
            }

        }, false);
    }

    getFullStopWarning() {

        if (this.props.isMissingFullStop) {

            return (
                <div style={ style.correctionTip }>

                    <i className="fa fa-exclamation-circle warning"></i>

                        <span style={ style.correctionTipText }>
                            Remember to add a full stop at the end of each sentence.
                        </span>

                </div>
            );
        }
    }

    getCapitalLetterWarning() {

        if (this.props.isMissingCapitalLetter) {

            return (
                <div style={ style.correctionTip }>

                    <i className="fa fa-exclamation-circle warning"></i>

                        <span style={ style.correctionTipText }>
                            Remember to begin sentences with a capital letter.
                        </span>

                </div>
            );
        }
    }

    getCorrectionPanel() {

        if (this.props.isMissingCapitalLetter || this.props.isMissingFullStop) {

            return (
                <div style={ style.correctionPanel }>

                    { this.getCapitalLetterWarning() }

                    { this.getFullStopWarning() }

                </div>
            );
        }
    }

    render() {

        return (

            <div>

                <header style={ style.header }>

                    <div style={ style.headerContent }>

                        <i className="fa fa-pencil-square header-icon"></i>
                        <h1 style={ style.headerTitle }>Grammar Finder</h1>
                        <span style={ style.headerVersion }>v1.0</span>

                    </div>

                </header>

                <article style={ style.section }>

                    <AnalysisModes isNounPhraseChecked={ this.props.isNounPhraseChecked }
                                   nounPhraseChecked={ this.props.nounPhraseChecked }
                                   isSubordinateClauseChecked={ this.props.isSubordinateClauseChecked }
                                   subordinateClauseChecked={ this.props.subordinateClauseChecked }
                                   isMainClauseChecked={ this.props.isMainClauseChecked }
                                   mainClauseChecked={ this.props.mainClauseChecked }
                                   isPrepositionalPhraseChecked={ this.props.isPrepositionalPhraseChecked }
                                   prepositionalPhraseChecked={ this.props.prepositionalPhraseChecked }
                                   isAdverbsChecked={ this.props.isAdverbsChecked }
                                   adverbsChecked={ this.props.adverbsChecked }
                                   isVerbsChecked={ this.props.isVerbsChecked }
                                   verbsChecked={ this.props.verbsChecked }
                                   isAdjectivesChecked={ this.props.isAdjectivesChecked }
                                   adjectivesChecked={ this.props.adjectivesChecked }/>

                    { this.getCorrectionPanel() }

                    <TextComposer composerHtml={ this.props.composerHtml }
                                  textChanged={ this.props.textChanged }
                                  disabled={ this.props.isAnalysing } />

                </article>

            </div>
        )
    }
}

function mapStateToProps(state) {

    return state;
}

function mapDispatchToProps(dispatch) {

    return {

        textChanged(composerHtml) {

            dispatch({
                type: 'TEXT_CHANGED',
                composerHtml: composerHtml
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnTextChanged(dispatch);
        },

        adjectivesChecked() {

            dispatch({
                type: 'ADJECTIVES_CHECKED'
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnModeChanged(dispatch);
        },

        verbsChecked() {

            dispatch({
                type: 'VERBS_CHECKED'
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnModeChanged(dispatch);
        },

        adverbsChecked() {

            dispatch({
                type: 'ADVERBS_CHECKED'
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnModeChanged(dispatch);
        },

        nounPhraseChecked() {

            dispatch({
                type: 'NOUN_PHRASE_CHECKED'
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnModeChanged(dispatch);
        },

        subordinateClauseChecked() {

            dispatch({
                type: 'SUBORDINATE_CLAUSE_CHECKED'
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnModeChanged(dispatch);
        },

        prepositionalPhraseChecked() {

            dispatch({
                type: 'PREPOSITIONAL_PHRASE_CHECKED'
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnModeChanged(dispatch);
        },

        mainClauseChecked() {

            dispatch({
                type: 'MAIN_CLAUSE_CHECKED'
            });

            hideTagsAndAnnotations(dispatch);

            analyseOnModeChanged(dispatch);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);