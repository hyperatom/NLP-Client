'use strict';

import React from 'react';

import TextComposer  from '../TextComposer';
import AnalysisModes from '../AnalysisModes';

import style from './style';

import textTagger      from '../../services/textTagger';
import phraseAnnotator from '../../services/phraseAnnotator';

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

        var activePhraseTag = getState().activePhraseTag;

        textTagger.tag(getState().composerHtml, activePhraseTag)
            .then((taggedMarkup) => {

                thunkDispatch({
                    type: 'ANALYSING_TEXT',
                    isAnalysing: false
                });

                setTimeout(() => { phraseAnnotator.showAnnotations(activePhraseTag) }, 0);

                thunkDispatch({
                    type: 'TEXT_TAGGED',
                    composerHtml: taggedMarkup
                });

                textTagger.showAllTags();
            });
    });
}

function hideTagsAndAnnotations() {

    textTagger.hideAllTags();
    phraseAnnotator.hideAllAnnotations();
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

    render() {

        return (
            <article style={ style.section }>

                <AnalysisModes isNounPhraseChecked={ this.props.isNounPhraseChecked }
                               nounPhraseChecked={ this.props.nounPhraseChecked }
                               isSubordinateClauseChecked={ this.props.isSubordinateClauseChecked }
                               subordinateClauseChecked={ this.props.subordinateClauseChecked } />

                <TextComposer composerHtml={ this.props.composerHtml }
                              textChanged={ this.props.textChanged }
                              disabled={ this.props.isAnalysing } />

            </article>
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

            hideTagsAndAnnotations();

            analyseOnTextChanged(dispatch);
        },

        nounPhraseChecked() {

            dispatch({
                type: 'NOUN_PHRASE_CHECKED'
            });

            hideTagsAndAnnotations();

            analyseOnModeChanged(dispatch);
        },

        subordinateClauseChecked() {

            dispatch({
                type: 'SUBORDINATE_CLAUSE_CHECKED'
            });

            hideTagsAndAnnotations();

            analyseOnModeChanged(dispatch);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);