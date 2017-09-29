import React from 'react';
import {shallow} from 'enzyme';
import {Map} from 'immutable';
import configureStore from 'redux-mock-store';
import chai from '../test-util/chaiWithEnzyme';
import {matchAction} from '../test-util/matchingHelper';
import sinon from '../test-util/sinonWithSinonTest';

import StockListContainer, {mapDispatchToProps} from '../components/StockListContainer.jsx';

import StockList from '../components/StockList.jsx';
import {removeStock, reorderStock} from '../redux/reduxActions';

describe("StockListContainer", function () {
    describe("rendering", function () {
        it("should render the connected(StockList) component", function () {
            //    given
            let initialState = Map();
            let store = configureStore()(initialState);

            //    when
            let container = shallow(<StockListContainer store={store}/>);

            //    then
            chai.expect(container).to.have.length(1);
            chai.expect(container.type()).to.equal(StockList);
        });
    });

    describe("props", function () {
        it("should contain the 'stocks' props from initial state", function () {
            //    given
            const stocks = "someStock";
            let initialState = Map({stocks});
            let store = configureStore()(initialState);

            //    when
            let container = shallow(<StockListContainer store={store}/>);

            //    then
            chai.expect(container).to.have.prop('stocks').that.equal(stocks);
        });
    });

    describe("dispatch", function () {
        it("should dispatch onRemoveStock to actions.removeStock", sinon.test(function () {
            //    given
            const underlyingId = "id";
            let dispatchSpy = this.spy();

            //    when
            let {onRemoveStock} = mapDispatchToProps(dispatchSpy);
            onRemoveStock(underlyingId);

            //    then
            chai.expect(dispatchSpy.calledWith(matchAction(removeStock(underlyingId)))).to.be.true;
        }));

        it("should dispatch onReorderStock to actions.reorderStock", sinon.test(function () {
            //    given
            const underlyingId = "id", newPosition = 3;
            let dispatchSpy = this.spy();

            //    when
            let {onReorderStock} = mapDispatchToProps(dispatchSpy);
            onReorderStock(underlyingId, newPosition);

            //    then
            chai.expect(dispatchSpy.calledWith(matchAction(reorderStock(underlyingId, newPosition)))).to.be.true;
        }));
    });
});
