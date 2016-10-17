import React        from 'react';
import ReactDOM     from 'react-dom';
import SearchPanel  from './components/SearchPanel';

import { createStore, applyMiddleware } from 'redux';
import { Provider }                     from 'react-redux';
import thunk                            from 'redux-thunk';
import TextAnalysisReducer              from './reducers/textAnalysisReducer';

var store = applyMiddleware(thunk)(createStore)(TextAnalysisReducer);

ReactDOM.render(

    <Provider store={ store }>
        <SearchPanel />
    </Provider>,

    document.getElementById('content')
);