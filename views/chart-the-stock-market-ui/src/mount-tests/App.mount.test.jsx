import React from 'react';
import {mount} from 'enzyme';

import App from '../App.jsx';

require('./setup.jsx');

it('renders without crashing', () => {
    // const
    mount(<App/>);
});
