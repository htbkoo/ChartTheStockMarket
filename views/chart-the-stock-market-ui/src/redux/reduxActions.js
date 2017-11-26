const types = {
    ADD_STOCK: "ADD_STOCK",
    REMOVE_STOCK: "REMOVE_STOCK",
    REORDER_STOCK: "REORDER_STOCK",
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
    }
};

export {actions, types};