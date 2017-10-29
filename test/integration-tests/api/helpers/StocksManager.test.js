import chai from "chai";

import StocksManager from "../../../../api/helpers/StocksManager";

describe('api', function () {
    describe('helpers', function () {
        describe('StocksManager', function () {
            describe('getStocks', function () {
                it('should return an empty object when initalized', function () {
                    //    given
                    let stocksManager = new StocksManager();

                    //    when
                    let stocks = stocksManager.getStocks();

                    //    then
                    chai.expect(stocks).to.be.an("object").that.is.empty
                });
            });

            describe('addStock', function () {
                it('should add a stock when addStock', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    chai.expect(stocksManager.getStocks()).to.be.an("object").that.is.empty;

                    //    when
                    stocksManager.addStock({getUnderlyingId: () => "anId", spotPrice: 10});
                    let stocks = stocksManager.getStocks();

                    //    then
                    chai.expect(stocks).to.deep.equal({
                        anId: {
                            underlyingId: "anId",
                            spotPrice: 10
                        }
                    });
                });

                it('should not mutate the existing view of stocks after adding a stock by stocksManager.addStock', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    let existingView = stocksManager.getStocks();
                    chai.expect(existingView).to.be.an("object").that.is.empty;

                    //    when
                    stocksManager.addStock({getUnderlyingId: () => "anId", spotPrice: 10});

                    //    then
                    chai.expect(existingView).to.be.an("object").that.is.empty;
                });
            });

            describe('getStocksAsJsonResponse', function () {
                it('should return an empty array when initalized', function () {
                    //    given
                    let stocksManager = new StocksManager();

                    //    when
                    let json = stocksManager.getStocksAsJsonResponse();

                    //    then
                    chai.expect(json).to.be.an("array").that.is.empty
                });
            });
        });
    });
});