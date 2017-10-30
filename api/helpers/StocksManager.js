import {Map} from "immutable";

import Stock from "../models/Stock";

export default class StocksManager {
    constructor() {
        let stocks = Map();

        this.getStocks = () => stocks.toObject();
        this.addStock = stock => {
            if (!(stock instanceof Stock)) {
                throw new TypeError(`stock should be a Stock, but it is ${stock.constructor.name}`);
            }
            let underlyingId = stock.getUnderlyingId(), spotPrice = stock.spotPrice;
            if (stocks.has(underlyingId)) {
                return createAddResult(false);
            }

            stocks = stocks.set(underlyingId, {
                underlyingId,
                spotPrice
            });

            return createAddResult(true);
        };
    }

    getStocksAsJsonResponse() {
        let stocks = this.getStocks();
        return Object.keys(stocks).map(underlyingId => stocks[underlyingId]);
    }
}

function createAddResult(added) {
    return {
        added
    }
}