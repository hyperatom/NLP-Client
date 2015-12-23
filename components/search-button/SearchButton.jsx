'use strict';

import React from 'react';
import style from './style';

export default class SearchButton extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            hover: false
        }
    }

    mouseOver() {

        this.setState({
            hover: true
        });
    }

    mouseOut() {

        this.setState({
            hover: false
        });
    }

    render() {

        var buttonStyle = Object.assign({}, style);

        if (this.state.hover) {

            buttonStyle.backgroundColor = '#661141';
        }

        return (
            <button type="button"
                    onMouseOver={ this.mouseOver.bind(this) }
                    onMouseOut={ this.mouseOut.bind(this) }
                    onClick={ this.props.onClick }
                    style={ buttonStyle }>

                Analyse

            </button>
        )
    }
}