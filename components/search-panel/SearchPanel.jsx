'use strict';

import React        from 'react';
import SearchBox    from '../search-box/SearchBox';
import SearchButton from '../search-button/SearchButton';
import TextAnalysis from '../text-analysis/TextAnalysis';
import style        from './style';

import TextAnalyzer from '../../services/textAnalyser';

import { connect } from 'react-redux';

var mapStateToProps = function(state) {

    return {
        searchText:   state.searchText,
        isAnalysing:  state.isAnalysing,
        textAnalysis: state.textAnalysis
    };
};

var mapDispatchToProps = function(dispatch) {

    return {

        analyseText() {

            return dispatch(function(thunkDispatch, getState) {

                TextAnalyzer.analyse(getState().searchText)
                    .then((data) => {

                        return thunkDispatch({
                            type: 'ANALYSE_TEXT_SUCCESS',
                            data: data
                        });
                    });

                return thunkDispatch({
                    type: 'ANALYSE_TEXT',
                    isAnalysing: true
                });
            });
        },

        textChanged(text) {

            return dispatch({
                type: 'TEXT_CHANGED',
                text: text
            });
        }
    };
};

class SearchPanel extends React.Component {

    render() {

        return (
            <article style={ style }>

                <SearchBox onChange={ this.props.textChanged } />
                <SearchButton onClick={ this.props.analyseText }  />

                <TextAnalysis analysedText="Adam" />

            </article>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);