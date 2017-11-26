import React from 'react';
import {shallow} from 'enzyme';
import chai from '../test-util/chaiWithEnzyme';
import sinon from '../test-util/sinonWithSinonTest';

import StockList from 'src/components/StockList.jsx';
import StocksModel from "src/components/model/StocksModel";

describe("StockList", function () {
    it(`should have propTypes for stocksModel of type StocksModel and contain stocksModel.asSortableComponents()`, sinon.test(function () {
        // given
        let stubStocksModel = sinon.createStubInstance(StocksModel);
        let mockCreatedComponent = <br/>;
        stubStocksModel.asSortableComponents = () => mockCreatedComponent;

        // when
        let wrapper = shallow(<StockList stocksModel={stubStocksModel}/>);

        // then
        chai.expect(wrapper).to.contain(mockCreatedComponent);
    }));

    it(`should pass {onSortEnd, onRemoveStock} to stocksModel.asSortableComponents()`, sinon.test(function () {
        // given
        const mockCreatedComponent = <div/>;
        let stubStocksModel = sinon.createStubInstance(StocksModel);
        let spyOnRemoveStock = this.spy();
        let spyOnReorderStock = this.spy();
        stubStocksModel.asSortableComponents = props => {
            let oldIndex = 1, newIndex = 10, someIndex = 5;
            props.onSortEnd({oldIndex, newIndex});
            chai.expect(spyOnReorderStock.withArgs(oldIndex, newIndex).calledOnce).to.equal(true, "When onSortEnd(old, new) in component, should in turn call props.onReorderStock(old, new)");

            props.onRemoveStock(someIndex);
            chai.expect(spyOnRemoveStock.withArgs(someIndex).calledOnce).to.equal(true, "When onRemoveStock(index) in component, should in turn call props.onRemoveStock(index)");
            return mockCreatedComponent;
        };

        // when
        let wrapper = shallow(<StockList stocksModel={stubStocksModel}
                                         onRemoveStock={spyOnRemoveStock}
                                         onReorderStock={spyOnReorderStock}/>);

        // then
        chai.expect(wrapper).to.contain(mockCreatedComponent);
    }));
});
