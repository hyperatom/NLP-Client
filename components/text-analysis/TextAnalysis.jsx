'use strict';

import React from 'react';
import style from './style';

export default class TextAnalysis extends React.Component {

    render() {

        return (
            <article>

                <table>
                    <tbody>
                        <tr>
                            <td>Subject:</td>
                            <td>{ this.props.subject }</td>
                        </tr>

                        <tr>
                            <td>Action:</td>
                            <td>{ this.props.action }</td>
                        </tr>

                        <tr>
                            <td>Object:</td>
                            <td>{ this.props.object }</td>
                        </tr>
                    </tbody>
                </table>

            </article>
        )
    }
}