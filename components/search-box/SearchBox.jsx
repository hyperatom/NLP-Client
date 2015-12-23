'use strict';

import React from 'react';
import style from './style';

function inputChanged(elem) {

    var text = elem.target.value;

    this.props.onChange(text);
}

export default class SearchBox extends React.Component {

    constructor(props) {

        super(props);

        this.inputChanged = inputChanged.bind(this);
    }

    render() {
        return <input placeholder="The cat sat on the mat." onChange={ this.inputChanged } type="text" style={ style } />
    }
}
