import chai from "chai";

import reducers from "../redux/reduxReducers";

describe("reduxReducers", function () {
    it("should return the initial state", function () {
        //    given
        const expectedState = {
            stocks: []
        };

        //    when
        let state = reducers(undefined, {});

        //    then
        chai.expect(state).to.deep.equal(expectedState);
    });
});