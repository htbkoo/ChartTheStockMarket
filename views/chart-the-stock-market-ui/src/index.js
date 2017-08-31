import {} from 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './redux/reduxReducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';

ReactDOM.render(
    <Provider store={createStore(reducers, devToolsEnhancer())}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
