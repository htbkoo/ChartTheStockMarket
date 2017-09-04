import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';
import storeHelper from '../test-util/reduxStoreHelper';

import StockControlsContainer, {StockControls} from '../components/StockControls.jsx';

describe("StockControls", function () {
    it('should render the connected(StockControls) component', () => {
        //    given
        const store = storeHelper.createEmptyStore();

        //    when
        let container = shallow(<StockControlsContainer store={store}/>);

        //    then
        chai.expect(container).to.have.length(1);
        chai.expect(container.type()).to.equal(StockControls);
    });

    it('should have a <input /> in <StockControls />', () => {
        // given

        // when
        let wrapper = shallow(<StockControls/>);

        // then
        chai.expect(wrapper).to.contain(<input type="text"/>);
    });
});
