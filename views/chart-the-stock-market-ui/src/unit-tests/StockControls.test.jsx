import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import StockControls from '../components/StockControls.jsx';

describe("StockControls", function () {
    it('should have a <input /> in <StockControls />', () => {
        // given

        // when
        let wrapper = shallow(<StockControls/>);

        // then
        chai.expect(wrapper).to.contain(<input type="text"/>);
    });
});
