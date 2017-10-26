import chai from "chai";

import StocksManager from "../../../../api/helpers/StocksManager";

describe('api', function () {
    describe('helpers', function () {
        describe('StocksManager', function () {
            describe('getStocks', function () {
                it('should return an empty array when initalized', function () {
                    //    given
                    let stocksManager = new StocksManager();

                    //    when
                    let stocks = stocksManager.getStocks();

                    //    then
                    chai.expect(stocks).to.be.an("array").that.is.empty
                });
            });
        });
    });
});