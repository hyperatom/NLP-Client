'use strict';

import React from 'react';

import TextComposer  from '../TextComposer';
import AnalysisModes from '../AnalysisModes';

import style from './style';

import textTagger      from '../../services/textTagger';
import phraseAnnotator from '../../services/phraseAnnotator';

import { connect } from 'react-redux';

import _ from 'underscore';

var debouncedAnalysis = _.debounce(function(dispatch, composerHtml) {

    dispatch({
        type: 'ANALYSING_TEXT',
        isAnalysing: true
    });

    dispatch((thunkDispatch, getState) => {

        textTagger.tag(composerHtml, getState().activePhraseTag)
            .then((taggedMarkup) => {

                dispatch({
                    type: 'ANALYSING_TEXT',
                    isAnalysing: false
                });

                setTimeout(() => { phraseAnnotator.showAnnotations('phrase--np') }, 0);

                thunkDispatch({
                    type: 'TEXT_TAGGED',
                    composerHtml: taggedMarkup
                });

                textTagger.showAllTags();
            });
    });

}, 1000);

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

    console.log('arguments', arguments);

    return {

        textChanged(composerHtml) {

            dispatch({
                type: 'TEXT_CHANGED',
                composerHtml: composerHtml
            });

            textTagger.hideAllTags();
            phraseAnnotator.hideAllAnnotations();

            debouncedAnalysis(dispatch, composerHtml);
        },

        nounPhraseChecked() {

            dispatch({
                type: 'NOUN_PHRASE_CHECKED'
            });
        },

        subordinateClauseChecked() {

            dispatch({
                type: 'SUBORDINATE_CLAUSE_CHECKED'
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);