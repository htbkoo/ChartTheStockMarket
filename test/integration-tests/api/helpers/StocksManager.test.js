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
                    chai.expect(stocks).to.be.an("object").that.is.empty
                });
            });

            describe('addStock', function () {
                it('should add a stock when addStock', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    chai.expect(stocksManager.getStocks()).to.be.an("object").that.is.empty;

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
                    chai.expect(existingView).to.be.an("object").that.is.empty;

                    //    when
                    stocksManager.addStock(SAMPLE_STOCK);

                    //    then
                    chai.expect(existingView).to.be.an("object").that.is.empty;
                });

                it('should not be able to add Stock with duplicated underlyingId', function () {
                    //    given
                    let stocksManager = new StocksManager();
                    let addResult = stocksManager.addStock(SAMPLE_STOCK);
                    chai.expect(addResult.added).to.equal(true);
                    chai.expect(Object.keys(stocksManager.getStocks())).to.have.lengthOf(1);

                    //    when
                    addResult = stocksManager.addStock(SAMPLE_STOCK);

                    //    then
                    chai.expect(addResult.added).to.equal(false);
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
                    stocksManager.addStock(new StubStockBuilder().withUnderlyingId("anotherId").withSpotPrice(20).build());

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
    });
});