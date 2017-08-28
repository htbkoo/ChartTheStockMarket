import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import App from '../App.jsx';

import ChartContainer from '../components/ChartContainer.jsx';
import StockListContainer from '../components/StockListContainer.jsx';

describe("App", function () {
    it('should have a <ChartContainer /> and <StockListContainer /> in <App />', () => {
        // given

        // when
        let wrapper = shallow(<App/>);

        // then
        chai.expect(wrapper.containsAllMatchingElements([
            <ChartContainer/>,
            <StockListContainer/>,
        ])).to.be.true;
    });
});
