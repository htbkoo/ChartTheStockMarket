import request from "request-promise-native";
import fetch from "whatwg-fetch";

const types = {
    ADD_STOCK: "ADD_STOCK",
    REMOVE_STOCK: "REMOVE_STOCK",
    REORDER_STOCK: "REORDER_STOCK",
    GET_STOCKS_REQUEST: "GET_STOCKS_REQUEST",
    GET_STOCKS_SUCCESS: "GET_STOCKS_SUCCESS",
    GET_STOCKS_FAILUER: "GET_STOCKS_FAILUER",
};

const actions = {
    addStock(underlyingId) {
        return {
            type: types.ADD_STOCK,
            underlyingId
        }
    },
    removeStock(underlyingId) {
        return {
            type: types.REMOVE_STOCK,
            underlyingId
        }
    },
    reorderStock(oldIndex, newIndex) {
        return {
            type: types.REORDER_STOCK,
            oldIndex,
            newIndex
        }
    },
    requestGetStocks() {
        return {
            type: types.GET_STOCKS_REQUEST,
        }
    },
    receiveGetStocks(stocks) {
        return {
            type: types.GET_STOCKS_SUCCESS,
            stocks
        }
    },
    fetchStocks() {
        console.log("at actions.fetchStocks()");

        return dispatch => {
            console.log("dispatching at fetchStocks()");
            dispatch(this.requestGetStocks());

            return request("http://localhost:3001/stocks", {json: true})
                .then(json => json.map(obj => obj.underlyingId),
                    error => console.log('An error occurred.', error))
                .then(stocks => dispatch(this.receiveGetStocks(stocks)));
        }
    }
};

export {actions, types};