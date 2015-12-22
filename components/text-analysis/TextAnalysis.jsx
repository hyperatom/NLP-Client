'use strict';

import React from 'react';
import style from './style';

export default class TextAnalysis extends React.Component {

    render() {
        return (
            <article>
                { this.props.analysedText }
            </article>
        )
    }
}