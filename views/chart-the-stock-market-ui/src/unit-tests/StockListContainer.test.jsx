import React from 'react';
import {shallow} from 'enzyme';
import {Map} from 'immutable';
import configureStore from 'redux-mock-store';
import chai from '../test-util/chaiWithEnzyme';
import sinon from '../test-util/sinonWithSinonTest';

import StockListContainer, {mapDispatchToProps} from '../components/StockListContainer.jsx';

import StockList from '../components/StockList.jsx';
import {addStock} from '../redux/reduxActions';

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
        it("should dispatch onAddStock to actions.addStock", sinon.test(function () {
            //    given
            const underlyingId = "id";
            let dispatchSpy = this.spy();

            //    when
            let {onAddStock} = mapDispatchToProps(dispatchSpy);
            onAddStock(underlyingId);

            //    then
            // TODO: bug in at least sinon@3.2.1, unable to use sinon.match(obj) if not in jsdom environment
            // chai.expect(dispatchSpy.calledWith(sinon.match(addStock(underlyingId)))).to.be.true;
            chai.expect(dispatchSpy.calledWith(sinon.match(function (value) {
                let action = addStock(underlyingId);
                return Object.keys(action).every(key => (key in value) && (action[key] === value[key]));
            }))).to.be.true;
        }));
    });
});
