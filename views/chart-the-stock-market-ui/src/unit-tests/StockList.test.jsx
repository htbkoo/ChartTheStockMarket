import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';

import StockList from '../components/StockList.jsx';

import Stock from '../components/Stock.jsx';
import DisplayFrame from '../components/DisplayFrame.jsx';

describe("StockList", function () {
    it('should have a list of <DisplayFrame/> with onRemoveStock, child=stock and className=StockDisplayFrame in <StockList stocks/>', () => {
        // given
        let stocks = [{"name": "A"}, {"name": "B"}], mockOnRemoveStock = "mockFunction";

        // when
        let wrapper = shallow(<StockList stocks={stocks} onRemoveStock={mockOnRemoveStock}/>);

        // then
        assertNumberOfStockIn(wrapper).to.be(stocks.length);
        wrapper.find("div").find(DisplayFrame).forEach(
            (component, key) => {
                chai.expect(component).to.have.prop('child').deep.equal(<Stock stock={stocks[key]} onRemoveStock={mockOnRemoveStock}/>);
                chai.expect(component).to.have.prop('className').deep.equal("StockDisplayFrame");
            }
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
                "be": size => chai.expect(wrapper.find("div").find(DisplayFrame).length).to.equal(size)
            }
        }
    }
});
