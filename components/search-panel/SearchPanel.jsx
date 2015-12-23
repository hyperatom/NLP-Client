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
        subject:      state.subject,
        action:       state.action,
        object:       state.object
    };
};

var mapDispatchToProps = function(dispatch) {

    return {

        analyseText() {

            return dispatch((thunkDispatch, getState) => {

                TextAnalyzer.analyse(getState().searchText)
                    .then((data) => {

                        var sao = TextAnalyzer.extractSubjectActionObject(data);

                        return thunkDispatch({
                            type: 'SET_SAO',
                            subject: sao.subject,
                            action: sao.action,
                            object: sao.object
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
            <article style={ style.section }>

                <h1 style={ style.sectionTitle }>
                    Subject Action Object
                </h1>

                <p style={ style.sectionIntro }>
                    Enter a simple sentence and click <span style={ style.actionText }>analyse</span>.
                </p>

                <SearchBox onChange={ this.props.textChanged } />
                <SearchButton onClick={ this.props.analyseText }  />

                <TextAnalysis subject={ this.props.subject} action={ this.props.action } object={ this.props.object } />

            </article>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);