import * as types from "./actionTypes"

export function addStock(underlyingId){
    return {
        type: types.ADD_STOCK,
        underlyingId
    }
}