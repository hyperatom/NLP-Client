'use strict';

import React           from 'react';
import CSSModules      from 'react-css-modules';
import ContentEditable from 'react-contenteditable';

import style from './style.scss';

class TextComposer extends React.Component {

    _textChanged(event) {

        this.props.textChanged(event.target.value);
    }

    render() {

        return (
            <ContentEditable onChange={ this._textChanged.bind(this) }
                             disabled={ false }
                             html={ this.props.composerHtml }
                             styleName="composer" />
        )
    }
}


export default CSSModules(TextComposer, style);