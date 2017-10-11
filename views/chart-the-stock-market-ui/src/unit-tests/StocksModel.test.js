import chai from 'chai';
import chaiImmutable from "chai-immutable";
import chaiEnzyme from "chai-enzyme";
import {shallow} from 'enzyme';
import {List} from 'immutable';
import React, {Component} from 'react';

import StocksModel from '../components/model/StocksModel';

import {SortableItem, SortableList} from '../components/SortableComponents';
import DisplayFrame from '../components/DisplayFrame';
import Stock from '../components/Stock';

chai.use(chaiImmutable);
chai.use(chaiEnzyme());

describe("StocksModel", function () {
    describe("Constructor", function () {
        it("should create StocksModel", function () {
            //    given
            //    when
            let stocksModel = new StocksModel();

            //    then
            chai.expect(stocksModel).to.be.an.instanceOf(StocksModel);
        });

        it("should be able to create StocksModel(list)", function () {
            //    given
            let stocks = List.of(1, 2, 3);

            //    when
            let stocksModel = new StocksModel(stocks);

            //    then
            chai.expect(stocksModel).to.be.an.instanceOf(StocksModel);
            chai.expect(stocksModel.getStocks()).to.equal(stocks);
        });

        it("should throw TypeError when StocksModel(notAnImmutableList)", function () {
            //    given
            let notAnImmutableList = [1, 2, 3];

            //    when
            //    then
            chai.expect(() => new StocksModel(notAnImmutableList)).to.throw(TypeError);
        });
    });

    describe("Getters and Setters", function () {
        it("should contains property 'stocks' that is an immutable List (exposed as getter and setter)", function () {
            //    given
            //    when
            let stocksModel = new StocksModel();

            //    then
            chai.expect(stocksModel.getStocks()).to.be.an.instanceOf(List);
            chai.expect(stocksModel.getStocks()).to.equal(List());

            let newStocks = List.of(1);
            stocksModel.setStocks(newStocks);
            chai.expect(stocksModel.getStocks()).to.equal(newStocks);
        });

        [
            1,
            "1",
            [1]
        ].forEach(notAnImmutableList => {
            it(`should, for ${JSON.stringify(notAnImmutableList)} in stocksModel.setStocks(notAnImmutableList), throw TypeError`, function () {
                //    given
                //    when
                let stocksModel = new StocksModel();

                //    then
                chai.expect(stocksModel.setStocks.bind(stocksModel, notAnImmutableList)).to.throw(TypeError);
            });
        });
    });

    describe("asSortableComponents", function () {
        [
            {
                stocks: List.of("a", "b"),
                onSortEnd: "onSortEnd",
                onRemoveStock: "onRemoveStock",
                expectedGeneratedComponents: (
                    <SortableList axis="x" onSortEnd={"onSortEnd"}>
                        <div className="StockListContainer">
                            <SortableItem key="item-0" index={0}>
                                <DisplayFrame className="StockDisplayFrame" key={0}>
                                    <Stock stock="a" onRemoveStock={"onRemoveStock"}/>
                                </DisplayFrame>
                            </SortableItem>
                            <SortableItem key="item-1" index={1}>
                                <DisplayFrame className="StockDisplayFrame" key={1}>
                                    <Stock stock="b" onRemoveStock={"onRemoveStock"}/>
                                </DisplayFrame>
                            </SortableItem>
                        </div>
                    </SortableList>
                )
            }
        ].forEach(testCase =>
            it(`should return SortableList of SortableItem when StocksModel(List(${JSON.stringify(testCase.stocks.toArray())})).asSortableComponents()`, function () {
                //    given
                let {stocks, onSortEnd, onRemoveStock, expectedGeneratedComponents} = testCase;
                let stocksModel = new StocksModel(stocks);

                //    when
                let sortableComponents = stocksModel.asSortableComponents({
                    onSortEnd,
                    onRemoveStock
                });

                let wrapper = shallow(
                    <div>
                        {sortableComponents}
                    </div>
                );

                //    then
                chai.expect(wrapper).to.containMatchingElement(expectedGeneratedComponents);
            })
        )
    });
});