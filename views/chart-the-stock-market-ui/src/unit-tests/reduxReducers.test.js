import chai from "chai";

import reducers from "../redux/reduxReducers";
import types from "../redux/actionTypes";

describe("reduxReducers", function () {
    const initialState = {
        stocks: []
    };

    it("should return the initial state", function () {
        //    given
        const expectedState = initialState;

        //    when
        let state = reducers(undefined, {});

        //    then
        chai.expect(state).to.deep.equal(expectedState);
    });

    it("should handle ADD_STOCK", function () {
        //    given
        const underlyingId = "someId";
        const expectedState = {
            stocks: [underlyingId]
        };

        //    when
        let state = reducers(initialState, {
            type: types.ADD_STOCK,
            underlyingId
        });

        //    then
        chai.expect(state).to.deep.equal(expectedState);
    });
});