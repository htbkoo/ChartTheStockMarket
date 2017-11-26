let StocksManager = require("../helpers/StocksManager");

let Stock = require("../models/Stock");

(function () {
    let stocksManager = new StocksManager();
    let getStocks = (req, res) => {
        res.json(stocksManager.getStocksAsJsonResponse());
    };

    let addStock = (req, res) => {
        let id = req.swagger.params.id.value;
        res.json(stocksManager.addStock(new Stock(id)));
    };

    let removeStock = (req, res) => {
        let id = req.swagger.params.id.value;
        res.json(stocksManager.removeStock(id));
    };

    module.exports = {
        getStocks,
        addStock,
        removeStock
    }
}());