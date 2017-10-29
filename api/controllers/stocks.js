import StocksManager from "../helpers/StocksManager";

(function () {
    let stocksManager = new StocksManager();
    let getStocks = (req, res) => {
        res.json(stocksManager.getStocksAsJsonResponse());
    };

    module.exports = {
        getStocks
    }
}());