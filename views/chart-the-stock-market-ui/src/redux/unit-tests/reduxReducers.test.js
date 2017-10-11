import chai from "chai";
import chaiImmutable from "chai-immutable";
import {List, Map} from "immutable";

import reducers from "../reduxReducers";
import types from "../actionTypes";
import StocksModel from "../../components/model/StocksModel";

chai.use(chaiImmutable);

describe("reduxReducers", function () {
    const initialState = createImmutableState().withStocksModel([]);

    describe("no action", function () {
        it("should return the initial state", testReducer({
            params: {
                state: undefined,
                action:
                    {}
            },
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
                expectedState: createImmutableState().withStocksModel(["someId"])
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
                expectedState: createImmutableState().withStocksModel(["someId"])
            },
            {
                name: "should handle ADD_STOCK for non-empty stocks case",
                params: {
                    state: createImmutableState().withStocksModel(["existing"]),
                    action: {
                        type: types.ADD_STOCK,
                        underlyingId: "someId"
                    }
                },
                expectedState: createImmutableState().withStocksModel(["existing", "someId"])
            },
            {
                name: "should handle ADD_STOCK for same underlyingId case",
                params: {
                    state: createImmutableState().withStocksModel(["duplicate"]),
                    action: {
                        type: types.ADD_STOCK,
                        underlyingId: "duplicate"
                    }
                },
                expectedState: createImmutableState().withStocksModel(["duplicate"])
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
                expectedState: createImmutableState().withStocksModel([])
            },
            {
                name: "should handle REMOVE_STOCK for unmatched case",
                params: {
                    state: createImmutableState().withStocksModel(["anotherId"]),
                    action: {
                        type: types.REMOVE_STOCK,
                        underlyingId: "someId"
                    }
                },
                expectedState: createImmutableState().withStocksModel(["anotherId"])
            },
            {
                name: "should handle REMOVE_STOCK for matched case",
                params: {
                    state: createImmutableState().withStocksModel(["someId"]),
                    action: {
                        type: types.REMOVE_STOCK,
                        underlyingId: "someId"
                    }
                },
                expectedState: createImmutableState().withStocksModel([])
            },
        ].forEach(testCase =>
            it(testCase.name, testReducer(testCase))
        );
    });

    describe("reorderStock", function () {
        [
            {
                name: "should handle REORDER_STOCK for uninitialized stat",
                params: {
                    state: undefined,
                    action: createReorderAction().from(0).to(0)
                },
                expectedState: createImmutableState().withStocksModel([])
            },
            {
                name: "should handle REORDER_STOCK for unmatched case",
                params: {
                    state: createImmutableState().withStocksModel(["anotherId"]),
                    action: createReorderAction().from(0).to(1)
                },
                expectedState: createImmutableState().withStocksModel(["anotherId"])
            },
            {
                name: "should handle REORDER_STOCK for moving from 0 to 1",
                params: {
                    state: createImmutableState().withStocksModel(["someId0", "someId1"]),
                    action: createReorderAction().from(0).to(1)
                },
                expectedState: createImmutableState().withStocksModel(["someId1", "someId0"])
            },
            {
                name: "should handle REORDER_STOCK for moving from 4 to 2",
                params: {
                    state: createImmutableState().withStocksModel(["i0", "i1", "i2", "i3", "i4", "i5",]),
                    action: createReorderAction().from(4).to(2)
                },
                expectedState: createImmutableState().withStocksModel(["i0", "i1", "i4", "i2", "i3", "i5",])
            },
        ].forEach(testCase =>
            it(testCase.name, testReducer(testCase))
        );
    });

    function testReducer(testCase) {
        return function () {
            //    given
            const paramState = testCase.params.state;
            const previousState = isDefined(paramState) ? paramState : undefined;

            //    when
            let state = reducers(paramState, testCase.params.action);

            //    then
            assertState(testCase.expectedState).toEqual(state);
            // chai.expect(testCase.expectedState).to.equal(state);
            if (isDefined(paramState)) {
                assertState(paramState).toHaveNoMutation.suchThat.itEqualsTo(previousState);
            }
            assertState(initialState).toHaveNoMutation.suchThat.itEqualsTo(Map({
                    stocksModel: new StocksModel(List())
                })
            );
        };
    }

    function assertState(state) {
        const chaiStateAssert = target => chai.expect(state.get('stocksModel').getStocks()).to.equal(target.get('stocksModel').getStocks());

        return {
            toHaveNoMutation: {
                suchThat: {
                    itEqualsTo: chaiStateAssert
                }
            },
            toEqual: chaiStateAssert
        }
    }

    function isDefined(obj) {
        return typeof obj !== "undefined";
    }

    function createImmutableState() {
        return {
            withStocksModel(stocks) {
                return Map({
                    stocksModel: new StocksModel(List(stocks))
                });
            }
        };
    }

    function createReorderAction() {
        return {
            from(oldIndex) {
                return {
                    to(newIndex) {
                        return {
                            type: types.REORDER_STOCK,
                            oldIndex,
                            newIndex
                        }
                    }
                }
            }
        };
    }
});