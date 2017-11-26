import chai from "chai";
import {sinon} from "../../../test-utils/sinonWithSinonTest";

import StocksManager from "../../../../api/helpers/StocksManager";

import Stock from "../../../../api/models/Stock";

describe('api', function () {
    describe('helpers', function () {
        describe('StocksManager', function () {
            const UNDERLYING_ID = "anId", SPOT_PRICE = 10;
            const SAMPLE_STOCK = new StubStockBuilder().withUnderlyingId(UNDERLYING_ID).withSpotPrice(SPOT_PRICE).build();

            describe('getStocks', function () {
                it('should return an empty object when initalized', function () {
                    //    given
                    let stocksManager = new StocksManager();

                    //    when
                    let stocks = stocksManager.getStocks();

                    //    then
                    assertStocks(stocks).isEmpty();
                });
            });

            describe('addStock', function () {
                it('should add a stock when addStock', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    assertStocks(stocksManager.getStocks()).isEmpty();

                    //    when
                    stocksManager.addStock(SAMPLE_STOCK);
                    let stocks = stocksManager.getStocks();

                    //    then
                    chai.expect(stocks).to.deep.equal({
                        [UNDERLYING_ID]: {
                            underlyingId: UNDERLYING_ID,
                            spotPrice: SPOT_PRICE
                        }
                    });
                });

                it('should throw TypeError if add anything other than Stock when addStock()', function () {
                    //    given
                    let stocksManager = new StocksManager();

                    //    when
                    let addingNonStock = stocksManager.addStock.bind(stocksManager, "anything not a Stock");

                    //    then
                    chai.expect(addingNonStock).to.throw(TypeError, /should be a Stock/);
                });

                it('should not mutate the existing view of stocks after adding a stock by stocksManager.addStock', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    let existingView = stocksManager.getStocks();
                    assertStocks(existingView).isEmpty();

                    //    when
                    stocksManager.addStock(SAMPLE_STOCK);

                    //    then
                    assertStocks(existingView).isEmpty();
                });

                it('should not be able to add Stock with duplicated underlyingId', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    let addResult = stocksManager.addStock(SAMPLE_STOCK);
                    chai.expect(addResult.added).to.equal(true);
                    assertStocks(stocksManager.getStocks()).hasLength(1);

                    //    when
                    addResult = stocksManager.addStock(SAMPLE_STOCK);

                    //    then
                    chai.expect(addResult.added).to.equal(false);
                    assertStocks(stocksManager.getStocks()).hasLength(1);
                });
            });

            describe('removeStock', function () {
                it('should remove a stock when removeStock and stock exist', function () {
                    //    given
                    let stocksManager = newStocksManager(SAMPLE_STOCK);

                    //    when
                    let removeResult = stocksManager.removeStock(UNDERLYING_ID);

                    //    then
                    chai.expect(removeResult).to.deep.equal({
                        removed: true
                    });
                    assertStocks(stocksManager.getStocks()).isEmpty();
                });

                it('should only remove the specific Stock without afffecting other stock', function () {
                    //    given
                    let anotherStock = new StubStockBuilder().withUnderlyingId("anotherId").withSpotPrice(20).build();
                    let stocksManager = newStocksManager([SAMPLE_STOCK, anotherStock]);
                    assertStocks(stocksManager.getStocks()).hasLength(2);

                    //    when
                    let removeResult = stocksManager.removeStock("anotherId");

                    //    then
                    chai.expect(removeResult.removed).to.equal(true);
                    chai.expect(stocksManager.getStocks()).to.have.own.property(UNDERLYING_ID);
                });

                it('should return {removed:false} if underlyingId does not exist', function () {
                    //    given
                    let stocksManager = newStocksManager(SAMPLE_STOCK);
                    assertStocks(stocksManager.getStocks()).hasLength(1);

                    //    when
                    let removeResult = stocksManager.removeStock("anotherId");

                    //    then
                    chai.expect(removeResult.removed).to.equal(false);
                    chai.expect(stocksManager.getStocks()).to.have.own.property(UNDERLYING_ID);
                });
            });

            describe('getStocksAsJsonResponse', function () {
                it('should return an empty array when initalized', function () {
                    //    given
                    let stocksManager = new StocksManager();

                    //    when
                    let json = stocksManager.getStocksAsJsonResponse();

                    //    then
                    chai.expect(json).to.be.an("array").that.is.empty;
                });

                it('should return transformed array for existing stocks', function () {
                    //    given
                    let anotherStock = new StubStockBuilder().withUnderlyingId("anotherId").withSpotPrice(20).build();
                    let stocksManager = newStocksManager([SAMPLE_STOCK, anotherStock]);
                    assertStocks(stocksManager.getStocks()).hasLength(2);

                    //    when
                    let json = stocksManager.getStocksAsJsonResponse();

                    //    then
                    chai.expect(json).to.deep.equal([
                        {underlyingId: "anId", spotPrice: 10},
                        {underlyingId: "anotherId", spotPrice: 20},
                    ]);
                });
            });
        });

        function StubStockBuilder() {
            let stock = sinon.createStubInstance(Stock);
            let properties = {};

            this.build = () => {
                stock.asJson = () => Object.assign({}, properties);
                return stock;
            };
            this.withSpotPrice = spotPrice => {
                properties.spotPrice = spotPrice;
                return this;
            };
            this.withUnderlyingId = id => {
                stock.getUnderlyingId = () => id;
                properties.underlyingId = id;
                return this;
            };

            return this;
        }

        function assertStocks(stocks) {
            return {
                isEmpty() {
                    return chai.expect(stocks).to.be.an("object").that.is.empty;
                },
                hasLength(length) {
                    return chai.expect(Object.keys(stocks)).to.have.lengthOf(length);
                }
            }
        }

        function newStocksManager(stocks = []) {
            let stocksManager = new StocksManager();
            if (Array.isArray(stocks)) {
                stocks.forEach(stock => stocksManager.addStock(stock));
            } else {
                stocksManager.addStock(stocks);
            }
            return stocksManager;
        }
    });
});