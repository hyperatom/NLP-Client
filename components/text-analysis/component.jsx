'use strict';

var React = require('react'),
    style = require('./style');

module.exports = React.createClass({

    render: function() {
        return (
            <article>
                { this.props.analysedText }
            </article>
        )
    }
});