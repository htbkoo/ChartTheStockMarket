import types from "./actionTypes"

const initialState = {
    stocks: []
};

export default function stocks(state = initialState, action) {
    let targetUnderlyingId = action.underlyingId;
    let index = state.stocks.indexOf(targetUnderlyingId);
    switch (action.type) {
        case types.ADD_STOCK: {
            let newState = {...state, stocks: state.stocks.slice()};
            if (index === -1) {
                newState.stocks.push(targetUnderlyingId);
            }
            return newState;
        }
        case types.REMOVE_STOCK: {
            let stocks = state.stocks.slice().filter(existing => existing !== targetUnderlyingId);
            return {...state, stocks};
        }
        default:
            return state;
    }
}