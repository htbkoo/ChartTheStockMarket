import chai from 'chai';
import chaiImmutable from "chai-immutable";

import StocksModel from '../components/model/StocksModel';

import {List} from 'immutable';

chai.use(chaiImmutable);

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
});