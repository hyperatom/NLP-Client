'use strict';

import React from 'react';
import style from './style';

export default class TextAnalysis extends React.Component {

    render() {

        if (this.props.hasAnalysed) {

            if (!this.props.subject) {

                return (
                    <p style={ style.errorMessage }>
                        I couldn't find the <span style={ style.errorEmphasis }>subject</span> of your sentence, have another go.
                    </p>
                )
            }

            if (!this.props.action) {

                return (
                    <p style={ style.errorMessage }>
                        I couldn't find the <span style={ style.errorEmphasis }>action</span> of your sentence, have another go.
                    </p>
                )
            }

            if (!this.props.object) {

                return (
                    <p style={ style.errorMessage }>
                        I couldn't find the <span style={ style.errorEmphasis }>object</span> of your sentence, have another go.
                    </p>
                )
            }

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

        return <article></article>;
    }
}