import React      from 'React';
import CSSModules from 'react-css-modules';

import style from './style.scss';

class AnalysisModes extends React.Component {

    getInputGroupClassName(phraseCode) {

        return style['input-group'] + ' mode--' + phraseCode;
    }

    render() {

        return (
            <div styleName="panel">

                <div className={ this.getInputGroupClassName('np') }>

                    <input styleName="radio-button"
                           checked={ this.props.isNounPhraseChecked }
                           onChange={ this.props.nounPhraseChecked }
                           id="noun-phrase"
                           type="radio" />

                    <label styleName="label">
                        Noun Phrases
                    </label>

                </div>

                <div className={ this.getInputGroupClassName('s') }>

                    <input styleName="radio-button"
                           checked={ this.props.isMainClauseChecked }
                           onChange={ this.props.mainClauseChecked }
                           id="main-clause"
                           type="radio" />

                    <label styleName="label">
                        Main Clauses
                    </label>

                </div>

                <div className={ this.getInputGroupClassName('sbar') }>

                    <input styleName="radio-button"
                           checked={ this.props.isSubordinateClauseChecked }
                           onChange={ this.props.subordinateClauseChecked }
                           id="subordinate-clause"
                           type="radio" />

                    <label styleName="label">
                        Subordinate Clauses
                    </label>

                </div>

                <div className={ this.getInputGroupClassName('pp') }>

                    <input styleName="radio-button"
                           checked={ this.props.isPrepositionalPhraseChecked }
                           onChange={ this.props.prepositionalPhraseChecked }
                           id="subordinate-clause"
                           type="radio" />

                    <label styleName="label">
                        Prepositional Phrases
                    </label>

                </div>

            </div>
        )
    }
}

export default CSSModules(AnalysisModes, style);