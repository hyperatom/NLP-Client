'use strict';

import React from 'react';
import style from './style';

export default class SearchButton extends React.Component {

    render() {

        return (
            <button type="button" onClick={ this.props.onClick } style={ style }>
                Analyse
            </button>
        )
    }
}