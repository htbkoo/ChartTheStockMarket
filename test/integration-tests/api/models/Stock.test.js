import chai from "chai";

import Stock from "../../../../api/models/Stock";

describe('api', function () {
    describe('model', function () {
        describe('Stock', function () {
            describe('construction', function () {
                it('should return a Stock', function () {
                    //    given
                    //    when
                    let stock = new Stock();

                    //    then
                    chai.expect(stock).to.be.an.instanceOf(Stock);
                });
            });
        });
    });
});