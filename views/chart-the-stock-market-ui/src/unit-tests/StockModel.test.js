import chai from 'chai';

import StockModel from '../components/model/StockModel';

import {List} from 'immutable';

describe("StockModel", function () {
    it("should create StockModel", function () {
        //    given
        //    when
        let stockModel = new StockModel();

        //    then
        chai.expect(stockModel).to.be.an.instanceOf(StockModel);
    });

    it("should contains property 'stocks' that is an immutable List", function () {
        //    given
        //    when
        let stockModel = new StockModel();

        //    then
        chai.expect(stockModel.stocks).to.be.an.instanceOf(List);
    });
});