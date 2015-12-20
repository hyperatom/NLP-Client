'use strict';

var React        = require('react'),
    SearchBox    = require('../search-box/component'),
    SearchButton = require('../search-button/component'),
    TextAnalysis = require('../text-analysis/component'),
    style        = require('./style');

module.exports = React.createClass({

    render: function() {
        return (
            <article style={ style }>

                <SearchBox />
                <SearchButton />

                <TextAnalysis analysedText="Adam" />

            </article>
        )
    }
});