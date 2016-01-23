'use strict';

import React      from 'react';
import CSSModules from 'react-css-modules';

import style from './style.scss';

class TextComposer extends React.Component {

    render() {
        return (
            <span className="blinking-cursor">|</span>
        )
    }
}


export default CSSModules(TextComposer, style);