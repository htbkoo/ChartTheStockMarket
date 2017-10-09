import chai from 'chai';

import StockModel from '../components/model/StockModel';

describe("StockModel", function () {
    it("should create StockModel", function () {
        //    given
        //    when
        let stockModel = new StockModel();

        //    then
        chai.expect(stockModel).to.be.an.instanceOf(StockModel);
    });
});