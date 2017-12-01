import {types} from "./reduxActions"
import {Map, List} from 'immutable';
import StocksModel from "../components/model/StocksModel";

const initialState = Map({
    "chart": Map(),
    "stock": Map({
        "stocksModel": newStocksModel(List()),
        "isGettingStocks": true
    })
});

export default function reducers(state = initialState, action) {
    let targetUnderlyingId = action.underlyingId;
    let stocksModel = state.getIn(['stock', 'stocksModel']);
    let stateStocks = stocksModel.getStocks();
    let index = stateStocks.indexOf(targetUnderlyingId);
    switch (action.type) {
        case types.ADD_STOCK: {
            if (index === -1) {
                return setState(state).withStocks(stateStocks.push(targetUnderlyingId));
            }
            return state;
        }
        case types.REMOVE_STOCK: {
            if (index !== -1) {
                return setState(state).withStocks(stateStocks.delete(index));
            }
            return state;
        }
        case types.REORDER_STOCK: {
            let {oldIndex, newIndex} = action;
            if (isWithinRange(oldIndex) && isWithinRange(newIndex)) {
                let reorderedId = stateStocks.get(oldIndex);
                return setState(state).withStocks(stateStocks.delete(oldIndex).insert(newIndex, reorderedId));
            }
            return state;
        }
        default:
            return state;
    }

    function isWithinRange(index) {
        return index < stateStocks.size;
    }
}

function newStocksModel(stocksList) {
    return new StocksModel(stocksList);
}

function setState(state) {
    return {
        withStocks(stocks) {
            return state.setIn(['stock','stocksModel'], newStocksModel(stocks));
        }
    }
}