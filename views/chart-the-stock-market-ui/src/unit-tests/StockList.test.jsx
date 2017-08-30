import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import StockList from '../components/StockList.jsx';

import Stock from '../components/Stock.jsx';

describe("StockList", function () {
    it('should have a list of <Stock/> in <StockList stocks/>', () => {
        // given
        let stocks = [{"name": "A"}, {"name": "B"}];

        // when
        let wrapper = shallow(<StockList stocks={stocks}/>);

        // then
        assertNumberOfStockIn(wrapper).to.be(2);
        let stockComponents = wrapper.find(Stock);
        stockComponents.forEach(
            (component, key) =>
                chai.expect(component).to.have.prop('stock').deep.equal(stocks[key])
        );
    });

    it('should be able to render <StockList/> if stocks props is an empty list', () => {
        // given

        // when
        let wrapper = shallow(<StockList stocks={[]}/>);

        // then
        assertNumberOfStockIn(wrapper).to.be(0);
    });

    it('should be able to render <StockList/> if stocks props is missing, by using prop-types to default to empty array', () => {
        // given

        // when
        let wrapper = shallow(<StockList/>);

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
