import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';
import storeHelper from '../test-util/reduxStoreHelper';
import sinon from '../test-util/sinonWithSinonTest';

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
        let input = wrapper.find('input');

        // then
        chai.expect(input).to.have.length(1);
        chai.expect(input).to.have.prop('type', 'text');
    });

    it('should, onChange(), update state.inputValue', sinon.test(function () {
        // given
        const underlyingId = "someText";
        let wrapper = shallow(<StockControls/>);
        let getInput = () => wrapper.find('input');
        chai.expect(wrapper).to.have.state("inputValue", "");

        // when
        getInput().simulate("change", {target: {value: underlyingId}});

        // then
        chai.expect(wrapper).to.have.state("inputValue", underlyingId);
        chai.expect(getInput()).to.have.prop("value", underlyingId);
    }));
});
