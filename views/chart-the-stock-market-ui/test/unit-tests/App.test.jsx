import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import App from 'src/App.jsx';

import ChartContainer from 'src/components/ChartContainer.jsx';
import StockSection from 'src/components/StockSection.jsx';

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
