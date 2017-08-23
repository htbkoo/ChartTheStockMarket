import chai from "chai";

import * as actions from "../redux/reduxActions";
import * as types from "../redux/actionTypes";

describe("reduxActions", function () {
    it("should create an action to add a stock", function () {
        //    given
        const underlyingId = "GGGG.OQ";
        const expectedAction = {
            type: types.ADD_STOCK,
            underlyingId
        };

        //    when
        let addStockAction = actions.addStock(underlyingId);

        //    then
        chai.expect(addStockAction).to.deep.equal(expectedAction);
    });
});