import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import StockSection from '../components/StockSection.jsx';

import StockListContainer from '../components/StockListContainer.jsx';
import StockControls from '../components/StockControls.jsx';

describe("StockSection", function () {
    it('should have a <StockListContainer /> and <StockControls /> in <StockSection />', () => {
        // given

        // when
        let wrapper = shallow(<StockSection/>);

        // then
        chai.expect(wrapper.containsAllMatchingElements([
            <StockListContainer/>,
            <StockControls/>,
        ])).to.be.true;
    });
});
