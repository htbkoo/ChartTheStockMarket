import types from "./actionTypes"

export function addStock(underlyingId){
    return {
        type: types.ADD_STOCK,
        underlyingId
    }
}

export function removeStock(underlyingId){
    return {
        type: types.REMOVE_STOCK,
        underlyingId
    }
}

export function reorderStock(oldIndex, newIndex){
    return {
        type: types.REORDER_STOCK,
        oldIndex,
        newIndex
    }
}