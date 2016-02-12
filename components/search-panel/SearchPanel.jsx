'use strict';

import React        from 'react';
import TextAnalysis from '../text-analysis/TextAnalysis';

import TextComposer  from '../TextComposer';
import AnalysisModes from '../AnalysisModes';

import style from './style';

import textTagger   from '../../services/textTagger';

import { connect } from 'react-redux';

import _ from 'underscore';

var mapStateToProps = function(state) {

    return state;
};

var debouncedAnalysis = _.debounce(function(dispatch, composerHtml) {

    dispatch({
        type: 'ANALYSING_TEXT',
        isAnalysing: true
    });

    dispatch((thunkDispatch) => {

        textTagger.tag(composerHtml)
            .then((taggedMarkup) => {

                dispatch({
                    type: 'ANALYSING_TEXT',
                    isAnalysing: false
                });

                var taggedPhrases = document.getElementsByClassName('np');

                setTimeout(() => {

                    _.each(taggedPhrases, (taggedPhrase) => {

                        var span = document.createElement('span');

                        span.innerHTML = 'NOUN PHRASE';

                        span.style.position = 'absolute';
                        span.style.top = 0;
                        span.style.left = 0;

                        var elemRect = taggedPhrase.getBoundingClientRect();

                        span.style.position = 'absolute';
                        span.style.top = elemRect.top + 40 + 'px';
                        span.style.left = elemRect.left + 'px';

                        document.body.appendChild(span);
                    });
                }, 0);


                thunkDispatch({
                    type: 'TEXT_TAGGED',
                    composerHtml: taggedMarkup
                });
            });
    });

}, 1000);

var mapDispatchToProps = function(dispatch) {

    return {

        textChanged(composerHtml) {

            dispatch({
                type: 'TEXT_CHANGED',
                composerHtml: composerHtml
            });


            debouncedAnalysis(dispatch, composerHtml);
        }
    };
};

class SearchPanel extends React.Component {

    render() {

        return (
            <article style={ style.section }>

                <AnalysisModes />

                <TextComposer composerHtml={ this.props.composerHtml }
                              textChanged={ this.props.textChanged }
                              disabled={ this.props.isAnalysing } />

            </article>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);