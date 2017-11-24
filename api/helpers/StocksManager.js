let Map = require("immutable").Map;

let Stock = require("../models/Stock");

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
                return createAddResult(false);
            }

            stocks = stocks.set(underlyingId, stock.asJson());

            return createAddResult(true);
        };

        this._removeStock = stockId => {
            // if (!(stock instanceof Stock)) {
            //     throw new TypeError(`stock should be a Stock, but it is ${stock.constructor.name}`);
            // }
            // let underlyingId = stock.getUnderlyingId();
            // if (stocks.has(underlyingId)) {
            //     return createAddResult(false);
            // }
            stocks = Map();

            return {
                removed: true
            };
        };
    }

    getStocksAsJsonResponse() {
        let stocks = this.getStocks();
        return Object.keys(stocks).map(underlyingId => stocks[underlyingId]);
    }

    addStock(stock){
        return this._addStock(stock);
    }

    removeStock(stockId){
        return this._removeStock(stockId);
    }
}

function createAddResult(added) {
    return {
        added
    }
}

module.exports = StocksManager;