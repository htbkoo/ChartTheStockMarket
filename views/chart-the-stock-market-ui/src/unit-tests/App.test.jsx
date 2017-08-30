import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import App from '../App.jsx';

import ChartContainer from '../components/ChartContainer.jsx';
import StockSection from '../components/StockSection.jsx';

describe("App", function () {
    it('should have a <ChartContainer /> and <StockSection /> in <App />', () => {
        // given

        // when
        let wrapper = shallow(<App/>);

        // then
        chai.expect(wrapper.containsAllMatchingElements([
            <ChartContainer/>,
            <StockSection/>,
        ])).to.be.true;
    });
});
