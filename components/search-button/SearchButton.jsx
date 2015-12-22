'use strict';

import React from 'react';
import Http  from '../../services/http';
import style from './style';

export default class SearchButton extends React.Component {

    buttonClicked() {

        var data = {
            q: 'The dog sat on the mat. Adam was fat, haha.'
        };

        Http.get('http://localhost:8990', data)
            .then(function(response) {
                console.log(response.data.document.sentences.sentence);
            });
    }

    render() {
        return (
            <button type="button" onClick={ this.buttonClicked } style={ style }>
                Analyse
            </button>
        )
    }
}