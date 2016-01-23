'use strict';

import React        from 'react';
import TextAnalysis from '../text-analysis/TextAnalysis';
import TextComposer from '../TextComposer';
import style        from './style';

import TextAnalyzer from '../../services/textAnalyser';

import { connect } from 'react-redux';

var mapStateToProps = function(state) {

    return state;
};

var mapDispatchToProps = function(dispatch) {

    return {

        textChanged(composerHtml) {

            return dispatch((thunkDispatch) => {

                TextAnalyzer.analyse(composerHtml)
                    .then((data) => {

                        var sao        = TextAnalyzer.extractSubjectActionObject(data),
                            mainClause = TextAnalyzer.extractMainClause(data);

                        thunkDispatch({
                            type: 'SET_MAIN_CLAUSE',
                            mainClause: mainClause
                        });

                        thunkDispatch({
                            type: 'SET_SAO',
                            subject: sao.subject,
                            action: sao.action,
                            object: sao.object
                        });
                    });

                dispatch({
                    type: 'TEXT_CHANGED',
                    composerHtml: composerHtml
                });
            });
        }
    };
};

class SearchPanel extends React.Component {

    render() {

        return (
            <article style={ style.section }>

                <TextComposer composerHtml={ this.props.composerHtml }
                              textChanged={ this.props.textChanged } />


                <TextAnalysis hasAnalysed={ this.props.hasAnalysed }
                              mainClause={ this.props.mainClause }
                              subject={ this.props.subject }
                              action={ this.props.action }
                              object={ this.props.object } />
            </article>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);