import chai from "chai";
import request from "supertest";
import {sinonTest} from "../../../test-utils/sinonWithSinonTest";

import server from "../../../../app";
import StocksManager from "../../../../api/helpers/StocksManager";

describe('api', function () {
    describe('controllers', function () {
        describe('stocks', function () {
            describe('GET /stocks', function () {
                it('should return an empty array', function () {
                    return request(server)
                        .get('/stocks')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(res =>
                            chai.expect(res.body).to.be.an('array').that.is.empty
                        );
                });

                it('should return the array of stocks from stocksManager', sinonTest(function () {
                    let stock1 = {
                        getUnderlyingId() {
                            return "a"
                        },
                        spotPrice: 10
                    }, stock2 = {
                        getUnderlyingId() {
                            return "b"
                        },
                        spotPrice: 20
                    }, stocks = [stock1, stock2];

                    this.stub(StocksManager.prototype, "stocks").get(() => stocks);

                    return request(server)
                        .get('/stocks')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(res => {
                            let json = res.body;
                            chai.expect(json).to.be.an('array').that.has.lengthOf(stocks.length);
                            chai.expect(json).to.be.deep.equal([
                                {
                                    underlyingId: "a",
                                    spotPrice: 10
                                }, {
                                    underlyingId: "b",
                                    spotPrice: 20
                                },
                            ]);
                        });
                }));
            });
        });
    });
});