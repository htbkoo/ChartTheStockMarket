import React from 'react';
import {shallow} from 'enzyme';
import chai from '../../test-util/chaiWithEnzyme';
import {List, Map} from 'immutable';

import StockList from '../StockList.jsx';

import Stock from '../Stock.jsx';
import DisplayFrame from '../DisplayFrame.jsx';
import StocksModel from "../model/StocksModel";

describe("integration test - StockList", function () {
    it('should have a list of <DisplayFrame/> with onRemoveStock, child=stock and className=StockDisplayFrame in <StockList stocksModel/>', () => {
        // given
        let stocks = List([Map({"name": "A"}), Map({"name": "B"})]), mockOnRemoveStock = "mockFunction";
        let stocksModel = new StocksModel(stocks);

        // when
        let wrapper = shallow(<StockList stocksModel={stocksModel} onRemoveStock={mockOnRemoveStock}/>);

        // then
        assertNumberOfStockIn(wrapper).to.be(stocks.size);
        wrapper.find("div").find(DisplayFrame).forEach(
            (component, key) => {
                chai.expect(component).to.contain(<Stock stock={stocks.get(key)} onRemoveStock={mockOnRemoveStock}/>);
                chai.expect(component).to.have.prop('className').deep.equal("StockDisplayFrame");
            }
        );
    });

    it('should be able to render <StockList/> if stocks props is an empty list', () => {
        // given
        let stocksModel = new StocksModel(List());

        // when
        let wrapper = shallow(<StockList stocksModel={stocksModel}/>);

        // then
        assertNumberOfStockIn(wrapper).to.be(0);
    });

    it('should be able to render <StockList/> if stocks props is missing, by using prop-types to default to empty immutable List()', () => {
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
