'use strict';

import React from 'react';
import style from './style';

export default class TextAnalysis extends React.Component {

    render() {

        return (
            <article style={ style.section }>

                <div style={ style.sentencePart }>
                    <span style={ style.sentencePartKey }>Subject</span>
                    <span style={ style.sentencePartValue }>{ this.props.subject }</span>
                </div>

                <div style={ style.sentencePart }>
                    <span style={ style.sentencePartKey }>Action</span>
                    <span style={ style.sentencePartValue }>{ this.props.action }</span>
                </div>

                <div style={ style.sentencePart }>
                    <span style={ style.sentencePartKey }>Object</span>
                    <span style={ style.sentencePartValue }>{ this.props.object }</span>
                </div>
            </article>
        )
    }
}