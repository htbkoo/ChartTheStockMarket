import chai from "chai";

import Stock from "../../../../api/models/Stock";

describe('api', function () {
    describe('model', function () {
        describe('Stock', function () {
            describe('construction', function () {
                it('should create a Stock with underlyingId', function () {
                    //    given
                    //    when
                    let stock = new Stock("");

                    //    then
                    chai.expect(stock).to.be.an.instanceOf(Stock);
                });

                it('should throw error when creating a Stock with undefined underlyingId', function () {
                    //    given
                    //    when
                    //    then
                    chai.expect(()=>new Stock()).to.throw(TypeError);
                });
            });

            describe('fields', function () {
                it('should get and set underlyingId', function () {
                    //    given
                    //    when
                    const underlyingId = "someId";
                    let stock = new Stock(underlyingId);

                    //    then
                    chai.expect(stock.getUnderlyingId()).to.equal(underlyingId);
                });
            });
        });
    });
});