'use strict';

var React = require('react'),
    style = require('./style');

module.exports = React.createClass({

    render: function() {
        return (
            <button type="button" style={ style }>
                Analyse
            </button>
        )
    }
});