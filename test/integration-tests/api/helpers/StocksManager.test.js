import chai from "chai";
import {sinon} from "../../../test-utils/sinonWithSinonTest";

import StocksManager from "../../../../api/helpers/StocksManager";

import Stock from "../../../../api/models/Stock";

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
                    let underlyingId = "anId", spotPrice = 10;
                    let stock = new StubStockBuilder().setUnderlyingId(underlyingId).withSpotPrice(spotPrice).build();
                    stocksManager.addStock(stock);
                    let stocks = stocksManager.getStocks();

                    //    then
                    chai.expect(stocks).to.deep.equal({
                        [underlyingId]: {
                            underlyingId,
                            spotPrice
                        }
                    });
                });

                it('should throw TypeError if add anything other than Stock when addStock()', function () {
                    //    given
                    let stocksManager = new StocksManager();

                    //    when
                    let addingNonStock = stocksManager.addStock.bind(this, "anything not a Stock");

                    //    then
                    chai.expect(addingNonStock).to.throw(TypeError, /should be a Stock/);
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

        function StubStockBuilder() {
            let stock = sinon.createStubInstance(Stock);

            this.build = () => stock;
            this.withSpotPrice = spotPrice => {
                stock.spotPrice = spotPrice;
                return this;
            };
            this.setUnderlyingId = id => {
                stock.getUnderlyingId = () => id;
                return this;
            };
            this.overrideMethod = method => ({
                with(func) {
                    stock[method] = func;
                }
            });

            return this;
        }
    });
});