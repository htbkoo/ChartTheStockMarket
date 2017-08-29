import chai from "chai";
import chaiImmutable from "chai-immutable";
import {Map, List} from "immutable";

import reducers from "../reduxReducers";
import types from "../actionTypes";

chai.use(chaiImmutable);

describe("reduxReducers", function () {
    const initialState = createImmutableState().withStocks([]);

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
                expectedState: createImmutableState().withStocks(["someId"])
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
                expectedState: createImmutableState().withStocks(["someId"])
            },
            {
                name: "should handle ADD_STOCK for non-empty stocks case",
                params: {
                    state: createImmutableState().withStocks(["existing"]),
                    action: {
                        type: types.ADD_STOCK,
                        underlyingId: "someId"
                    }
                },
                expectedState: createImmutableState().withStocks(["existing", "someId"])
            },
            {
                name: "should handle ADD_STOCK for same underlyingId case",
                params: {
                    state: createImmutableState().withStocks(["duplicate"]),
                    action: {
                        type: types.ADD_STOCK,
                        underlyingId: "duplicate"
                    }
                },
                expectedState: createImmutableState().withStocks(["duplicate"])
            },
        ].forEach(testCase =>
            it(testCase.name, testReducer(testCase))
        );
    });

    describe("removeStock", function () {
        [
            {
                name: "should handle REMOVE_STOCK for uninitialized stat",
                params: {
                    state: undefined,
                    action: {
                        type: types.REMOVE_STOCK,
                        underlyingId: "someId"
                    }
                },
                expectedState: createImmutableState().withStocks([])
            },
            {
                name: "should handle REMOVE_STOCK for unmatched case",
                params: {
                    state: createImmutableState().withStocks(["anotherId"]),
                    action: {
                        type: types.REMOVE_STOCK,
                        underlyingId: "someId"
                    }
                },
                expectedState: createImmutableState().withStocks(["anotherId"])
            },
            {
                name: "should handle REMOVE_STOCK for matched case",
                params: {
                    state: createImmutableState().withStocks(["someId"]),
                    action: {
                        type: types.REMOVE_STOCK,
                        underlyingId: "someId"
                    }
                },
                expectedState: createImmutableState().withStocks([])
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
            const previousState = isDefined(paramState) ? paramState : undefined;

            //    when
            let state = reducers(paramState, testCase.params.action);

            //    then
            chai.expect(testCase.expectedState).to.equal(state);
            // chai.expect(testCase.expectedState.equals(state)).to.equal(true, 'expected: testCase.expectedState.equals(state)');
            if (isDefined(paramState)) {
                assertState(paramState).toHaveNoMutation.suchThat.itEqualsTo(previousState);
            }
            assertState(initialState).toHaveNoMutation.suchThat.itEqualsTo(Map({
                    stocks: List()
                })
            );
        };
    }

    function assertState(state) {
        return {
            toHaveNoMutation: {
                suchThat: {
                    itEqualsTo: target => chai.expect(state).to.equal(target)
                }
            }
        }
    }

    function isDefined(obj) {
        return typeof obj !== "undefined";
    }

    function createImmutableState() {
        return {
            withStocks(stocks) {
                return Map({
                    stocks: List(stocks)
                });
            }
        };
    }
});