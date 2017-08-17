import React from 'react';

import {shallow} from 'enzyme';

import App from '../App.jsx';

it('shallow renders without crashing', () => {
    shallow(<App/>);
});
