import React from 'react';
import {Map, List} from 'immutable'
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from 'src/App.jsx';
import StocksModel from "src/components/model/StocksModel";

describe("mount test - App", function () {
    beforeEach(() => require('./setup.jsx'));

    it('renders with an empty mock store without crashing', () => {
        let initialState = Map({stocksModel: new StocksModel(List())});
        mount(
            <Provider store={configureStore()(initialState)}>
                <App/>
            </Provider>
        );
    });

    it('renders with multiple stocks mock store of without crashing', () => {
        let initialState = Map({stocksModel: new StocksModel(List.of("VMW.N", "GOOG.OQ"))});
        mount(
            <Provider store={configureStore()(initialState)}>
                <App/>
            </Provider>
        );
    });
});