import chai from "chai";

import {actions, types} from "redux/reduxActions";

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
        const oldIndex = 0, newIndex = 3;
        const expectedAction = {
            type: types.REORDER_STOCK,
            oldIndex,
            newIndex,
        };

        //    when
        let reorderStockAction = actions.reorderStock(oldIndex, newIndex);

        //    then
        chai.expect(reorderStockAction).to.deep.equal(expectedAction);
    });
});