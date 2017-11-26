import React from 'react';
import {shallow} from 'enzyme';
import {List, Map} from 'immutable';
import configureStore from 'redux-mock-store';
import chai from '../test-util/chaiWithEnzyme';
import {matchAction} from '../test-util/matchingHelper';
import sinon from '../test-util/sinonWithSinonTest';

import StockListContainer, {mapDispatchToProps} from 'components/StockListContainer.jsx';

import StockList from 'components/StockList.jsx';
import * as reduxActions from 'redux/reduxActions';
import StocksModel from "components/model/StocksModel";

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
            const stocks = List(["someStock"]);
            const stocksModel = new StocksModel(stocks);
            let initialState = Map({stocksModel});
            let store = configureStore()(initialState);

            //    when
            let container = shallow(<StockListContainer store={store}/>);

            //    then
            chai.expect(container).to.have.prop('stocksModel').that.is.an.instanceof(StocksModel);
            chai.expect(container.prop('stocksModel').getStocks()).to.equal(stocks);
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
            chai.expect(dispatchSpy.calledWith(matchAction(reduxActions.removeStock(underlyingId)))).to.be.true;
        }));

        it("should dispatch onReorderStock to actions.reorderStock", sinon.test(function () {
            //    given
            const oldIndex = 0, newIndex = 3;
            let dispatchSpy = this.spy();

            //    when
            let {onReorderStock} = mapDispatchToProps(dispatchSpy);
            onReorderStock(oldIndex, newIndex);

            //    then
            chai.expect(dispatchSpy.calledWith(matchAction(reduxActions.reorderStock(oldIndex, newIndex)))).to.be.true;
        }));
    });
});
