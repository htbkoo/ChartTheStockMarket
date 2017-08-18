import React from 'react';
import {mount} from 'enzyme';

import App from '../App.jsx';

require('./setup.jsx');

describe("mount test - App", function () {
    it('renders without crashing', () => {
        // const
        mount(<App/>);
    });
});