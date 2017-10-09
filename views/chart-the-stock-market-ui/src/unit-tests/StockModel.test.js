import chai from 'chai';
import chaiImmutable from "chai-immutable";

import StockModel from '../components/model/StockModel';

import {List} from 'immutable';

chai.use(chaiImmutable);

describe("StockModel", function () {
    it("should create StockModel", function () {
        //    given
        //    when
        let stockModel = new StockModel();

        //    then
        chai.expect(stockModel).to.be.an.instanceOf(StockModel);
    });

    it("should contains property 'stocks' that is an immutable List (exposed as getter and setter)", function () {
        //    given
        //    when
        let stockModel = new StockModel();

        //    then
        chai.expect(stockModel.getStocks()).to.be.an.instanceOf(List);
        chai.expect(stockModel.getStocks()).to.equal(List());

        let newStocks = List.of(1);
        stockModel.setStocks(newStocks);
        chai.expect(stockModel.getStocks()).to.equal(newStocks);
    });

    [
        1,
        "1",
        [1]
    ].forEach(notAnImmutableList => {
        it(`should, for ${JSON.stringify(notAnImmutableList)} in stockModel.setStocks(notAnImmutableList), throw TypeError`, function () {
            //    given
            //    when
            let stockModel = new StockModel();

            //    then
            chai.expect(stockModel.setStocks.bind(stockModel, notAnImmutableList)).to.throw(TypeError);
        });
    });
});