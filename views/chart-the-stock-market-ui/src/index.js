import {} from 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './redux/reduxReducers';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {actions} from "./redux/reduxActions";

const loggerMiddleware = createLogger();

let store = createStore(reducers, composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
));

store.dispatch(actions.fetchStocks());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
