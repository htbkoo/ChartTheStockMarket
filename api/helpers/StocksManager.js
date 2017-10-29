import {Map} from "immutable";

export default class StocksManager {
    constructor() {
        let stocks = Map();

        this.getStocks = () => stocks.toObject();
        this.addStock = stock => {
            let underlyingId = stock.getUnderlyingId(), spotPrice = stock.spotPrice;
            stocks = stocks.set(underlyingId, {
                underlyingId,
                spotPrice
            });
        };
    }

    getStocksAsJsonResponse() {
        return [];
    }
}