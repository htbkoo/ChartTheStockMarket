import types from "./actionTypes"
import {Map, List} from 'immutable';

const initialState = Map({
    stocks: List()
});

export default function stocks(state = initialState, action) {
    let targetUnderlyingId = action.underlyingId;
    let stateStocks = state.get('stocks');
    let index = stateStocks.indexOf(targetUnderlyingId);
    switch (action.type) {
        case types.ADD_STOCK: {
            if (index === -1) {
                return state.set('stocks', stateStocks.push(targetUnderlyingId));
            }
            return state;
        }
        case types.REMOVE_STOCK: {
            if (index !== -1) {
                return state.set('stocks', stateStocks.delete(index));
            }
            return state;
        }
        default:
            return state;
    }
}