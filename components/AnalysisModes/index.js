import React from 'React';
import CSSModules from 'react-css-modules';

import style from './style.scss';

class AnalysisModes extends React.Component {

    render() {

        return (
            <div styleName="panel">

                <input styleName="radio-button"
                       defaultChecked
                       id="noun-phrase"
                       type="radio" />

                <label className="np" styleName="label">
                    Noun Phrases
                </label>

            </div>
        )
    }
}

export default CSSModules(AnalysisModes, style);