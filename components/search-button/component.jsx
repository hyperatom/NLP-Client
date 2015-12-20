'use strict';

var React = require('react'),
    style = require('./style'),
    http  = require('../../services/http');

module.exports = React.createClass({

    buttonClicked: function() {

        http.get('http://jsonplaceholder.typicode.com/posts')
            .then(function(data) {
                console.log('done', data);
            }, function(data) {
                console.log('failed', data);
            });
    },

    render: function() {
        return (
            <button type="button" onClick={ this.buttonClicked } style={ style }>
                Analyse
            </button>
        )
    }
});