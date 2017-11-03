import chai from "chai";
import request from "supertest";
import {sinon, sinonTest} from "../../../test-utils/sinonWithSinonTest";

import server from "../../../../app";
import StocksManager from "../../../../api/helpers/StocksManager";

import Stock from "../../../../api/models/Stock";

describe('api', function () {
    describe('controllers', function () {
        describe('stocks', function () {
            describe('GET /stocks', function () {
                it('should return an empty array', sinonTest(function () {
                    stubStocksManager().toReturnJsonResponse.call(this, []);

                    return request(server)
                        .get('/stocks')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(res =>
                            chai.expect(res.body).to.be.an('array').that.is.empty
                        );
                }));

                it('should return the array of stocks from stocksManager', sinonTest(function () {
                    let stock1 = {
                        underlyingId: "a",
                        spotPrice: 10
                    }, stock2 = {
                        underlyingId: "b",
                        spotPrice: 20
                    }, stocks = [stock1, stock2];

                    stubStocksManager().toReturnJsonResponse.call(this, stocks);

                    return request(server)
                        .get('/stocks')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(res => {
                            let json = res.body;
                            chai.expect(json).to.be.an('array').that.has.lengthOf(stocks.length);
                            chai.expect(json).to.be.deep.equal(stocks);
                        });
                }));
            });

            describe('POST /stocks/add/{id}', function () {
                it('should return {added: true} when successfully added', sinonTest(function () {
                    let added = true;
                    const underlyingId = "someId",
                        expectedResponse = {added},
                        matchStock = sinon.match(val => val instanceof Stock && underlyingId === val.getUnderlyingId());
                    stubStocksManager().whenAddStock(matchStock).toReturnResponse.call(this, added);

                    return request(server)
                        .post(`/stocks/add/${underlyingId}`)
                        .set('Content-Type', 'application/json')
                        .then(res =>
                            chai.expect(res.body).to.deep.equal(expectedResponse)
                        );
                }));
            });
        });

        function stubStocksManager() {
            return {
                toReturnJsonResponse(stocks) {
                    return this.stub(StocksManager.prototype, "getStocksAsJsonResponse").returns(stocks);
                },
                whenAddStock(stock) {
                    return {
                        toReturnResponse(added) {
                            return this.stub(StocksManager.prototype, "addStock").withArgs(stock).returns({added});
                        }

                    }
                },
            }
        }
    });
});