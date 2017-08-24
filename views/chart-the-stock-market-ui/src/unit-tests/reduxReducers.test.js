import chai from "chai";

import reducers from "../redux/reduxReducers";
import types from "../redux/actionTypes";

describe("reduxReducers", function () {
    const initialState = {
        stocks: []
    };

    describe("no action", function () {
        it("should return the initial state", testReducer({
            params:
                {
                    state: undefined,
                    action:
                        {}
                }
            ,
            expectedState: initialState
        }));
    });

    describe("addStock", function () {
        [
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
            it(testCase.name, testReducer(testCase))
        );
    });

    function testReducer(testCase) {
        return function () {
            //    given
            // const previousState = JSON.parse(JSON.stringify(testCase.params.state));
            const paramState = testCase.params.state;
            const previousState = isDefined(paramState) ? {...paramState} : undefined;

            //    when
            let state = reducers(paramState, testCase.params.action);

            //    then
            chai.expect(state).to.deep.equal(testCase.expectedState);
            if (isDefined(paramState)) {
                assertState(paramState).toHaveNoMutation.suchThat.itEqualsTo(previousState);
            }
            assertState(initialState).toHaveNoMutation.suchThat.itEqualsTo({
                    stocks: []
                }
            );
        };
    }

    function assertState(state) {
        return {
            toHaveNoMutation: {
                suchThat: {
                    itEqualsTo: target => chai.expect(state).to.deep.equal(target)
                }
            }
        }
    }

    function isDefined(obj) {
        return typeof obj !== "undefined";
    }
});