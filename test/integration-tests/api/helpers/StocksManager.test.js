import chai from "chai";
import {sinon} from "../../../test-utils/sinonWithSinonTest";

import StocksManager from "../../../../api/helpers/StocksManager";

import Stock from "../../../../api/models/Stock";

describe('api', function () {
    describe('helpers', function () {
        describe('StocksManager', function () {
            const SAMPLE_STOCK = new StubStockBuilder().setUnderlyingId("anId").withSpotPrice(10).build();

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
                    stocksManager.addStock(SAMPLE_STOCK);

                    //    then
                    chai.expect(existingView).to.be.an("object").that.is.empty;
                });

                it('should not be able to add Stock with duplicated underlyingId', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    stocksManager.addStock(SAMPLE_STOCK);
                    chai.expect(Object.keys(stocksManager.getStocks())).to.have.lengthOf(1);

                    //    when
                    stocksManager.addStock(SAMPLE_STOCK);

                    //    then
                    chai.expect(Object.keys(stocksManager.getStocks())).to.have.lengthOf(1);
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

                it('should return transformed array for existing stocks', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    stocksManager.addStock(SAMPLE_STOCK);
                    stocksManager.addStock(new StubStockBuilder().setUnderlyingId("anotherId").withSpotPrice(20).build());

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
            const builderThis = this;

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
                    return builderThis;
                }
            });

            return this;
        }
    });
});