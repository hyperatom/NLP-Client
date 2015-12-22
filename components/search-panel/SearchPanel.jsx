'use strict';

import React        from 'react';
import SearchBox    from '../search-box/SearchBox';
import SearchButton from '../search-button/SearchButton';
import TextAnalysis from '../text-analysis/TextAnalysis';
import style        from './style';

export default class SearchPanel extends React.Component {

    render() {

        return (
            <article style={ style }>

                <SearchBox />
                <SearchButton />

                <TextAnalysis analysedText="Adam" />

            </article>
        )
    }
}