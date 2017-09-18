import React from 'react';
import {Map, List} from 'immutable'
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from '../App.jsx';

describe("mount test - App", function () {
    beforeEach(() => require('./setup.jsx'));

    it('renders with a mock store without crashing', () => {
        let initialState = Map({stocks: List()});
        mount(
            <Provider store={configureStore()(initialState)}>
                <App/>
            </Provider>
        );
    });
});