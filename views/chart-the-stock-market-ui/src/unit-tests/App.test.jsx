import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import App from '../App.jsx';

import ChartContainer from '../components/ChartContainer.jsx';
import StocksContainer from '../components/StocksContainer.jsx';

describe("App", function () {
    it('should have a <ChartContainer /> and <StocksContainer /> in <App />', () => {
        // given

        // when
        let wrapper = shallow(<App/>);

        // then
        chai.expect(wrapper.containsAllMatchingElements([
            <ChartContainer/>,
            <StocksContainer/>,
        ])).to.be.true;
    });
});
