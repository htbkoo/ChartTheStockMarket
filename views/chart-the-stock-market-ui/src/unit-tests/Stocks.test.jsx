import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import Stocks from '../components/Stocks.jsx';

import Stock from '../components/Stock.jsx';

describe("Stocks", function () {
    it('should have a list of <Stock/> in <Stocks stocks/>', () => {
        // given
        let stocks = [{"name": "A"}, {"name": "B"}];

        // when
        let wrapper = shallow(<Stocks stocks={stocks}/>);

        // then
        assertNumberOfStockIn(wrapper).to.be(2);
        let stockComponents = wrapper.find(Stock);
        stockComponents.forEach(
            (component, key) =>
                chai.expect(component).to.have.prop('stock').deep.equal(stocks[key])
        );
    });

    it('should be able to render <Stocks/> even if stocks props is an empty list', () => {
        // given

        // when
        let wrapper = shallow(<Stocks stocks={[]}/>);

        // then
        assertNumberOfStockIn(wrapper).to.be(0);
    });

    function assertNumberOfStockIn(wrapper) {
        return {
            "to": {
                "be": size => chai.expect(wrapper.find(Stock).length).to.equal(size)
            }
        }
    }
});
