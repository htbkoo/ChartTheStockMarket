export default class StocksManager {
    constructor() {
        const stocks = {};

        this.getStocks = () => stocks;
        this.addStock = stock => {
            let underlyingId = stock.getUnderlyingId(), spotPrice = stock.spotPrice;
            stocks[underlyingId] = {
                underlyingId,
                spotPrice
            }
        };
    }

    getStocksAsJsonResponse() {
        return [];
    }
}