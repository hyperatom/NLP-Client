'use strict';

var React      = require('react'),
    inputStyle = require('./style');

module.exports = React.createClass({

    render: function() {
        return <input type="text" style={ inputStyle } />
    }
});