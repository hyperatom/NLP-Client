import React from 'React';
import CSSModules from 'react-css-modules';

import style from './style.scss';

class AnalysisModes extends React.Component {

    render() {

        return (
            <div styleName="panel">

                <div styleName="input-group">

                    <input styleName="radio-button"
                           checked={ this.props.isNounPhraseChecked }
                           onChange={ this.props.nounPhraseChecked }
                           id="noun-phrase"
                           type="radio" />

                    <label styleName="label" for="noun-phrase">
                        Noun Phrases
                    </label>

                </div>

                <div styleName="input-group">

                    <input styleName="radio-button"
                           checked={ this.props.isSubordinateClauseChecked }
                           onChange={ this.props.subordinateClauseChecked }
                           id="subordinate-clause"
                           type="radio" />

                    <label styleName="label" for="subordinate-clause">
                        Subordinate Clauses
                    </label>

                </div>

            </div>
        )
    }
}

export default CSSModules(AnalysisModes, style);