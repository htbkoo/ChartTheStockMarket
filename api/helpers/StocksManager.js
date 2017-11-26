let Map = require("immutable").Map;

let Stock = require("../models/Stock");

const createResult = {
    addStock(added) {
        return {
            added
        };
    },
    removeStock(removed) {
        return {
            removed
        };
    },
};

class StocksManager {
    constructor() {
        let stocks = Map();

        this.getStocks = () => stocks.toObject();
        this._addStock = stock => {
            if (!(stock instanceof Stock)) {
                throw new TypeError(`stock should be a Stock, but it is ${stock.constructor.name}`);
            }
            let underlyingId = stock.getUnderlyingId();
            if (stocks.has(underlyingId)) {
                return createResult.addStock(false);
            }

            stocks = stocks.set(underlyingId, stock.asJson());

            return createResult.addStock(true);
        };

        this._removeStock = underlyingId => {
            if (!stocks.has(underlyingId)) {
                return createResult.removeStock(false);

            }
            stocks = stocks.remove(underlyingId);
            return createResult.removeStock(true);
        };
    }

    getStocksAsJsonResponse() {
        let stocks = this.getStocks();
        return Object.keys(stocks).map(underlyingId => stocks[underlyingId]);
    }

    addStock(stock) {
        return this._addStock(stock);
    }

    removeStock(underlyingId) {
        return this._removeStock(underlyingId);
    }
}

module.exports = StocksManager;