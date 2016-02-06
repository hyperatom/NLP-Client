'use strict';

import React        from 'react';
import TextAnalysis from '../text-analysis/TextAnalysis';
import TextComposer from '../TextComposer';
import style        from './style';

import textTagger   from '../../services/textTagger';

import { connect } from 'react-redux';

import _ from 'underscore';

var mapStateToProps = function(state) {

    return state;
};

var debouncedAnalysis = _.debounce(function(dispatch, composerHtml) {

    if (composerHtml) {

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

                    thunkDispatch({
                        type: 'TEXT_TAGGED',
                        composerHtml: taggedMarkup
                    });
                });
        });
    }

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

                <TextComposer composerHtml={ this.props.composerHtml }
                              textChanged={ this.props.textChanged }
                              disabled={ this.props.isAnalysing } />

            </article>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);