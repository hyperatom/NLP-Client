import ReactDOM     from 'react-dom';
import SearchPanel  from './components/search-panel/SearchPanel';

import { createStore }      from 'redux';
import { Provider }         from 'react-redux';
import TextAnalysisReducer  from './reducers/textAnalysisReducer';

var store = createStore(TextAnalysisReducer);

ReactDOM.render(

    <Provider store={ store }>
        <SearchPanel />
    </Provider>,

    document.getElementById('content')
);