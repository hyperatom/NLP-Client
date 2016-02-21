'use strict';

import React        from 'react';
import TextAnalysis from '../text-analysis/TextAnalysis';

import TextComposer  from '../TextComposer';
import AnalysisModes from '../AnalysisModes';

import style from './style';

import textTagger      from '../../services/textTagger';
import phraseAnnotator from '../../services/phraseAnnotator';

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

                setTimeout(() => { phraseAnnotator.showAnnotations('phrase--np') }, 0);

                thunkDispatch({
                    type: 'TEXT_TAGGED',
                    composerHtml: taggedMarkup
                });

                textTagger.showAllTags();
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

            textTagger.hideAllTags();
            phraseAnnotator.hideAllAnnotations();

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