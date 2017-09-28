import chai from "chai";

import * as actions from "../reduxActions";
import types from "../actionTypes";

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

    it("should create an action to remove a stock", function () {
        //    given
        const underlyingId = "GGGG.OQ";
        const expectedAction = {
            type: types.REMOVE_STOCK,
            underlyingId
        };

        //    when
        let removeStockAction = actions.removeStock(underlyingId);

        //    then
        chai.expect(removeStockAction).to.deep.equal(expectedAction);
    });

    it("should create an action to reorder a stock", function () {
        //    given
        const underlyingId = "GGGG.OQ", newPosition = 3;
        const expectedAction = {
            type: types.REORDER_STOCK,
            underlyingId,
            newPosition,
        };

        //    when
        let reorderStockAction = actions.reorderStock(underlyingId, newPosition);

        //    then
        chai.expect(reorderStockAction).to.deep.equal(expectedAction);
    });
});