import {} from 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './redux/reduxReducers';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

ReactDOM.render(
    <Provider store={createStore(reducers, composeWithDevTools(
        applyMiddleware(
            loggerMiddleware
        )
    ))}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
