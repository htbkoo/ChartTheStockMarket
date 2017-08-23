import types from "./actionTypes"

const initialState = {
    stocks: []
};

export default function stocks(state = initialState, action) {
    switch (action.type) {
        case types.ADD_STOCK: {
            let newState = {...state};
            newState.stocks.push(action.underlyingId);
            return newState;
        }
        default:
            return state;
    }
}