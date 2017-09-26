import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import StockSection from '../components/StockSection.jsx';

import StockListContainer from '../components/StockListContainer.jsx';
import StockControls from '../components/StockControls.jsx';
import DisplayFrame from '../components/DisplayFrame.jsx';

describe("StockSection", function () {
    it('should have a <StockListContainer /> and <DisplayFrame child={<StockControls />}/> in <StockSection />', () => {
        // given

        // when
        let wrapper = shallow(<StockSection/>);

        // then
        chai.expect(wrapper.containsAllMatchingElements([
            <StockListContainer/>,
        ])).to.equal(true, "<StockSection/> should conatins <StockListContainer/>");

        let displayFrameComponent = wrapper.find(DisplayFrame);
        chai.expect(displayFrameComponent).to.have.length(1);
        chai.expect(displayFrameComponent).to.contain(<StockControls/>);
        chai.expect(displayFrameComponent).to.have.prop('className', "StockDisplayFrame");
    });
});
