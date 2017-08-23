import chai from "chai";

import reducers from "../redux/reduxReducers";
import types from "../redux/actionTypes";

describe("reduxReducers", function () {
    const initialState = {
        stocks: []
    };

    [
        {
            name: "should return the initial state",
            params: {
                state: undefined,
                action: {}
            },
            expectedState: initialState
        },
        {
            name: "should handle ADD_STOCK for uninitialized stat",
            params: {
                state: undefined,
                action: {
                    type: types.ADD_STOCK,
                    underlyingId: "someId"
                }
            },
            expectedState: {
                stocks: ["someId"]
            }
        },
        {
            name: "should handle ADD_STOCK for empty stocks case",
            params: {
                state: initialState,
                action: {
                    type: types.ADD_STOCK,
                    underlyingId: "someId"
                }
            },
            expectedState: {
                stocks: ["someId"]
            }
        },
        {
            name: "should handle ADD_STOCK for non-empty stocks case",
            params: {
                state: {
                    stocks: ["existing"]
                },
                action: {
                    type: types.ADD_STOCK,
                    underlyingId: "someId"
                }
            },
            expectedState: {
                stocks: ["existing", "someId"]
            }
        },
    ].forEach(testCase =>
        it(testCase.name, function () {
            //    given
            //    when
            let state = reducers(testCase.params.state, testCase.params.action);

            //    then
            chai.expect(state).to.deep.equal(testCase.expectedState);
        })
    );
});