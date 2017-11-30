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
import Immutable from "immutable";

const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools({
    serialize: {
        immutable: Immutable
    }
});

let store = createStore(reducers, composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
